let { Parser } = require("acorn");
import { Evaluating } from './evaluating'

function run() {
    // 1. 生成ast
    let ast = Parser.parse("let a = 1;", { ecmaVersion: 2020 });
    console.log(ast);
    // 2. 解析执行执行ast
    let evaluating = new Evaluating(ast);
    evaluating.run();

}
run();
