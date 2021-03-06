function EventManager(obj, kwargs) {
    this.obj = obj;
    this.events = {};
    for(event of kwargs.events) {
        this.events[event] = [];
    }

    this.register = function(event, callback) {
        this.events[event].push(callback);
    }

    this.trigger = function(event) {
        if(event in this.events) {
            for(callback of this.events[event]) {
                callback();
            }
        } else {
            throw new ReferenceError("'{0}' is not an event in this EventManager.".format(event));
        }
    }
}

function RoundRobinSimulator (kwargs) {

    this.code = kwargs.code;
    
    this.framework = kwargs.framework;

    this.events = new EventManager(this, {
        events: [
            'iterate', 'reset', 'finished', 'update',
            'new_round',
        ]
    }); 

    this.play_speed = kwargs.play_speed;

    this.ordering = kwargs.ordering;

    var _this = this;
    
    this.on = function(event, callback) {
        this.events.register(event, callback);
    }

    this.change_framework = function(framework, ordering) {
        this.framework = framework;
        this.ordering  = ordering;
        this.sim_code(this.code);
    }

    this.sim_code = function(code) {
        this.code = code;

        // Should be caught by caller
        this.ast  = ILOC.parser.parse(this.code);
        
        this.cfg  = ILOC.build_CFG(this.ast);

        this.value_domain = this.framework.distinct_values(this.cfg);

        // If the lattice isn't too big, build it
        if (this.value_domain.size() <= 4) {
            this.lattice = this.framework.build_lattice(this.cfg);
        } else {
            // Otherwise, set it as null
            this.lattice = null;
        }
        
        this.order = (function(order) {
            switch(order) {
            case DFA.POSTORDER:
                return _this.cfg.postorder();
                break;
            case DFA.PREORDER:
                return _this.cfg.preorder();
                break;
            case DFA.REVERSE_POSTORDER:
                return _this.cfg.postorder().reverse();
                break;
            default:
                return _this.cfg.postorder().reverse();
            }
        })(this.ordering);
                      
        this.reset();
    }
    
    /*
     *  Reset state variables.
     */
    this.reset_state = function() {
        // Reset data sets.
        for(node of this.cfg.nodes) {
            node.sets = {};
            for(set in this.framework.local_sets) {
                node.sets[set] = this.framework.local_sets[set](node, this.value_domain);
            }
        }
        
        // Reset variables.
        // Set the state to the opposite of what we want:
        // iterate() checks the state to see what the LAST function
        // performed was, and then does the OPPOSITE - so to
        // initialise, we need to start one step BACK from where we
        // want to start.
        this.state = {
            meet: false,
            transfer: true,
            func: DFA.TRANSFER,
            changed: false,
            finished: false,
            paused: true,
            round: 0,
            order_index: 0,
        }
    }    

    /*
     *  Reset the UI.
     */
    this.reset = function() {
        this.reset_state();

        // Set top value
        switch(this.framework.top) {
        case DFA.ALL:
            this.top=this.value_domain;
            break;
        case DFA.NONE:
            this.top=new ValueSet([]);
            break;
        default:
            throw new ReferenceError("Unknown framework top value: expected 'all' or 'none', got {0}".format(this.framework.top));
        }

        switch(this.framework.boundary) {
        case DFA.ALL:
            this.boundary=this.value_domain;
            break;
        case DFA.NONE:
            this.boundary=new ValueSet([]);
            break;
        default:
            throw new ReferenceError("Unknown framework top value: expected 'all' or 'none', got {0}".format(this.framework.top));
        }
        
        while(this.state.order_index < this.order.length) {
            var node = this.cfg.nodes[this.order[this.state.order_index]];
            node.sets.meet     = new ValueSet(this.top.values());
            node.sets.transfer = new ValueSet(this.top.values());
            this.state.order_index++;
            this.state.read_nodes = [];
            this.state.modified_nodes = [];
        }

        if (this.framework.direction == DFA.FORWARD) {
            this.cfg.nodes[0].sets.meet = new ValueSet(this.boundary.values());
        } else {
            this.cfg.nodes[this.cfg.postorder()[0]].sets.meet = new ValueSet(this.boundary.values());
        }

        this.state.changed=true;
        
        this.events.trigger('reset');
    }
    
    this.meet = function() {
        var node = this.cfg.nodes[this.order[this.state.order_index]];
        var old_meet  = new ValueSet(node.sets.meet.values());
        var result = this.framework.meet(node,this.cfg);
        this.state.changed = this.state.changed || !compare_value_sets(node.sets.meet,old_meet);
        return result;
    }

    this.transfer = function() {
        var node = this.cfg.nodes[this.order[this.state.order_index]];
        var old_transfer  = new ValueSet(node.sets.transfer.values());
        var result = this.framework.transfer(node,this.cfg);
        this.state.changed = this.state.changed || !compare_value_sets(node.sets.transfer,old_transfer);
        return result;
    }
    
    this.mt_to_io = function(set) {
        switch(set) {
        case DFA.MEET:
            return (this.framework.direction == DFA.FORWARD ? DFA.IN : DFA.OUT)
        case DFA.TRANSFER:
            return (this.framework.direction == DFA.FORWARD ? DFA.OUT : DFA.IN)
        default:
            throw new ReferenceError('Expected DFA.MEET or DFA.TRANSFER, got "{0}"'.format(set));
        }
    }

    this.io_to_mt = function(set) {
        switch(set) {
        case DFA.IN:
            return (this.framework.direction == DFA.FORWARD ? DFA.MEET : DFA.TRANSFER)
        case DFA.OUT:
            return (this.framework.direction == DFA.FORWARD ? DFA.TRANSFER : DFA.MEET)
        default:
            throw new ReferenceError('Expected DFA.IN or DFA.OUT, got "{0}"'.format(set));
        }
    }

    this.step_forward = function() {
        this.iterate();
        this.events.trigger('update');
    }

    this.advance = function(n) {
        for (var i = 0; i < n; i++) {
            this.iterate();
        }
        this.events.trigger('update');
    }

    this.fast_forward = function() {
        while(!this.state.finished) {
            this.iterate();
        }
        this.events.trigger('update');
    }

    this.fast_backward = function() {
        this.reset();
    }

    this.play = function() {
        this.state.paused = false;
        var _this = this;
        (function foo() {
            if (!_this.state.paused && !_this.state.finished) {
                _this.iterate();
                _this.events.trigger('update');
                setTimeout(foo, _this.play_speed);
            }
        })();
    }

    this.pause = function() {
        this.state.paused = true;
    }
    
    this.iterate = function() {
        if (this.state.transfer) {
            this.state.order_index++;
        }
        
        if(this.state.order_index >= this.order.length) {
            if (!this.state.changed) {
                this.state.finished=true;
                this.events.trigger('finished');
                return;
            } else {
                this.new_round();
            }
        }

        var result;
        if(this.state.meet) {
            result = this.transfer();
            this.state.func=DFA.TRANSFER;
            this.state.meet=false;
            this.state.transfer=true;
        } else {
            result = this.meet();
            this.state.func = DFA.MEET;
            this.state.meet = true;
            this.state.transfer = false;
        }

        this.state.read_nodes = result.read_nodes;
        this.state.modified_nodes = result.modified_nodes;

        this.events.trigger('iterate');
    }

    this.new_round = function() {
        this.state.round++;
        this.state.order_index=0;
        this.state.changed=false;
        this.events.trigger('new_round');
    }
        
    this.init = function() {
        this.sim_code(this.code);
    }

}
