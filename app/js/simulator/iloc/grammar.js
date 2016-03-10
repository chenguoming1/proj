(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['grammar.pegjs'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "{\n    var definition_counts = {};\n    var op_count = 0;\n}\n\nIlocProgram\n    = _ ins_list:InstructionList _ {\n        return new ILOC.IlocProgram({\n            instructions: ins_list\n        });\n    }\n\nInstructionList\n    =  _ l:(l:label _ \":\" _ { return l; })? _ ins:Instruction ins_list:(mandatory_newline ins_list:InstructionList _n { return ins_list; })? {\n        ins.label = l;\n        if(ins_list != undefined) {\n            ins_list.unshift(ins);\n            return ins_list;\n        } else {\n            return [ins]\n        };\n    }\n\nInstruction\n    = _ op:Operation _ {\n        return new ILOC.Instruction({\n            operations: [ op ]\n        });\n    }\n    / _ \"[\" _ op_list:OperationList _ \"]\" _ {\n        return new ILOC.Instruction({\n            operations: op_list\n        });\n    }\n\nOperationList\n    = _ op:Operation _ \";\" _ op_list:OperationList _ { op_list.unshift(op); return op_list; }\n    / _ op:Operation _ { return [ op ]; }\n\nOperation\n    = _ op:Assignment _ { return op; }\n    / _ op:Branch _ { return op; }\n\nAssignment =\n    _ oc:opcode _ s:OperandList _ \"=>\" _ t:OperandList _ {\n        try {\n            if (ILOC.MEMORY_LOAD_OPCODES.hasOwnProperty(oc)) {\n                return new ILOC.MemoryLoadOperation({\n                    opcode : oc,\n                    sources: s || [],\n                    targets: (\n                        t != undefined ?\n                            t.map(function(operand) {\n                                if (definition_counts[operand.name]==undefined) {\n                                    definition_counts[operand.name] = 1\n                                };\n                                operand.index = definition_counts[operand.name]++;\n                                return operand;\n                            }) : []\n                    )\n                });                 \n            } else if (ILOC.MEMORY_STORE_OPCODES.hasOwnProperty(oc)) {\n                return new ILOC.MemoryStoreOperation({\n                    opcode : oc,\n                    sources: s || [],\n                    targets: t || [],\n                });                 \n            } else {\n                return new ILOC.NormalOperation({\n                    opcode : oc,\n                    sources: s || [],\n                    targets: (\n                        t != undefined ?\n                            t.map(function(operand) {\n                                if (definition_counts[operand.name]==undefined) {\n                                    definition_counts[operand.name] = 1\n                                };\n                                operand.index = definition_counts[operand.name]++;\n                                return operand;\n                            }) : []\n                    )\n                });\n            }\n        } catch (ex) {\n            error(ex.message);\n        }\n    }\n\nBranch\n    = _ oc:opcode _ s:(s:OperandList _ \"->\" { return s; })? _ t:OperandList _ {\n        try {\n            return new ILOC.ControlFlowOperation({\n                opcode :oc,\n                sources: s || [],\n                targets: t || [],\n            });\n        } catch (ex) {\n            error(ex.message);\n        }\n    }\n    / _ oc: opcode _ {\n        try {\n            return new ILOC.ControlFlowOperation({\n                opcode : oc,\n                sources: [],\n                targets: []});\n        } catch (ex) {\n            error(ex.message);\n        }\n    }\n\nOperandList\n    = _ op:Operand _ \",\" _ op_list:OperandList _ { op_list.unshift(op); return op_list; }\n    / _ op:Operand _ { return [ op ]; }\n\nOperand\n    = _ r:register _ { return r; }\n    / _ n:num _ { return n; }\n    / _ c:cc _ { return c; }\n    / _ l:label _ { return l; }\n\nregister\n    = _ \"r\" n:([0-9a-z_]i)+ _ {\n        return new ILOC.Operand({\n            type: ILOC.OPERAND_TYPES.register,\n            name: n.join(\"\")\n        });\n    }\n\nlabel\n    = _ n:([0-9a-z_]i)+ _ {\n        return new ILOC.Operand({\n            type: ILOC.OPERAND_TYPES.label,\n            name: n.join(\"\")\n        });\n    }\n\nnum\n    = _ n:([0-9-]i)+ _ {\n        return new ILOC.Operand({\n            type: ILOC.OPERAND_TYPES.num,\n            name: n.join(\"\")\n        });\n    }\n\ncc\n    = _ n:'cc' _ {\n        return new ILOC.Operand({\n            type: ILOC.OPERAND_TYPES.cc,\n            name: n,\n        });\n    }\n\nopcode\n    = _ n:([a-z0-9_]i)+ _ { return n.join(\"\"); }\n\n_\n    = w:[ \\t\\r]* { return w; }\n\n__\n    = w:[ \\t\\r]+ { return w; }\n\n_n\n    = w:[ \\n\\t\\r]* { return w; }\n\nmandatory_newline\n    = w:[ \\t\\r]*\"\\n\"[ \\t\\r]* { return w; }\n";
},"useData":true});
})();