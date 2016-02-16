function MenuView(kwargs) {    
    View.call(this, kwargs);

    var _this = this;

    this.view_canvas = $(kwargs.view_canvas);
    
    this.template = Handlebars.templates['menu.hbs']

    this.lessons = [
        {
            constructor: IntroductionView,
            kwargs: {
                title: "Introduction",
                canvas: '#view-canvas',
            }
        }
    ]
    
    this.show_lesson = function(lesson_id) {
        this.canvas.hide();
        this.view_canvas.html("");
        this.view_canvas.show();

        if (lesson_id < this.lessons.length) {
            var lesson = this.lessons[lesson_id];
            this.view = new lesson.constructor(lesson.kwargs);
        
            this.view.init();
        } else {
            throw TypeError("Lesson with index {0} does not exist.".format(lesson_id));
        }
    }
    
    this.show_round_robin_simulator = function() {
        this.canvas.hide();
        this.view_canvas.html("");
        this.view_canvas.show();

        var iloc_code;
        if (getParameterByName('code') != null) {
            try {
                ILOC.parser.parse(getParameterByName('code'));
                iloc_code = getParameterByName('code');
            } catch(ex) {
                alert('Could not simulate code given in URL: {0}'.format(ex.message));
            }
        }

        if (!iloc_code) {
            iloc_code = Handlebars.templates['test/lattice.iloc']();1
        }
        
        // var iloc_code = "\
        // L0: nop \n\
        //     loadI  2         => ra        \n\
        //     load   rb        => rx        \n\
        //     addI   ra   , 1  => ra        \n\
        //     loadI  0         => r0        \n\
        //     cmp_GE rx   , r0 => rcomp     \n\
        //     cbr    rcomp     -> L1   , L2 \n\
        // L1: i2i    rx        => ra        \n\
        //     add    ra   , rb => rc        \n\
        //     jump   L3                     \n\
        // L2: addI   rb   , 1  => rc        \n\
        // L3: add    ra   , rc => rd        \n\
        // ";
        
        var simulator = new RoundRobinSimulator({
            // framework: iloc_liveness,
            // ordering:  DFA.POSTORDER,
            framework:  iloc_reaching_definitions,
            ordering:   DFA.REVERSE_POSTORDER,
            code:       iloc_code,
            play_speed: 100,
        });
        
        this.view = new RoundRobinSimulatorView({
            canvas: '#view-canvas',
            simulator: simulator,
        });
        
        this.view.init();
    }

    this.show_testbed = function(testbed_name) {
        switch(testbed_name) {
        case 'lattice':
            this.show_lattice_testbed();
            break;
        default:
            throw ReferenceError("Unrecognised testbed {0}".format(testbed_name));
        }
    }
    
    this.show_lattice_testbed = function() {
        this.canvas.hide();
        this.view_canvas.html("");
        this.view_canvas.show();
        
        var iloc_code = Handlebars.templates['test/lattice.iloc']();
        
        var simulator = new RoundRobinSimulator({
            // framework: iloc_liveness,
            // ordering:  DFA.POSTORDER,
            framework:  iloc_reaching_definitions,
            ordering:   DFA.REVERSE_POSTORDER,
            code:       iloc_code,
            play_speed: 100,
        });
        
        this.view = new LatticeTestbedView({
            canvas: '#view-canvas',
            simulator: simulator,
        });
        
        this.view.init();
    }
    
    this.init = function() {
        $('#page-title').html("Main Menu");
        
        this.canvas.html(this.template());
        this.view_canvas.hide();

        /* Simulation */
        $('#btn-round-robin-simulator').on('click', function() {
            _this.show_round_robin_simulator();
        });

        /* Lessons */
        $('#btn-lesson-0').on('click', function() {
            _this.show_lesson(0);
        });

        /* Testing */
        $('#btn-lattice-testbed').on('click', function() {
            _this.show_lattice_testbed();
        });
    }
}

MenuView.prototype = Object.create(View.prototype);
MenuView.prototype.constructor = MenuView


function TutorialView(kwargs) {
    View.call(this, kwargs);
    
    var _this = this;
    
    this.title = kwargs.title;

    this.clear = function() {
        throw ReferenceError("clear is not defined in class {0}".format(_this.constructor.name));
    }
    
    this.next = function() {
        if (this.step < this.steps.length - 1) {
            this.step++;
            this.steps[this.step]();
            if (this.step >= this.steps.length - 1) {
                this.next_button.prop('disabled', true);
            }
            if (this.step > 0) {
                this.prev_button.prop('disabled', false);
            }
        }
    }

    this.prev = function() {
        this.new_step = this.step - 1;
        this.reset();
        while (this.step < this.new_step) {
            this.next();
        }
        if (this.step < this.steps.length) {
            this.next_button.prop('disabled', false);
        }
    }

    this.reset = function() {
        this.step = -1;
        
        this.prev_button.prop('disabled', true);
        
        this.simulator = new RoundRobinSimulator({
            framework:  iloc_reaching_definitions,
            ordering:   DFA.REVERSE_POSTORDER,
            code:       "nop",
            play_speed: 100,
        });
        
        this.simulator.init();

        // Allow children to init contained components
        this.init_children();
        
        this.simulator.reset();

        this.next();
    }
    
    this.init = function() {
        this.canvas.html(this.template({title: this.title}));

        this.text = $('#text');
        
        this.next_button = $('#btn-next');
        
        this.next_button.on('click', function() {
            _this.next();
        });

        this.prev_button = $('#btn-prev');
        
        this.prev_button.on('click', function() {
            _this.prev();
        });

        this.reset();
    }
}

