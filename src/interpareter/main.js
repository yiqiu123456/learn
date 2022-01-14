let { Parser } = require("acorn");

function run() {
    // 1. 生成ast
    let ast = Parser.parse("let a = 1;", {ecmaVersion: 2020});

    // 2. 解析执行执行ast

    

}
run()
