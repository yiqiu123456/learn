import { Context } from "./context"
import { Scope } from "./scope";
import { hasOwnProperty, createValOptoin } from "./utils"

export { Evaluating }

function Evaluating(ast) {
    this.ast = ast;
}

let $p = Evaluating.prototype;

$p.run = function () {
    let ast = this.ast;
    // 创建全局上下文对象
    let context = new Context({ type: "globle", variable: {} }, null);
    // 先解析Program节点， 解析阶段主要是创建上下对象和变量和函数提升
    if (ast.type === "Program") {
        let body = ast.body;
        // 执行代码
        this.forEachNode(body, context);
    }

    return;
}

$p.parserBody = function (body, context) {
    // 创建全局上下配置对象option， 遍历body节点，提升变量和函数
    body.forEach(v => {
        switch (v.type) {
            // 处理变量，前都var类型方式处理(let， const暂时按var，减小复杂度)
            case "VariableDeclaration": {
                this.parseVariableDeclaration(v, context);
                break;
            }
            case "FunctionDeclaration": { // 解析定义函数
                this.parseFunctionDeclaration(v, context);
                break;
            }
        }
    })
}

// 解析变量申明
$p.parseVariableDeclaration = function (node, context) {
    // declarations 表示声明的多个描述，因为我们可以这样：let a = 1, b = 2;。
    let declarations = node.declarations;
    let kind = node.kind;
    declarations.forEach(v => {
        let val = Object.create(null);
        // var, let, const 备用
        val.kind = kind;
        // let a = 1; 中的"a"
        // 变量字面量
        let identifier = v.id;
        val.name = identifier.name;
        // 变量值(值， 表达式， 函数) // let 1 = 1; let b = 1 + 1; let c = fucntion() {}
        var init = v.init;

        // init 为空表示没有初始变量 let a;
        if (!init) {
            val.value = undefined;
        } else {
            // 初始化变量
            this.declarationsValueInit(init, val, context);
        }

        // 把变量添加到上下对象中
        context.setValueByName(val.name, val);
    })
}


// 需要用到context， 因为表达式可能会有引用之前的对象
$p.declarationsValueInit = function (node, valOption, context) {
    let variableInitType = node.type;
    // 正则表达式暂时不处理

    // 字面量 let a = 1; let b = "js"; let c = true; 除引用类型
    if (variableInitType === "Literal") {
        valOption.value = node.value;

    } else if (variableInitType === "Identifier") { // 标识符 let a = b; 获取变量b;
        // 获取变量名称
        let name = node.name;
        // 在上下对象中获取变量值
        let valOptin = context.getValueByName(name);
        if (valOptin) {
            valOption.value = valOptin.val;
        } else {
            valOptin.value = undefined;
        }
    }
    else if (variableInitType === "BinaryExpression") { // 二元表达式 let a = 1 + 1;
        let leftNode = node.left;
        let rightNode = node.right;
        let leftNodeVal = this.getValueByDeclarations(leftNode, context);
        let rightNodeVal = this.getValueByDeclarations(rightNode, context);
        // 获取运算符
        let operator = node.operator;
        valOption.value = this.eavlBinaryExpression(operator, leftNodeVal, rightNodeVal);
    } else if (variableInitType === "FunctionExpression") { // 函数表达式 let a = fucntion() {}
        // 函数表达式暂时不处理，到使用的时候在处理
        valOption.value = node.init;
    }
}

$p.forEachNode = function (body, context) {
    // 预解析提升变量和函数
    this.parserBody(body, context);
    // 执行代码
    body.forEach(v => {
        // for 语言代码块
        if (v.type === "ForStatement") {
            $p.evalForStatement(v, context);
        } else if (v.type === "ExpressionStatement") { // 二元表达式
            let expressionNode = body.expression;
            if (expressionNode.type === "AssignmentExpression") { // 赋值
                this.evalAssignmentExpression(expressionNode, context, null);
            } else if (expressionNode.type === "CallExpression") { // 执行函数
                this.eaclCallExpression(expressionNode, context, null);
            }
        }
    })
}

// 计算二元表达式
$p.eavlBinaryExpression = function (operator, leftValue, rightValue) {
    return {
        "+": (l, r) => l + r,
        "-": (l, r) => l - r,
        "*": (l, r) => l * r,
        "/": (l, r) => l / r,
        "%": (l, r) => l % r,
        "<": (l, r) => l < r,
        ">": (l, r) => l > r,
        "<=": (l, r) => l <= r,
        ">=": (l, r) => l >= r,
        "==": (l, r) => l == r,
        "===": (l, r) => l === r,
        "!=": (l, r) => l != r,
        "!==": (l, r) => l !== r,
    }[operator](leftValue, rightValue)
}