TutorialView.prototype = Object.create(View.prototype);
TutorialView.prototype.constructor = TutorialView

function IntroductionView(kwargs) {
    TutorialView.call(this, kwargs);

    var _this = this;
    
    this.template = Handlebars.templates['introduction.hbs'];
    
    this.clear = function() {
        _this.text.html("");
    }
    
    this.steps = [
        function step_00() {
            // Hide the CFG
            _this.cfg_canvas.hide();

            // Update the text
            _this.text.html(Handlebars.templates['lesson_01/step_00.hbs']());
        },
        function step_01() {
            // Update the text
            _this.text.append(Handlebars.templates['lesson_01/step_01.hbs']());
        },
        function step_02() {
            _this.clear();
            // Show the CFG
            _this.cfg_canvas.show();
            
            // Reset the CFG code
            var iloc_code = Handlebars.templates['lesson_01/step_02.iloc']();
            _this.simulator.sim_code(iloc_code);

            // Update the text
            _this.text.append(Handlebars.templates['lesson_01/step_02.hbs']());
        },
        function step_03() {
            // Animate the nodes
            var index = 0;
            var timeout = 500;
            setTimeout(function animate_04() {
                if(_this.step == 3) {
                    if(index < _this.simulator.cfg.nodes.length - 1) {
                        _this.cfg_view.reset_highlight();
                        $('#graph-node-{0}'.format(index))
                            .attr("class", "node meet highlight");
                        index += 1;
                        setTimeout(animate_04, timeout);
                    } else if (index < _this.simulator.cfg.nodes.length) {
                        for(index = 0; index < _this.simulator.cfg.nodes.length; index++) {
                            $('#graph-node-{0}'.format(index))
                                .attr("class", "node meet highlight");
                        }
                    }
                }
            }, timeout);
            
            // Update the text
            _this.text.append(Handlebars.templates['lesson_01/step_03.hbs']());
        },
        function step_04() {
            // Animate the nodes
            var index = 1;
            var timeout = 500;
            setTimeout(function animate_05() {
                if(_this.step == 4) {
                    if(index < _this.simulator.cfg.nodes.length - 1) {
                        _this.cfg_view.reset_highlight();
                        _this.cfg_view.g.setEdge(
                            '{0}'.format(index-1),
                            '{0}'.format(index),
                            {
                                style: "stroke: #62abea;",
                                arrowheadStyle: "stroke: #62abea; fill: #62abea;",
                            }
                        );
                        index += 1;
                        setTimeout(animate_05, timeout);
                    } else if (index < _this.simulator.cfg.nodes.length) {
                        for(index = 1; index < _this.simulator.cfg.nodes.length; index++) {
                            _this.cfg_view.g.setEdge(
                                '{0}'.format(index-1),
                                '{0}'.format(index),
                                {
                                    style: "stroke: #62abea; stroke-width: 1.5px;",
                                    arrowheadStyle: "stroke: #62abea; fill: #62abea;",
                                }
                            );
                        }
                    }
                }
                _this.cfg_view.draw();
            }, timeout);
            
            // Update the text
            _this.text.append(Handlebars.templates['lesson_01/step_04.hbs']());
        },
        function step_05() {
            _this.cfg_view.reset_highlight();
            _this.cfg_view.show_points();
            _this.cfg_view.update();
            _this.text.append(Handlebars.templates['lesson_01/step_05.hbs']());
        },
        function step_06() {
            _this.clear();
            _this.text.append(Handlebars.templates['lesson_01/step_06.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);

            _this.cfg_view.g = new dagreD3.graphlib.Graph({compound:true})
                .setGraph({})
                .setDefaultEdgeLabel(function() { return {}; });

            _this.cfg_view.svg.html("");
            // Add the graph element to the SVG
            _this.cfg_view.svgGroup = _this.cfg_view.svg.append("g");

            _this.cfg_view.g.setNode('0',
                            {
                                labelType: 'html',
                                label: '</span style="font-family: monospace;">x<sub>1</sub> = 1<span>',
                                rx: 15,
                                ry: 15,
                            });

            _this.cfg_view.g.setNode('1',
                                     {
                                         label: '...',
                                         rx: 15,
                                         ry: 15,
                                         style: 'stroke: rgba(0,0,0,0);'
                                     });
            
            _this.cfg_view.g.setNode('2',
                                     {
                                         labelType: 'html',
                                         label: '<span style="font-family: monospace;">y<sub>1</sub> = x + 2</span>',
                                         rx: 15,
                                         ry: 15,
                                     });

            _this.cfg_view.g.setNode('3',
                                     {
                                         label: '...',
                                         rx: 15,
                                         ry: 15,
                                         style: 'stroke: rgba(0,0,0,0);'
                                     });

            _this.cfg_view.g.setNode('4',
                                     {
                                         labelType: 'html',
                                         label: '<span style="font-family: monospace;">x<sub>2</sub> = 7</span>',
                                         rx: 15,
                                         ry: 15,
                                     });
            
            _this.cfg_view.g.setNode('5',
                                     {
                                         label: '...',
                                         rx: 15,
                                         ry: 15,
                                         style: 'stroke: rgba(0,0,0,0);'
                                     });

            _this.cfg_view.g.setNode('6',
                                     {
                                         labelType: 'html',
                                         label: '<span style="font-family: monospace;">z<sub>1</sub> = x * 2</span>',
                                         rx: 15,
                                         ry: 15,
                                     });

            _this.cfg_view.g.setEdge('0','1');
            _this.cfg_view.g.setEdge('1','2', {labelType: 'html', label: 'x<sub>1</sub> reaches here!', labelPos: 'l'});
            _this.cfg_view.g.setEdge('1','3');
            _this.cfg_view.g.setEdge('3','4', {labelType: 'html', label: 'x<sub>2</sub> re-defines x...'});
            _this.cfg_view.g.setEdge('4','5');
            _this.cfg_view.g.setEdge('5','6', {labelType: 'html', label: '... so x<sub>1</sub> does not reach here!'});

            _this.cfg_view.draw();

            _this.cfg_view.graph_properties.height = _this.cfg_view.g.graph().height;
            _this.cfg_view.graph_properties.width  = _this.cfg_view.g.graph().width;
            
            var xCenterOffset = (_this.cfg_view.canvas.width() - _this.cfg_view.graph_properties.width)
                / 2 * _this.cfg_view.graph_properties.scale;
            var yCenterOffset = (_this.cfg_view.canvas.height() - _this.cfg_view.graph_properties.height)
                / 2 * _this.cfg_view.graph_properties.scale;
            _this.cfg_view.svgGroup.attr("transform", "translate(" +
                                (xCenterOffset + _this.cfg_view.graph_properties.offset_x) + ", " +
                                (yCenterOffset + _this.cfg_view.graph_properties.offset_y) + ")" +
                                "scale(" + _this.cfg_view.graph_properties.scale + ")");
            
        },
        function step_07() {
            _this.cfg_view.init();
            _this.cfg_view.reset();
            
            _this.text.append(Handlebars.templates['lesson_01/step_07.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
        },
        function step_08() {
            _this.clear();
            _this.text.append(Handlebars.templates['lesson_01/step_08.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
        },
        function step_09() {
            _this.clear();
            _this.text.append(Handlebars.templates['lesson_01/step_09.hbs']());
        },
        function step_10() {
            _this.text.append(Handlebars.templates['lesson_01/step_10.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);

            _this.simulator.step_forward();
        },
        function step_11() {
            _this.text.append(Handlebars.templates['lesson_01/step_11.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);

            _this.simulator.step_forward();
        },
        function step_12() {
            _this.clear();
            _this.text.append(Handlebars.templates['lesson_01/step_12.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);

            _this.simulator.step_forward();
        },
        function step_13() {
            _this.text.append(Handlebars.templates['lesson_01/step_13.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);

            _this.simulator.step_forward();
        },
        function step_14() {
            _this.clear();
            _this.text.append(Handlebars.templates['lesson_01/step_14.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);

            _this.simulator.step_forward();
        },
        function step_15() {
            _this.text.append(Handlebars.templates['lesson_01/step_15.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);

            _this.simulator.step_forward();
        },
        function step_16() {
            _this.text.append(Handlebars.templates['lesson_01/step_16.hbs']());
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
        },
        function step_17() {
            _this.simulator.step_forward();
            
            _this.next_button.prop('disabled', true);
            
            _this.text.html(Handlebars.templates['question_canvas.hbs']());
            var question_view = new QuestionView({
                canvas: '#question-canvas',
                question: [
                    'What will the \\(\\text{Out}\\) set for the node',
                    '\\[\\texttt{add   ra, rb} \\; \\texttt{=>} \\; \\texttt{ra}_2\\]',
                    'be?'
                ],
                answers: [
                    {text: '\\(\\{\\texttt{ra}_1, \\texttt{rb}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rb}_1\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_1, \\texttt{rb}_2\\}\\)', correct: false},
                    {text: '\\(\\{\\texttt{ra}_2, \\texttt{rb}_2\\}\\)', correct: true}
                ],
                correct_callback: function() {
                    _this.next_button.prop('disabled', false);
                    _this.next()
                }
            });
            
            question_view.init();
        },
        function step_18() {
            _this.text.append(Handlebars.templates['lesson_01/step_18.hbs']());
            
            _this.simulator.step_forward();
            
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
        },
        function step_19() {
            _this.text.html("");
            _this.text.append(Handlebars.templates['lesson_01/step_19.hbs']({
                code: encodeURIComponent(Handlebars.templates['lesson_01/step_02.iloc']()),
            }));

            _this.simulator.fast_forward();
            
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.text.id]);
        }
    ];

    this.init_children = function() {

        $('#page-title').html("Introduction");
        
        this.cfg_canvas = $('#cfg-canvas');
        
        this.cfg_view = new CFGView({
            canvas: '#cfg-canvas',
            simulator: this.simulator
        });
        
        this.cfg_view.init();
        
    }
    
}

IntroductionView.prototype = Object.create(TutorialView.prototype);
IntroductionView.prototype.constructor = IntroductionView


function QuestionView(kwargs) {
    View.call(this, kwargs);

    var _this = this;

    var DISABLE_INCORRECT_NONE = 0;
    var DISABLE_INCORRECT_ONE  = 1;
    var DISABLE_INCORRECT_ALL  = 2;
    var DISABLE_CORRECT_NONE   = 4;
    var DISABLE_CORRECT_ONE    = 8;
    var DISABLE_CORRECT_ALL    = 16;

    var SHOW_INCORRECT_ONE  = 0;
    var SHOW_INCORRECT_ALL  = 1;
    var SHOW_CORRECT_ONE    = 0;
    var SHOW_CORRECT_ALL    = 2;

    this.correct_callback = kwargs.correct_callback || (function() {});
    this.incorrect_callback = kwargs.incorrect_callback || (function() {});
    
    this.show_on_click = kwargs.show_on_click || (SHOW_CORRECT_ALL | SHOW_INCORRECT_ONE);
    this.disable_on_click = kwargs.disable_on_click || (DISABLE_CORRECT_ALL | DISABLE_INCORRECT_ONE);
    
    this.template = Handlebars.templates['question.hbs']

    this.highlight_answers = function() {
        $("button.btn-answer").each(function(){
            if ($(this).hasClass('correct')) {
                $(this).addClass('btn-success');
            } else {
                $(this).addClass('btn-danger');
            }
            $(this).removeClass('btn-primary');
        });
    }
    
    this.incorrect_answer = function(elem) {
        if(this.show_on_click & SHOW_INCORRECT_ALL) {
            this.highlight_answers();
        } else {
            elem.addClass('btn-danger').removeClass('btn-primary');
        }

        if(this.disable_on_click & DISABLE_INCORRECT_ALL) {
            this.set_answers_disabled(true);
        } else if(this.disable_on_click & DISABLE_INCORRECT_ONE) {
            elem.prop('disabled', true);
        }
        
        this.incorrect_callback();
    }

    this.correct_answer = function(elem) {
        if(this.show_on_click & SHOW_CORRECT_ALL) {
            this.highlight_answers();
        } else {
            elem.addClass('btn-success').removeClass('btn-primary');
        }
        
        if(this.disable_on_click & DISABLE_CORRECT_ALL) {
            this.set_answers_disabled(true);
        } else if(this.disable_on_click & DISABLE_CORRECT_ONE) {
            elem.prop('disabled', true);
        }
        
        this.correct_callback();
    }

    this.reset_highlight = function() {
        $("button.btn-answer").each(function() {
            $(this).removeClass('btn-success')
                .removeClass('btn-danger')
                .addClass('btn-primary');
        });
    }

    this.set_answers_disabled = function(flag) {
        $("button.btn-answer").each(function() {
            $(this).prop('disabled', flag);
        });
    }
    
    this.reset = function() {
        this.reset_highlight();
        this.set_answers_disabled(false);
    }
    
    this.init = function() {
        this.canvas.html(this.template({
            question: kwargs.question,
            answers: shuffle(kwargs.answers)
        }));

        $("button.btn-answer").each(function(){
            if ($(this).hasClass('correct')) {
                $(this).on('click', function() {
                    _this.correct_answer($(this));
                });
            } else {
                $(this).on('click', function() {
                    _this.incorrect_answer($(this));
                });
            }
        });

        MathJax.Hub.Queue(["Typeset",MathJax.Hub,_this.canvas.id]);
    }
}
