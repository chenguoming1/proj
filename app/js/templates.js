(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['code.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"code-display\" class=\"col-xs-12\">\n    </div>\n</div>\n<div class=\"row\">\n    <div id=\"code-editor\" class=\"col-xs-12\">\n    </div>\n</div>\n<div class=\"row\">\n    <div id=\"code-controls\" class=\"col-xs-12\">\n    </div>\n</div>\n";
},"useData":true});
templates['roundrobin.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div id=\"left-column\" class=\"col-xs-3\">\n        <div class=\"row\">\n            <div id=\"code-canvas\">\n            </div>\n        </div>\n        <div class=\"row\">\n            <div id=\"sim-controls-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <div class=\"row flex\">\n            <div id=\"cfg-canvas\" class=\"col-xs-12\">\n            </div>\n        </div>\n    </div>\n    <div id=\"right-column\" class=\"col-xs-9\">\n        <div class=\"col-xs-12\">\n            <div class=\"row\">\n                <div id=\"framework-canvas\" class=\"col-xs-12\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <div id=\"results-canvas\" class=\"col-xs-12\">\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['framework.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <h1 id=\"framework-title\"></h1>\n    </div>\n</div>\n<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div class=\"row\">\n            <div class=\"col-xs-6\"><h2>Meet Function</h2></div>\n            <div class=\"col-xs-6\"><h2>Transfer Function</h2></div>\n        </div>\n    </div>\n</div>\n<div class=\"row\">\n    <div id=\"framework-meet\" class=\"meet col-xs-6\"></div>\n    <div id=\"framework-transfer\" class=\"transfer col-xs-6\"></div>\n</div>\n<div class=\"row\">\n    <div id=\"framework-order\" class=\"col-xs-12\"></div>\n</div>\n";
},"useData":true});
templates['cfg.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<svg id=\"cfg-svg\">\n</svg>\n";
},"useData":true});
templates['menu.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <h1 class=\"text-center\">Data-Flow Analysis</h1>\n        <div class=\"row\">\n            <div id=\"menu\" class=\"col-xs-6\">\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <h2>Lessons</h2>\n                        <p>\n                        <button class=\"btn btn-secondary btn-block\" id=\"btn-lesson-01\">\n                            Introduction\n                        </button>\n                        </p>\n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col-xs-12\">\n                        <h2>Simulations</h2>\n                        <p>\n                        <button class=\"btn btn-secondary btn-block\" id=\"btn-round-robin-simulator\">\n                            Round Robin Iterator\n                        </button>\n                        </p>\n                    </div>\n                </div>\n            </div>\n            <div class=\"col-xs-6 well\">\n                <div id=\"description-canvas\">\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
templates['lesson_01/step_04.hbs~'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Each node represents an instruction.</p>\n";
},"useData":true});
templates['lesson_01/step_02.iloc'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "loadI 1      => r1 \naddI  ra, 2  => rb\naddI  ra, 3  => rc\nadd   ra, rc => rb\nloadI 7      => rd";
},"useData":true});
templates['lesson_01/step_03.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Each <strong style=\"color: #6cc86c\">node</strong> represents an instruction.</p>\n";
},"useData":true});
templates['lesson_01/step_00.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "Data-flow analysis";
},"3":function(container,depth0,helpers,partials,data) {
    return "control-flow graph";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>"
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_analysis",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is a technique for gathering information at various points in a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ". It is often used in compilers to aid in the optimization of computer programs.</p>\n";
},"useData":true});
templates['lesson_01/step_08.hbs~'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "data-flow equations";
},"3":function(container,depth0,helpers,partials,data) {
    return "live variables";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>We use a set of "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_equation",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " to determine the values at each point in the graph.</p>\n\n<p>The following data-flow equations compute "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"live_variable",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at each point in the control-flow graph:</p>\n\n<p id=\"transfer_eqn\">\\[\\text{In}(n) = \\text{Use}(n) \\cup \\big{(}\\text{Out}(n) \\setminus \\text{Def}(n)\\big{)}\\]</p>\n\n<p id=\"meet_eqn\">\\[\\text{Out}(n) = \\bigcup_{s \\in succ} \\text{In}(s)\\]</p>\n";
},"useData":true});
templates['lesson_01/step_07.hbs~'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "live-in";
},"3":function(container,depth0,helpers,partials,data) {
    return "live-out";
},"5":function(container,depth0,helpers,partials,data) {
    return "used";
},"7":function(container,depth0,helpers,partials,data) {
    return "defined";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p><strong>In</strong> is the set of variables that are "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"live_in",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at a given node.</p>\n\n<p><strong>Out</strong> is the set of variables that are "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"live_out",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at a given node.</p>\n\n<p><strong>Use</strong> is the set of variables that are "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable_use",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at a given node: in our example program, the variables on the <strong>left-hand side</strong> of each instruction.</p>\n\n<p><strong>Def</strong> is the set of variables that are "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable_definition",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at a given node: in our example program, the variables on the <strong>right-hand side</strong> of each instruction.</p>\n";
},"useData":true});
templates['lesson_01/step_05.hbs~'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Each edge represents the flow of control from one instruction to the next.</p>\n";
},"useData":true});
templates['lesson_01/step_06.hbs~'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>We collect information about the data flowing in and out of each node.</p>\n";
},"useData":true});
templates['lesson_01/step_07.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "live-in";
},"3":function(container,depth0,helpers,partials,data) {
    return "live-out";
},"5":function(container,depth0,helpers,partials,data) {
    return "used";
},"7":function(container,depth0,helpers,partials,data) {
    return "defined";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>\\(\\text{In}(n)\\) is the set of variables that are "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"live_in",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at a given node.</p>\n\n<p>\\(\\text{Out}\\) is the set of variables that are "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"live_out",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at a given node.</p>\n\n<p>\\(\\text{Use}(n)\\) is the set of variables that are "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable_use",{"name":"definition","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at a given node: in our example program, the variables on the <strong>left-hand side</strong> of each instruction.</p>\n\n<p>\\(\\text{Def}(n)\\) is the set of variables that are "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"variable_definition",{"name":"definition","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at a given node: in our example program, the variables on the <strong>right-hand side</strong> of each instruction.</p>\n";
},"useData":true});
templates['lesson_01/step_01.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "control-flow graph";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>A "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " is a graph representing the possible execution paths of a computer program.</p>\n<p>Let's see what a "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " looks like.</p>\n";
},"useData":true});
templates['lesson_01/step_02.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "control-flow graph";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>On the right is the "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || helpers.helperMissing).call(depth0 != null ? depth0 : {},"control_flow_graph",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " for a simple program.</p>\n";
},"useData":true});
templates['lesson_01/step_06.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "data-flow equations";
},"3":function(container,depth0,helpers,partials,data) {
    return "live variables";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "<p>We use a set of "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"dataflow_equation",{"name":"definition","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " to determine the values at each point in the graph.</p>\n\n<p>The following data-flow equations compute "
    + ((stack1 = (helpers.definition || (depth0 && depth0.definition) || alias2).call(alias1,"live_variable",{"name":"definition","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " at each point in the control-flow graph:</p>\n\n<p id=\"transfer_eqn\">\\[\\text{In}(n) = \\text{Use}(n) \\cup \\big{(}\\text{Out}(n) \\setminus \\text{Def}(n)\\big{)}\\]</p>\n\n<p id=\"meet_eqn\">\\[\\text{Out}(n) = \\bigcup_{s \\in succ} \\text{In}(s)\\]</p>\n";
},"useData":true});
templates['lesson_01/step_04.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>Each <strong style=\"color: #62abea\">edge</strong> represents the flow of control from one instruction to the next.</p>\n";
},"useData":true});
templates['lesson_01/step_05.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p>We collect information about the data flowing in and out of each node. We refer to these as  <strong>points</strong> in the control-flow graph.</p>\n";
},"useData":true});
templates['code_controls.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"code-controls-edit\">\n    <button id=\"btn-sim\" class=\"btn btn-primary btn-sm\">Simulate</button>\n    <button id=\"btn-cancel-edit\" class=\"btn btn-danger btn-sm\">Cancel</button>\n</div>\n<div id=\"code-controls-sim\">\n    <button id=\"btn-edit\" class=\"btn btn-primary btn-sm\">Edit</button>\n</div>\n";
},"useData":true});
templates['code_display.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "            <tr id=\"instruction-"
    + alias1(container.lambda((depth0 != null ? depth0.index : depth0), depth0))
    + "\" class=\"instruction\">"
    + alias1((helpers.toHTML || (depth0 && depth0.toHTML) || helpers.helperMissing).call(depth0 != null ? depth0 : {},depth0,{"name":"toHTML","hash":{},"data":data}))
    + "</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table class=\"table iloc borderless\">\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.nodes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n</table>\n";
},"useData":true});
templates['introduction.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<h1>"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\n<div class=\"row\">\n    <div class=\"col-xs-4 lesson-step\">\n        <div class=\"row\">\n            <div id=\"text\" class=\"col-xs-12\">\n            </div>\n        </div>\n        <nav class=\"row\">\n            <button id=\"btn-next\" class=\"btn btn-primary\">Next</button>\n        </nav>\n    </div>\n    <div id=\"cfg-canvas\" class=\"col-xs-8\">\n    </div>\n</div>\n";
},"useData":true});
templates['results.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <tr class=\"result-row node-"
    + alias2(alias1((depth0 != null ? depth0.index : depth0), depth0))
    + "\"><th>"
    + alias2(alias1((depth0 != null ? depth0.index : depth0), depth0))
    + "</th></tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<table id=\"results-table\" class=\"table table-bordered\">\n    <thead id=\"results-table-head\">\n        <tr>\n            <th></th>\n            <th id=\"local-header\">Local Information</th>\n            <th id=\"global-header\" colspan=\"99999\">Global Information</th>\n        </tr>\n        <tr id=\"round-row\">\n            <th rowspan=\"2\">Instruction</th>\n            <th id=\"round-header\">Round</th>\n        </tr>\n        <tr id=\"set-row\">\n            <th>Set</th>\n        </tr>\n    </thead>\n    <tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.nodes : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n</table>\n";
},"useData":true});
templates['node.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div>\n    <table class='iloc'>\n        <tbody>\n            <tr>"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</tr>\n        </tbody>\n    </table>\n</div>\n";
},"useData":true});
templates['code_editor.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<textarea>"
    + container.escapeExpression(((helper = (helper = helpers.code || (depth0 != null ? depth0.code : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"code","hash":{},"data":data}) : helper)))
    + "</textarea>\n";
},"useData":true});
templates['sim_controls.hbs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<span id=\"sim-controls\" class=\"btn-group\">\n    <button id=\"fast-backward\" class=\"btn btn-default\">\n        <span class=\"fa fa-fast-backward\"></span>\n    </button>\n    <button id=\"step-forward\" class=\"btn btn-default\">\n        <span class=\"fa fa-step-forward\"></span>\n    </button>\n    <button id=\"play\" class=\"btn btn-default\">\n        <span class=\"fa fa-play\"></span>\n    </button>\n    <button id=\"pause\" class=\"btn btn-default\">\n        <span class=\"fa fa-pause\"></span>\n    </button>\n    <button id=\"fast-forward\" class=\"btn btn-default\">\n        <span class=\"fa fa-fast-forward\"></span>\n    </button>\n</span>\n";
},"useData":true});
})();