// 节点的变量值 (Literal, Identifier, BinaryExpression)
$p.getValueByDeclarations = function (node, context) {
    if (node.type === "Literal") {
        return node.value;
    } else if (node.type === "Identifier") {
        // 变量在上下对象中获取变量值
        let valOptin = context.getValueByName(name);
        if (valOptin.type === "variable") { // 暂时不处理function变量
            return valOptin.val;
        } else {
            return undefined;
        }
    }
    else if (node.type === "BinaryExpression") {
        let leftNode = node.left;
        let rightNode = node.right;
        let leftNodeVal = this.getValueByDeclarations(leftNode, context);
        let rightNodeVal = this.getValueByDeclarations(rightNode, context);
        // 获取运算符
        let operator = node.operator;
        return this.eavlBinaryExpression(operator, leftNodeVal, rightNodeVal);
    }
}

// 解析函数定义 function fn() {}
$p.parseFunctionDeclaration = function (node, context) {
    let val = Object.create(null);
    val.type = "FunctionDeclaration";
    // 函数名称
    val.name = node.id.name;
    // 解析阶段，函数暂时不处理主要是创建上下对象和，变量和函数提升。
    val.value = node;
    val.context = context; // () => {} 箭头函数this指向词法作用域
    context.setValueByName(val.name, val);
}

// 运行for循环代码
$p.evalForStatement = function (forStatementNode, context) {
    // 创建块级作用域链变量对象， 暂时不处理块级作用域情况
    // let partScope = new Scope(context.scope, {}, "part");
    // context.pushScope(partScope);
    // 存储块级作用域变量对象
    let initNode = forStatementNode.init; // for(let i = 0;;)
    let testNode = forStatementNode.test; // for(; i < 10;)
    let updateNode = forStatementNode.update; // for(; ; i++)
    let bodyNode = forStatementNode.body; // for代码块的内容
    // 为了处理块级作用域，在for进入时会创建一个变量对象放入上下对象的作用域链最前端，for代码块结束时会删除这个块级作用域变量对象。
    for (
        initNode ? this.parseForStatmentInit(initNode, context) : null
        ;
        updateNode ? this.evalForUpdateNode(updateNode, context) : null
        ;
        testNode ? this.eavlForTestNode(testNode, context) : null
    ) {
        this.eavlBodyNode(bodyNode, context);
    }

    // 移除块级作用域
    // context.popScope();
}
$p.parseForStatmentInit = function (forStatmentInitNode, context) {
    // 非空不是for( ; ;)
    if (!forStatmentInitNode) {
        // let i = 0; for(i = 1; ;) 
        if (forStatmentInitNode.type === "AssignmentExpression") {
            this.evalAssignmentExpression(forStatmentInitNode, context)
        } else if (forStatmentInitNode.type === "SequenceExpression") { // let i = 0, j; for( i = 1, j = 0; ;)
            let assignmentExpressionNodes = forStatmentInitNode.expression;
            assignmentExpressionNodes.forEach(v => {
                this.evalAssignmentExpression(v, context)
            })
        } else if (forStatmentInitNode.type === "VariableDeclaration") {
            let declaratorNodes = forStatmentInitNode.declarations;
            let kind = declaratorNodes.kind;
            declaratorNodes.forEach(v => {
                let indentifierNode = v.id;
                let initNode = v.init;
                let name = indentifierNode.name;
                if (initNode.type === "Literal") {
                    let val = createValOptoin(name, initNode.value, "var")
                    // 函数作用域
                    if (kind === "var") {
                        context.setValueByName(name, val);
                    } else { // let, const 块级作用域
                        context.setValueByName(name, val);
                    }
                } else if (initNode.type === "Indentifier") {
                    let name2 = initNode.name;
                    // 查找变量
                    // 函数作用域
                    if (kind === "var") {
                        let val = context.getValueByName(name2);
                        if (val) {
                            let v = createValOptoin(name, val.value, "var")
                            context.setValueByName(name, v);
                        } else {
                            let v = createValOptoin(name, undefined, "var")
                            context.setValueByName(name, v);
                        }
                    } else { // let, const 块级作用域
                        let val = context.getValueByName(name2);
                        if (val) {
                            let v = createValOptoin(name, val.value, "const")
                            context.setValueByName(name, v);
                        } else {
                            let v = createValOptoin(name, undefined, "const")
                            context.setValueByName(name, v);
                        }
                    }
                }

            })
        }
    }
}


$p.evalAssignmentExpression = function (assignmentExpressionNode, context) {
    let operator = assignmentExpressionNode.operator;
    let indentifierNode = assignmentExpressionNode.left;
    let name = indentifierNode.name;
    let valOption = context.getValueByName(name);
    let rightNode = assignmentExpressionNode.right;

    let value = null;
    if (rightNode.type === "Literal") {
        value = rightNode.value;
    } else if (rightNode.type === "Indentifier") {
        name = rightNode.name;
        // 查找变量
        let v = context.getValueByName(name);
        if (v) {
            value = v.value;
        } else {
            value = undefined;
        }
    }
    return {
        "=": (val) => {
            valOption.value = val;
        },
        "+=": (val) => {
            valOption.value += val;
        },
        "-=": (val) => {
            valOption.value -= val;
        },
        "/=": (val) => {
            valOption.value /= val;
        },
        "%=": (val) => {
            valOption.value %= val;
        }
    }[operator](value)
}


