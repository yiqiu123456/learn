import hasOwnProperty from "./utils"
// 作用域链
function Scope(parentScope, variableObj) {
    // 存放变量
    this.variableObj = variableObj
    // 有父级作用域链
    if (parentScope) {
        this.type = "function";
        this.parentScope = parentScope;
    } else {
        // 全局作用域
        this.type = "globle"
        this.parentScope = null;
    }
    this.parentScope = parentScope;
}

let fn = Scope.prototype;

// 在上下文对象上获取对象值， 
fn.getValueByName = function (key) {
    let flag = hasOwnProperty(this.variableObj, key);
    if (flag) {
        return this.variableObj[key];
    } else { // 没有续查询到值
        // 判断有没有父级上下文对象
        if (this.parentScope) {
            // 父级上下文对象继续查询值
            return this.parentScope.getValueByName(key);
        } else {
            return undefined;
        }
    }
}
// 设置当前作用域上的值，估计没有
fn.setValueByName = function(key, val) {
    this.variableObj[key] = val;
}

export { Scope }
