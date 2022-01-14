#   js解释器设计

##  主体设计
## 1.词法分析语法分生成ast树
    源代码 => 词法分析 => tokens => 语法分析 => ast
    a. 源代码加载(string, io, import, amd)
    b. 词法分析语法分生成ast树(acorn.js)

## 2. ast树解析
    a. 使用就es6标准支持块级作用域, 广度优先遍历ast树
    
## 3. ast树执行
    a. 内存模型:
        栈：
        堆: 
    b. gc标记清除算法
    c. 全局对象[global]
    d. 全局上下文对象
    e. 函数上线文对象
    f. 作用域链