
// 栈
function Stack() {
    this.arr = [];
}
let fn = Stack.prototype;

fn.push = function (...val) {
    this.arr.push(val);
}
fn.pop = function () {
    return this.arr.pop();
}

// 变量信息
function VariableOption(val, name, kind = "let") {
    // 变量的值
    this.value = val;
    // 变量字面量
    this.name = name;
    // var, let, const
    this.kind = kind;
    // 是否存在上下中 "1"为存在， "0"为不存在
    this.inContext = "1";
}
function HeadMap() {
    this.map = new Map();
}

let p$ = HeadMap.prototype;

p$.push = function (name, variableOption) {
    this.map.push(name, variableOption)
}

p$.get = function (name) {
    return this.map.get(name)
}

function Node(valOption, left, right) {
    this.valOption = valOption;
    this.left = left;
    this.right = right;
}

// 堆
function Head(valOption) {
    this.root = new Node(valOption, null, null);
}

let pp = Head.prototype;

pp.getOption = function (name) {
    let node = this.root;
    let option = this.getOptionNode(name, node)
    if (option) {
        return option;
    } else {
        return this.getRoot(name, node);
    }
}

// 中序遍历
pp.getNode = function (name, node) {
    let leftNode = node.left;
    let option = null;
    option = this.getOptionNode(name, leftNode);
    if (option) {
        return option;
    }
    let rightNode = node.right;
    option = this.getOptionNode(name, rightNode);
    if (option) {
        return option;
    }

    option = this.getNode(name, leftNode);
    if (option) {
        return option;
    }
    option = this.getNode(name, rightNode);
    if (option) {
        return option;
    }
    return null;
}

pp.getOptionNode = function (name, node) {
    let option = node.option;
    let flag = Object.prototype.hasOwnProperty.call(option, name);
    if (flag) {
        return option;
    } else {
        return null;
    }
}

export { Stack, Head, VariableOption }