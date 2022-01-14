import { Scope } from "./scope";

function Context(option, parentScope) {
    // variable global
    this.type = option.type;
    // 确定this, 默认指向当前详情上下文
    this._this = this;
    // 存放上下中，执行中要用到的值
    let variable = Object.create(null);
    // 函数作用域，休要arguments，和函数参数变量
    if (option.type === 'variable') {
        variable.type = "function";
        // 函数参数变量
        let ParamKeys = Object.getOwnPropertyNames(option.paramVariable);
        ParamKeys.forEach(v => {
            variable[v] = option[v];
        });
    } else {
        variable.type = "globle"
        // 全局上下中为全局变量， 函数上下中为函数内部变量,。这里不讨论变量冲突，这问题ast解析的时候就处理了。
        let partKeys = Object.getOwnPropertyNames(option.variable);
        partKeys.forEach(v => {
            variable[v] = option[v];
        });
    }
    this.scope = new Scope(parentScope, variable);
}
let fn = Context.prototype;

// 通过变量名称获取值
fn.getValueByName = function (key) {
    if (key) {
        return this.scope.getValueByName(key);
    } else {
        throw new Error("object key is undefine!");
    }
}

// 通过变量名称修改值
fn.setValueByName = function (key, val) {
    // 这里不需要检测变量名称为key的变成是否已存在， 因为已经生成ast就说明代码没有问题
    if (key) {
        this.scope[key] = val;
    } else {
        throw new Error("object key is undefine!");
    }
}

export { Context }