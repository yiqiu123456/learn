// export 导出js模块有两种放在方式，命名式导出（名称导出）和默认导出（定义式导出）
// export 可以导出导出函数、对象、指定文件（或模块）的原始值

// 命名导出

const a = 11;
const b = {};
export {a, b}   // 需要{}， 导出结果为 {a:11, b: {}}

// 错误演示
// export 1; // 绝对不可以 
 
// var a = 100; 
// export a; 错误export {a}

// 模块导出时，我们可以使用as关键字对导出成员进行重命名

// export { a as a1, b}  // 相当于 {a1:11, b: {}}

// export default 默认导出， 默认导出也被称为定义式导出，命名式导出可以导出多个值，
// 但在import引用时，也需要使用相同的名称来引用相应的值，而默认导出每个导出只有一个单一值，
// 这个输出可以是一个函数，类或者其他类型的值，这样在模块import导入时也会容易引用。

// export default function() {} // 可以导出一个函数
// export default class(){} // 也可以导出一个类

// 默认导出可以理解为另一种形式的命名导出，默认导出可以认为是使用了default名称的命名导出

export default function(a) {
    console.log( a)
}

// import * as print from 'model'上面的export default function(a) {}
// console.log(print ) 实际接收值为{default: function(a) }
// 默认导出， 我的猜想是默认导出就是没有名称，可以用任意名称接收这样就很方便,
// 实际测试也是这样的, 而不是默认导出的则需要对象解析，export {a, b}， 则需要 import {a, b} from 'model'

// 一个文件只能有一个默认导出（export default），但是可以同时有默认导出和命名式导出
// 导出的结果相当于{a: 11, b: {}, default: function(a) {}}   
// 这个结果是 import * as print from 'model' 
// console.log(print) 测试的结果

