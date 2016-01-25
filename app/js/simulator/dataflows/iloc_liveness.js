var defs = function (node, v_uses) {
    // Return all the source operands of this nodes' operations
    return new ValueSet(
        [].concat.apply([], node.operations.filter(function(operation) {
            // filter to just assignments
            return (operation instanceof ILOC.NormalOperation);
        }).map(function(operation) {
            if (operation.targets != undefined) {
                return operation.targets;
            } else {
                return [];
            }
        })).filter(function(target) {
            // Filter to just registers (variables)
            return (target.type == ILOC.OPERAND_TYPES.register)
        })
    );
};

var uses = function (node, v_uses) {
    // Return all the source operands of this nodes' operations
    return new ValueSet(
        [].concat.apply([], node.operations.map(function(operation) {
            if (operation.sources != undefined) {
                return operation.sources;
            } else {
                return [];
            }
        })).filter(function(source) {
            // Filter to just registers (variables)
            return (source.type == ILOC.OPERAND_TYPES.register)
        })
    );
};

var v_uses = function(graph) {
    // Find all operations in the graph
    var operations = [].concat.apply([], graph.nodes.map(function(node) {
        return node.operations.map(function(operation) {
            return operation;
        });
    }))
    
    // Return all the source operands of said operations
    return new ValueSet(
        [].concat.apply([], operations.map(function(operation) {
            if (operation.sources != undefined) {
                return operation.sources;
            } else {
                return [];
            }
        })).filter(function(source) {
            // Filter to just registers (variables)
            return (source.type == ILOC.OPERAND_TYPES.register)
        })
    );
}

var iloc_liveness = new DFAFramework({
    meet: function(node, graph) {
        var read_nodes = [];
        var modified_nodes = [];

        var meet_set = new ValueSet([]);
        
        var succ  = graph.nodes.filter(function(s) {
            if(graph.adjacency[node.index][s.index] == 1) {
                return true;
            }
        })
        
        for(s of succ) {
            for(val of s.sets.transfer.values()) {
                meet_set.add(val);
            }

            read_nodes.push({
                node: s,
                sets: ['transfer'],
            })
        };

        node.sets.meet = meet_set;        

        modified_nodes.push({
            node: node,
            sets: ['meet'],
        })
        
        return {read_nodes: read_nodes, modified_nodes: modified_nodes };
    },
    transfer: function(node) {
        var read_nodes = [];
        var modified_nodes = [];

        var transfer_set = new ValueSet(node.sets.use.values()); // transfer_set = use[B]

        var meet_set = new ValueSet(node.sets.meet.values()); // meet_set = out[B]
        
        for(v of node.sets.def.values()) {
            meet_set.delete(v);
        } // meet_set = out[B] - def[B]
        
        for(v of meet_set.values()) {
            transfer_set.add(v); // transfer_set = use[B] U (out[B] - def[B])
        }

        node.sets.transfer = transfer_set;

        read_nodes.push({
            node: node,
            sets: ['meet', 'use', 'def'],
        })

        modified_nodes.push({
            node: node,
            sets: ['transfer'],
        })
        
        return {read_nodes: read_nodes, modified_nodes: modified_nodes };
    },
    meet_latex: "\\[\\text{Out}(n) = \\bigcup_{s \\in succ} \\text{In}(s)\\]",
    transfer_latex: "\\[\\text{In}(n) = \\text{Use}(n) \\cup \\big{(}\\text{Out}(n) \\setminus \\text{Def}(n)\\big{)}\\]",
    local_sets: {
        use: uses,
        def: defs,
    },
    value_domain: v_uses,
    direction: DFA.BACKWARD,
    top: new ValueSet([]),
    name: "ILOC Liveness Analysis",
});