// for() 跟新代码
$p.evalForUpdateNode = function (updateNode, context, partScope) {
    if (updateNode.type === "UpdateExpression") {   // for( ; ; i++)
        let operator = updateNode.operator;
        let argumentNode = updateNode.argument;
        if (argumentNode.type === "Identifier") {
            let key = argumentNode.name;
            // 获取变量
            let val = this.getValue(context, partScope, key);
            // for ++ -- 
            this.evalUpdateIdentifier(operator, val);
        }
    } else {  // updateNode.type === "AssignmentExpression" for( ; ; i += 2)
        this.evalAssignmentExpression(updateNode, context, partScope)
    }
}

// for() 判断语句
$p.eavlForTestNode = function (testNode, context, partScope) {
    let operator = testNode.operator;
    let leftNode = testNode.left;
    let rightNode = testNode.right;
    let leftVal, rightVal;
    if (leftNode.type === "Identifier") { // 变量Identifier
        let key = leftNode.name;
        leftVal = this.getValue(context, partScope, key).value;
    } else { // Literal 
        leftVal = leftNode.value;
    }
    if (rightNode.type === "Identifier") {
        let key = rightNode.name;
        rightVal = this.getValue(context, partScope, key).value;
    } else {
        rightVal = rightNode.value;
    }
    return this.eavlBinaryExpression(operator, leftVal, rightVal);

}



// 执行for ++ --
$p.evalUpdateIdentifier = function (operator, val) {
    let value = val.value;
    if (operator === "++") {
        value += 1;
    } else if (operator === "--") {
        value += -1;
    }
    val.value = value;
}


// 通过变量名称，先在块级作用域查询变量，没有查找到在到作用域链查询变量
$p.getValue = function (context, partScope, name) {
    let flag = hasOwnProperty(partScope, name);
    let valueOption = null;
    if (flag) {
        valueOption = partScope.getValueByName(name);
    } else {
        valueOption = context.getValueByName(name);
    }
    return valueOption;
}

// 执行函数调用
$p.eavlCallExpression = function (callExpressionNode, context) {
    // 获取函数名称
    let callee = callExpressionNode.callee;
    // foo(1)
    if (callee.type === "Identifier") {
        let functionName = callExpressionNode.callee.name;
        // 变量名称查询函数
        let func = context.getValueByName(functionName);
        let __arguments = callExpressionNode.arguments;
        if (func) {
            let functionNode = func.value;
            let paramsNode = functionNode.params;
            let funcBody = functionNode.body;
            // 普通函数 f(a)
            if (functionNode.type === "FunctionExpression") {
                // 创建函数上下文活动对象
                let funScope = this.createFunctionScope(context, paramsNode, __arguments);
                // 使用函数活动对象，作为上下文对象this执行函数体
                this.forEachNode(funcBody, funScope);

            } else if (functionNode.type === "ArrowFunctionExpression") { // 箭头函数 a = i => {}
                // 箭头函数() => {}, this使用词法作用域
                let literalContext = functionNode.context;
                // 使用词法作用域对象创建函数活动对象
                let funScope = this.createFunctionScope(context, paramsNode, __arguments, literalContext);
                // 使用词法作用域上下对象，作为上下文对象this执行函数体
                this.forEachNode(funcBody, funScope);
            }

        } else {
            new Error("not fine function is name:" + functionName)
        }
    } else if (callee.type === "MemberExpression") {  // console.log("a");
        // 对象
        // let objectNode = callee.object;
        // 属性或者方法
        // let propertyNode = callee.property;
        // let argumentsNode = callee.arguments;
    }

}

// 创建函数活动对象
$p.createFunctionScope = function (context, paramsNode, __arguments, literalContext) {
    let scopeObj = Object.create(null);
    scopeObj.type = "function"
    // 遍历函数定义参数
    paramsNode.forEach((v, i) => {
        let len = __arguments.lenght;
        if (i < len) {  // 有值传入的参数
            let optionVal = this.craetvalueOption("var", v.name, __arguments[i]);
            scopeObj[v.name] = optionVal;
        } else {    // 没有值传入的参数
            let optionVal = this.craetvalueOption("var", v.name, undefined);
            scopeObj[v.name] = optionVal;
        }
    });
    scopeObj["__arguments__"] = __arguments;

    // 普通函数使用全局
    if (!literalContext) {
        // 活动对象， 使用当前作用域
        let functionScope = new Scope(context.Scope, scopeObj);
        return functionScope;
    } else { // 箭头函数使用词法作用域
        // 活动对象,使用词法作用域
        let functionScope = new Scope(literalContext.Scope, scopeObj);
        return functionScope;
    }

}

// 创建变量消息对象
$p.craetvalueOption = function (kind, name, value) {
    let valueOption = Object.create(null);
    valueOption.kind = kind;
    valueOption.name = name;
    valueOption.value = value;
    return valueOption;
}