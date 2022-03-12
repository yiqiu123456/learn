# JavaScript高级程序设计笔记

## 1.什么是javascript
JavaScript 是一门用来与网页交互的脚本语言，包含以下三个组成部分。
    ECMAScript：由 ECMA-262 定义并提供核心功能。
    文档对象模型（DOM）：提供与网页内容交互的方法和接口。
    浏览器对象模型（BOM）：提供与浏览器交互的方法和接口。(html5之前浏览器没有统一的BOM标准)

## 2.HTML 中的 JavaScript 
### 1. var 声明作用域
    关键的问题在于，使用 var 操作符定义的变量会成为包含它的函数的局部变量。比如，使用 var
    在一个函数内部定义一个变量，就意味着该变量将在函数退出时被销毁：
    function test() {
        var message = "hi"; // 局部变量
    }
    test();
    console.log(message); // 出错！

    // 全局变量
    function test() {
        message = "hi"; // 全局变量
    }
    test();
    console.log(message); // "hi" 
    2. var 声明提升
    使用 var 时，下面的代码不会报错。这是因为使用这个关键字声明的变量会自动提升到函数作用域
    顶部：
    function foo() {
    console.log(age);
    var age = 26;
    }
    foo(); // undefined 


### let 跟 var 的作用差不多，但有着非常重要的区别。最明显的区别是，let 声明的范围是块作用域，
    而 var 声明的范围是函数作用域。
    1. 暂时性死区
    let 与 var 的另一个重要的区别，就是 let 声明的变量不会在作用域中被提升。
    // name 会被提升
    console.log(name); // undefined
    var name = 'Matt';
    // age 不会被提升
    console.log(age); // ReferenceError：age 没有定义
    let age = 26;
    在解析代码时，JavaScript 引擎也会注意出现在块后面的 let 声明，只不过在此之前不能以任何方
    式来引用未声明的变量。在 let 声明之前的执行瞬间被称为“暂时性死区”（temporal dead zone），在此
    阶段引用任何后面才声明的变量都会抛出 ReferenceError。
    2. 全局声明
    与 var 关键字不同，使用 let 在全局作用域中声明的变量不会成为 window 对象的属性（var 声
    明的变量则会）。
    var name = 'Matt';
    console.log(window.name); // 'Matt'
    let age = 26;
    console.log(window.age); // undefined 

### const 声明
    const 的行为与 let 基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，且
    尝试修改 const 声明的变量会导致运行时错误。
    const age = 26;
    age = 36; // TypeError: 给常量赋值

### 声明风格及最佳实践
    1. 不使用 var
    有了 let 和 const，大多数开发者会发现自己不再需要 var 了。限制自己只使用 let 和 const
    有助于提升代码质量，因为变量有了明确的作用域、声明位置，以及不变的值。
    2. const 优先，let 次之
    使用 const 声明可以让浏览器运行时强制保持变量不变，也可以让静态代码分析工具提前发现不
    合法的赋值操作。因此，很多开发者认为应该优先使用 const 来声明变量，只在提前知道未来会有修
##  数据类型

## Symbol 类型
    Symbol（符号）是 ECMAScript 6 新增的数据类型。符号是原始值，且符号实例是唯一、不可变的。
    符号的用途是确保对象属性使用唯一标识符，不会发生属性冲突的危险。
    let s1 = Symbol('foo')
    let o = {
    [s1]: 'foo val'
    };  // 这样也可以：o[s1] = 'foo val';
    console.log(o);  // {Symbol(foo): foo val}

    符号没有字面量语法，这也是它们发挥作用的关键。按照规范，你只要创建 Symbol()实例并将其
    用作对象的新属性，就可以保证它不会覆盖已有的对象属性，无论是符号属性还是字符串属性。

    Symbol()函数不能与 new 关键字一起作为构造函数使用。这样做是为了避免创建符
    号包装对象，像

    // 创建全局符号
    let s = Symbol.for('foo');  // 
    console.log(Symbol.keyFor(s)); // foo
    let fooGlobalSymbol = Symbol.for('foo'); // 创建新符号
    let otherFooGlobalSymbol = Symbol.for('foo'); // 重用已有符号
    // 全局注册表中的符号必须使用字符串键来创建，因此作为参数传给 Symbol.for()的任何值都会被转换为字符串。此外，注册表中使用的键同时也会被用作符号描述。


    // 创建普通符号
    let s2 = Symbol('bar');
    console.log(Symbol.keyFor(s2)); // undefined    

## 原始值与引用值
    6种原始值：Undefined、Null、Boolean、Number、String 和 Symbol。保存原始值的变量是按值（by value）
    除了存储方式不同，原始值和引用值在通过变量复制时也有所不同。在通过变量把一个原始值赋值到另一个变量时，原始值会被复制到新变量的位置
    在把引用值从一个变量赋给另一个变量时，存储在变量中的值也会被复制到新变量所在的位置。区别在于，这里复制的值实际上是一个指针，它指向存储在堆内存中的对象

##  执行上下文与作用域
    执行上下文（以下简称“上下文”），变量或函数的上下文决定了它们可以访问哪些数据，以及它们的行为。每个上下文都有一个关联的变量对象（variable object），
    而这个上下文中定义的所有变量和函数都存在于这个对象上。虽然无法通过代码访问变量对象，但后台处理数据会用到它

    每个函数调用都有自己的上下文。当代码执行流进入函数时，函数的上下文被推到一个上下文栈上。在函数执行完之后，上下文栈会弹出该函数上下文，将控制权返还给之前的执行上下文。ECMAScript程序的执行流就是通过这个上下文栈进行控制的。

    上下文中的代码在执行的时候，会创建变量对象的一个作用域链（scope chain）
    作用域链中的下一个变量对象来自包含上下文，再下一个对象来自再下一个包含上下文。以此类推直至全局上下文；全局上下文的变量对象始终是作用域链的最后一个变量对象

    虽然执行上下文主要有全局上下文和函数上下文两种（eval()调用内部存在第三种上下文），但有其他方式来增强作用域链。某些语句会导致在作用域链前端临时添加一个上下文，这个上下文在代码执行后会被删除。通常在两种情况下会出现这个现象，即代码执行到下面任意一种情况时
    
    try/catch 语句的 catch 块
    with 语句
    这两种情况下，都会在作用域链前端添加一个变量对象。对 with 语句来说，会向作用域链前端添加指定的对象；对 catch 语句而言，则会创建一个新的变量对象，这个变量对象会包含要抛出的错误对象的声明
    function buildUrl() {
        let qs = "?debug=true";
        with(location){       // with 语句将 location 对象作为上下文
            let url = href + qs; // 当 with 语句中的代码引用变量 href 时，实际上引用的是location.href，也就是自己变量对象的属性
        }
        return url;
    } 

##  标识符查找
    当在特定上下文中为读取或写入而引用一个标识符时，必须通过搜索确定这个标识符表示什么。搜索开始于作用域链前端，以给定的名称搜索对应的标识符。如果在局部上下文中找到该标识符，则搜索停止，变量确定；如果没有找到变量名，则继续沿作用域链搜索。（注意，作用域链中的对象也有一个原型链，因此搜索可能涉及每个对象的原型链。）这个过程一直持续到搜索至全局上下文的变量对象。如果仍然没有找到标符，则说明其未声明

##  垃圾回收
    基本思路很简单：确定哪个变量不会再使用，然后释放它占用的内存。这个过程是周期性的，即垃圾回收程序每隔一定时间（或者说在代码执行过程中某个预定的收集时间）就会自动运行。垃圾回收过程是一个近似且不完美的方案，因为某块内存是否还有用，属于“不可判定的”问题，意味着靠算法是解决不了的。

##  标记清理
    当变量进入上下文，比如在函数内部声明一个变量时，这个变量会被加上存在于上下文中的标记。而在上下文中的变量，逻辑上讲，永远不应该释放它们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时，也会被加上离开上下文的标记。
    垃圾回收程序运行的时候，会标记内存中存储的所有变量（记住，标记方法有很多种）。然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉。在此之后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存。

##  引用计数

##  性能
    垃圾回收程序会周期性运行，如果内存中分配了很多变量，则可能造成性能损失，因此垃圾回收的时间调度很重要。尤其是在内存有限的移动设备上，垃圾回收有可能会明显拖慢渲染的速度和帧速率。开发者不知道什么时候运行时会收集垃圾，因此最好的办法是在写代码时就要做到：无论什么时候开始收集垃圾，都能让它尽快结束工作。

##  内存管理
    将内存占用量保持在一个较小的值可以让页面性能更好。优化内存占用的最佳手段就是保证在执行代码时只保存必要的数据。如果数据不再必要，那么把它设置为 null，从而释放其引用。这也可以叫作解除引用。这个建议最适合全局变量和全局对象的属性。局部变量在超出作用域后会被自动解除引用

### 1. 通过 const 和 let 声明提升性能

### 2. 隐藏类和删除操作
    V8 在将解释后的 JavaScript代码编译为实际的机器码时会利用“隐藏类”。如果你的代码非常注重性能，那么这一点可能对你很重要。
    运行期间，V8 会将创建的对象与隐藏类关联起来，以跟踪它们的属性特征。能够共享相同隐藏类的对象性能会更好，V8 会针对这种情况进行优化，但不一定总能够做到
    function Article() {
        this.title = 'Inauguration Ceremony Features Kazoo Band';
    }
    let a1 = new Article();
    let a2 = new Article();
    V8 会在后台配置，让这两个类实例共享相同的隐藏类，因为这两个实例共享同一个构造函数和原型。假设之后又添加了下面这行代码：
    a2.author = 'Jake';
    此时两个 Article 实例就会对应两个不同的隐藏类。根据这种操作的频率和隐藏类的大小，这有可能对性能产生明显影响。
    当然，解决方案就是避免 JavaScript 的“先创建再补充”（ready-fire-aim）式的动态属性赋值，并在构造函数中一次性声明所有属性，

    function Article() {
        this.title = 'Inauguration Ceremony Features Kazoo Band';
        this.author = 'Jake';
    }
    let a1 = new Article();
    let a2 = new Article();
    delete a1.author;
    在代码结束后，即使两个实例使用了同一个构造函数，它们也不再共享一个隐藏类。动态删除属性与动态添加属性导致的后果一样。最佳实践是把不想要的属性设置为 null。这样可以保持隐藏类不变和继续共享，同时也能达到删除引用值供垃圾回收程序回收的效果

##  内存泄漏
    意外声明全局变量是最常见但也最容易修复的内存泄漏问题。
    function setName() {
        name = 'Jake';
    } 
    定时器也可能会悄悄地导致内存泄漏。下面的代码中，定时器的回调通过闭包引用了外部变量：
    let name = 'Jake';
    setInterval(() => {
        console.log(name);
    }, 100); 

##  静态分配与对象池

##  基本引用类型

##  RegExp
    g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。
    i：不区分大小写，表示在查找匹配时忽略 pattern 和字符串的大小写。
    m：多行模式，表示查找到一行文本末尾时会继续查找。
    y：粘附模式，表示只查找从 lastIndex 开始及之后的字符串。
    u：Unicode 模式，启用 Unicode 匹配。
    s：dotAll 模式，表示元字符.匹配任何字符（包括\n 或\r）。

    // 匹配字符串中的所有"at"
    let pattern1 = /at/g;
    // 匹配第一个"bat"或"cat"，忽略大小写
    let pattern2 = /[bc]at/i; 

    与其他语言中的正则表达式类似，所有元字符在模式中也必须转义，包括：
    ( [ { \ ^ $ | ) ] } ? * + .
    元字符在正则表达式中都有一种或多种特殊功能，所以要匹配上面这些字符本身，就必须使用反斜杠来转义。下面是几个例子：
    // 匹配第一个"bat"或"cat"，忽略大小写
    let pattern1 = /[bc]at/i;
    // 匹配第一个"[bc]at"，忽略大小写
    let pattern2 = /\[bc\]at/i; 

##  RegExp 实例属性
    每个 RegExp 实例都有下列属性，提供有关模式的各方面信息。
    global：布尔值，表示是否设置了 g 标记。
    ignoreCase：布尔值，表示是否设置了 i 标记。
    unicode：布尔值，表示是否设置了 u 标记。
    sticky：布尔值，表示是否设置了 y 标记。
    lastIndex：整数，表示在源字符串中下一次搜索的开始位置，始终从 0 开始。
    multiline：布尔值，表示是否设置了 m 标记。
    dotAll：布尔值，表示是否设置了 s 标记。
    source：正则表达式的字面量字符串（不是传给构造函数的模式字符串），没有开头和结尾的斜杠。
    flags：正则表达式的标记字符串。始终以字面量而非传入构造函数的字符串模式形式返回（没有前后斜杠）。

##  Global
    Global 对象是 ECMAScript 中最特别的对象，因为代码不会显式地访问它。ECMA-262 规定 Global对象为一种兜底对象，它所针对的是不属于任何对象的属性和方法。事实上，不存在全局变量或全局函数这种东西。在全局作用域中定义的变量和函数都会变成 Global 对象的属性 。本书前面介绍的函数，包括 isNaN()、isFinite()、parseInt()和 parseFloat()，实际上都是 Global 对象的方法。除了这些，Global 对象上还有另外一些方法。

##  eval()方法
    最后一个方法可能是整个 ECMAScript 语言中最强大的了，它就是 eval()。这个方法就是一个完整的 ECMAScript 解释器，它接收一个参数，即一个要执行的 ECMAScript（JavaScript）字符串。来看一个例子：
    eval("console.log('hi')");
    上面这行代码的功能与下一行等价：
    console.log("hi"); 
    当解释器发现 eval()调用时，会将参数解释为实际的 ECMAScript 语句，然后将其插入到该位置。通过 eval()执行的代码属于该调用所在上下文，被执行的代码与该上下文拥有相同的作用域链。这意味着定义在包含上下文中的变量可以在 eval()调用内部被引用，比如下面这个子：
    let msg = "hello world";
    eval("console.log(msg)"); // "hello world" 

    eval("function sayHi() { console.log('hi'); }");
    sayHi();  // hi
    通过 eval()定义的任何变量和函数都不会被提升，这是因为在解析代码的时候，它们是被包含在一个字符串中的。它们只是在 eval()执行的时候才会被创建.
    在严格模式下，在 eval()内部创建的变量和函数无法被外部访问

##  window 对象
    虽然 ECMA-262 没有规定直接访问 Global 对象的方式，但浏览器将 window 对象实现为 Global对象的代理。因此，所有全局作用域中声明的变量和函数都变成了 window 的属性。来看下面的例子：
    var color = "red";
    function sayColor() {
       console.log(window.color);
    }
    window.sayColor(); // "red" 

##  array
    栈方法
    栈是一种后进先出（LIFO，Last-In-First-Out）的结构，也就是最近添加的项先被删除。数据项的插入（称为推入，push）和删除（称为弹出，pop）只在栈的一个地方发生，即栈顶。ECMAScript 数组提供了 push()和 pop()方法，以实现类似栈的行为。

    队列方法
    就像栈是以 LIFO 形式限制访问的数据结构一样，队列以先进先出（FIFO，First-In-First-Out）形式限制访问。队列在列表末尾添加数据但从列表开头获取数据。因为有了在数据末尾添加数据的 push()方法，所以要模拟队列就差一个从数组开头取得数据的方法了。这个数组方法叫 shift()，它会删除数组的第一项并返回它，然后数组长度减 1。使用 shift()和 push()，可以把数组当成队列来使用

    删除。需要给 splice()传 2 个参数：要删除的第一个元素的位置和要删除的元素数量。可以从数组中删除任意多个元素，比如 splice(0, 2)会删除前两个元素。
    插入。需要给 splice()传 3 个参数：开始位置、0（要删除的元素数量）和要插入的元素，可以在数组中指定的位置插入元素。第三个参数之后还可以传第四个、第五个参数，乃至任意多个要插入的元素。比如，splice(2, 0, "red", "green")会从数组位置 2 开始插入字符串"red"和"green"。
    替换。splice()在删除元素的同时可以在指定位置插入新元素，同样要传入 3 个参数：开始位置、要删除元素的数量和要插入的任意多个元素。要插入的元素数量不一定跟删除的元素数量一致。比如，splice(2, 1, "red", "green")会在位置 2 删除一个元素，然后从该位置开始向数组中插入"red"和"green"。

##  严格相等
    ECMAScript 提供了 3 个严格相等的搜索方法：indexOf()、lastIndexOf()和 includes()
    indexOf()和 lastIndexOf()都返回要查找的元素在数组中的位置，如果没找到则返回-1。includes()返回布尔值，表示是否至少找到一个与指定元素匹配的项

##  断言函数
    find()和 findIndex()方法使用了断言函数。这两个方法都从数组的最小索引开始。find()返回第一个匹配的元素，findIndex()返回第一个匹配元素的索引。
    断言函数接收 3 个参数：元素、索引和数组本身。
    let people = [10, 20, 30, 40, 50]
    people.find((element, index, array) => element < 28)

##  迭代方法
    every()：对数组每一项都运行传入的函数，如果对每一项函数都返回 true，则这个方法返回 true。
    filter()：对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回。
    forEach()：对数组每一项都运行传入的函数，没有返回值。
    map()：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。
    some()：对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true。

##  归并方法
    ECMAScript 为数组提供了两个归并方法：reduce()和 reduceRight()。这两个方法都会迭代数组的所有项，并在此基础上构建一个最终返回值。reduce()方法从数组第一项开始遍历到最后一项。而 reduceRight()从最后一项开始遍历至第一项。

    这两个方法都接收两个参数：对每一项都会运行的归并函数，以及可选的以之为归并起点的初始值。传给 reduce()和 reduceRight()的函数接收 4 个参数：上一个归并值、当前项、当前项的索引和数组本身。这个函数返回的任何值都会作为下一次调用同一个函数的第一个参数。如果没有给这两个方法传入可选的第二个参数（作为归并起点值），则第一次迭代将从数组的第二项开始，因此传给归并函数的第一个参数是数组的第一项，第二个参数是数组的第二项
    let values = [1, 2, 3, 4, 5];
    let sum = values.reduce((prev, cur, index, array) => prev + cur);
    alert(sum); // 15 

##  ArrayBuffer
    Float32Array 实际上是一种“视图”，可以允许 JavaScript 运行时访问一块名为 ArrayBuffer 的预分配内存。ArrayBuffer 是所有定型数组及视图引用的基本单位。
    ArrayBuffer()是一个普通的 JavaScript 构造函数，可用于在内存中分配特定数量的字节空间。
    const buf = new ArrayBuffer(16); // 在内存中分配 16 字节
    alert(buf.byteLength); // 16

##  DataView
    第一种允许你读写 ArrayBuffer 的视图是 DataView。这个视图专为文件 I/O 和网络 I/O 设计，其API 支持对缓冲数据的高度控制，但相比于其他类型的视图性能也差一些。

##  选择 Object 还是 Map
    1. 内存占用
    Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。不同浏览器的情况不同，但给定固定大小的内存，Map 大约可以比 Object 多存储50%的键/值对。
    2. 插入性能
    向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。如果代码涉及大量插入操作，那么显然 Map 的性能更佳。
    3. 查找速度
    与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对，则 Object 有时候速度更快。在把 Object 当成数组使用的情况下（比如使用连续整数作为属性），浏览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言，查找速度不会随着键/值对数量增加而线性增加。如果代码涉及大量查找操作，那么某些情况下可能选择 Object 更好一些。
    4. 删除性能
    使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此，出现了一些伪删除对象属性的操作，包括把属性值设置为 undefined 或 null。但很多时候，这都是一种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。如果代码涉及大量删除操作，那么毫无疑问应该选择 Map。

##  WeakMap
    ECMAScript 6 新增的“弱映射”（WeakMap）是一种新的集合类型，为这门语言带来了增强的键/值对存储机制。WeakMap 是 Map 的“兄弟”类型，其 API 也是 Map 的子集。WeakMap 中的“weak”（弱），描述的是 JavaScript 垃圾回收程序对待“弱映射”中键的方式。
    const wm = new WeakMap();
    弱映射中的键只能是 Object 或者继承自 Object 的类型，尝试使用非对象设置键会抛出TypeError。值的类型没有限制。

    WeakMap 中“weak”表示弱映射的键是“弱弱地拿着”的。意思就是，这些键不属于正式的引用，不会阻止垃圾回收。但要注意的是，弱映射中值的引用可不是“弱弱地拿着”的。只要键存在，键/值对就会存在于映射中，并被当作对值的引用，因此就不会被当作垃圾回收。

##  生成器
    生成器是 ECMAScript 6 新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行的能力。这种新能力具有深远的影响，比如，使用生成器可以自定义迭代器和实现协程。
    生成器的形式是一个函数，函数名称前面加一个星号（*）表示它是一个生成器。只要是可以定义函数的地方，就可以定义生成器。

    // 生成器函数声明
    function* generatorFn() {}
    // 生成器函数表达式
    let generatorFn = function* () {}
    // 作为对象字面量方法的生成器函数
    let foo = {
        * generatorFn() {}
    }
    // 作为类实例方法的生成器函数
    class Foo {
        * generatorFn() {}
    }
    console.log( foo)   // { generatorFn: [GeneratorFunction: generatorFn] }
    // 作为类静态方法的生成器函数
    class Bar {
        static * generatorFn() {}
    }


##  对象、类与面向对象编程
##  数据属性
    数据属性包含一个保存数据值的位置。值会从这个位置读取，也会写入到这个位置。数据属性有 4个特性描述它们的行为。
    [[Configurable]]：表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。默认情况下，所有直接定义在对象上的属性的这个特性都是 true，如前面的例子所示。
    [[Enumerable]]：表示属性是否可以通过 for-in 循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是 true，如前面的例子所示。
    [[Writable]]：表示属性的值是否可以被修改。默认情况下，所有直接定义在对象上的属性的这个特性都是 true，如前面的例子所示。
    [[Value]]：包含属性实际的值。这就是前面提到的那个读取和写入属性值的位置。这个特性的默认值为 undefined。
    要修改属性的默认特性，就必须使用 Object.defineProperty()方法.

##  访问器属性
    访问器属性不包含数据值。相反，它们包含一个获取（getter）函数和一个设置（setter）函数，不过这两个函数不是必需的
    [[Configurable]]：表示属性是否可以通过 delete 删除并重新定义，是否可以修改它的特性，以及是否可以把它改为数据属性。默认情况下，所有直接定义在对象上的属性的这个特性都是 true。
    [[Enumerable]]：表示属性是否可以通过 for-in 循环返回。默认情况下，所有直接定义在对象上的属性的这个特性都是 true。
    [[Get]]：获取函数，在读取属性时调用。默认值为 undefined。
    [[Set]]：设置函数，在写入属性时调用。默认值为 undefined。
    访问器属性是不能直接定义的，必须使用 Object.defineProperty()。

##  读取属性的特性
    使用 Object.getOwnPropertyDescriptor()方法可以取得指定属性的属性描述符。这个方法接收两个参数：属性所在的对象和要取得其描述符的属性名。返回值是一个对象，对于访问器属性包含
    configurable、enumerable、get 和 set 属性，对于数据属性包含 configurable、enumerable、writable 和 value 属性。

##  合并对象
    Object.assign()实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使用最后一个复制的值。

##  对象解构
    ECMAScript 6 新增了对象解构语法，可以在一条语句中使用嵌套数据实现一个或多个赋值操作。简单地说，对象解构就是使用与对象匹配的结构来实现对象属性赋值
    let person = {
        name: 'Matt',
        age: 27
    };
    let { name: personName, age: personAge } = person;
    let { name, age } = person;

##  嵌套解构
    let person = {
        name: 'Matt',
        ge: 27,
        job: {
            title: 'Software engineer'
        }
    };
    // 声明 title 变量并将 person.job.title 的值赋给它
    let { job: { title } } = person; 

    // 参数上下文匹配
    function printPerson(foo, {name, age}, bar) {
        console.log(arguments);
        console.log(name, age);
    } 

##  创建对象

##  工厂模式
    function createPerson(name, age, job) {
        let o = new Object();
        o.name = name;
        o.age = age;
        o.job = job;
        o.sayName = function() {
            console.log(this.name);
        };
        return o;
    }
    let person1 = createPerson("Nicholas", 29, "Software Engineer");
    let person2 = createPerson("Greg", 27, "Doctor");

##  构造函数模式

    function Person(name, age, job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = function() {
            console.log(this.name);
        };
    }
    let person1 = new Person("Nicholas", 29, "Software Engineer");
    let person2 = new Person("Greg", 27, "Doctor"); 
    要创建 Person 的实例，应使用 new 操作符。以这种方式调用构造函数会执行如下操作。
        (1) 在内存中创建一个新对象。
        (2) 这个新对象内部的[[Prototype]]特性被赋值为构造函数的 prototype 属性。
        (3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
        (4) 执行构造函数内部的代码（给新对象添加属性）。
        (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

##  构造函数也是函数
    构造函数与普通函数唯一的区别就是调用方式不同。除此之外，构造函数也是函数。并没有把某个函数定义为构造函数的特殊语法。任何函数只要使用 new 操作符调用就是构造函数，而不使用 new 操作符调用的函数就是普通函数。

##  构造函数的问题
    构造函数虽然有用，但也不是没有问题。构造函数的主要问题在于，其定义的方法会在每个实例上都创建一遍。因此对前面的例子而言，person1 和 person2 都有名为 sayName()的方法，但这两个方法不是同一个 Function 实例。我们知道，ECMAScript 中的函数是对象，因此每次定义函数时，都会初始化一个对象。逻辑上讲，这个构造函数实际上是这样的：
    function Person(name, age, job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = new Function("console.log(this.name)"); // 逻辑等价
    } 

    要解决这个问题，可以把函数定义转移到构造函数外部：
    function Person(name, age, job){
        this.name = name;
        this.age = age;
        this.job = job;
        this.sayName = sayName;
    }
    function sayName() {
        console.log(this.name);
    }
    let person1 = new Person("Nicholas", 29, "Software Engineer");
    let person2 = new Person("Greg", 27, "Doctor"); 


##  原型模式
##  理解原型
    无论何时，只要创建一个函数，就会按照特定的规则为这个函数创建一个 prototype 属性（指向原型对象）。默认情况下，所有原型对象自动获得一个名为 constructor 的属性，指回与之关联的构
    造函数。对前面的例子而言，Person.prototype.constructor 指向 Person。然后，因构造函数而异，可能会给原型对象添加其他属性和方法。

##  原型层级
    在通过对象访问属性时，会按照这个属性的名称开始搜索。搜索开始于对象实例本身。如果在这个实例上发现了给定的名称，则返回该名称对应的值。如果没有找到这个属性，则搜索会沿着指针进入原型对象，然后在原型对象上找到属性后，再返回对应的值。

##   属性枚举顺序
    for-in 循环、Object.keys()、Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()以及 Object.assign()在属性枚举顺序方面有很大区别。for-in 循环和 Object.keys()的枚举顺序是不确定的，取决于 JavaScript 引擎，可能因浏览器而异。Object.getOwnPropertyNames()、Object.getOwnPropertySymbols()和 Object.assign()的枚举顺序是确定性的。先以升序枚举数

##  原型的问题
    原型模式也不是没有问题。首先，它弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的属性值。虽然这会带来不便，但还不是原型的最大问题。原型的最主要问题源自它的共享特性。

##  继承
    实现继承是 ECMAScript 唯一支持的继承方式，而这主要是通过原型链实现的。
##  原型链的问题
    原型链虽然是实现继承的强大工具，但它也有问题。主要问题出现在原型中包含引用值的时候。前面在谈到原型的问题时也提到过，原型中包含的引用值会在所有实例间共享，这也是为什么属性通常会在构造函数中定义而不会定义在原型上的原因。在使用原型实现继承时，原型实际上变成了另一个类型的实例。这意味着原先的实例属性摇身一变成为了原型属性。
##  盗用构造函数
    为了解决原型包含引用值导致的继承问题，一种叫作“盗用构造函数”（constructor stealing）的技术在开发社区流行起来（这种技术有时也称作“对象伪装”或“经典继承”）。基本思路很简单：在子类构造函数中调用父类构造函数。因为毕竟函数就是在特定上下文中执行代码的简单对象，所以可以使用apply()和 call()方法以新创建的对象为上下文执行构造函数。
    function SuperType() {
        this.colors = ["red", "blue", "green"];
    }
    function SubType() {
        // 继承 SuperType
        SuperType.call(this);
    }

##  盗用构造函数的问题
    盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所有类型只能使用构造函数模式。由于存在这些问题，盗用构造函数基本上也不能单独使用。

##  组合继承
    组合继承（有时候也叫伪经典继承）综合了原型链和盗用构造函数，将两者的优点集中了起来。基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

##  类的构成
    类可以包含构造函数方法、实例方法、获取函数、设置函数和静态类方法，但这些都不是必需的。空的类定义照样有效。默认情况下，类定义中的代码都在严格模式下执行。

##  类构造函数
    constructor 关键字用于在类定义块内部创建类的构造函数。方法名 constructor 会告诉解释器在使用 new 操作符创建类的新实例时，应该调用这个函数。构造函数的定义不是必需的，不定义构造函数相当于将构造函数定义为空函数。
##  实例化
    使用 new 操作符实例化 Person 的操作等于使用 new 调用其构造函数。唯一可感知的不同之处就是，JavaScript 解释器知道使用 new 和类意味着应该使用 constructor 函数进行实例化。使用 new 调用类的构造函数会执行如下操作。
        (1) 在内存中创建一个新对象。
        (2) 这个新对象内部的[[Prototype]]指针被赋值为构造函数的 prototype 属性。
        (3) 构造函数内部的 this 被赋值为这个新对象（即 this 指向新对象）。
        (4) 执行构造函数内部的代码（给新对象添加属性）。
        (5) 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

##  代理与反射
    ECMAScript 6 新增的代理和反射为开发者提供了拦截并向基本操作嵌入额外行为的能力。具体地说，可以给目标对象定义一个关联的代理对象，而这个代理对象可以作为抽象的目标对象来使用。在对目标对象的各种操作影响目标对象之前，可以在代理对象中对这些操作加以控制。

##  代理的问题与不足
##  代理中的 this
    代理潜在的一个问题来源是 this 值。我们知道，方法中的 this 通常指向调用这个方法的对象

##  代理与内部槽位
    代理与内置引用类型（比如 Array）的实例通常可以很好地协同，但有些 ECMAScript 内置类型可能会依赖代理无法控制的机制，结果导致在代理上调用某些方法会出错
    一个典型的例子就是 Date 类型。根据 ECMAScript 规范，Date 类型方法的执行依赖 this 值上的内部槽位[[NumberDate]]

##  函数
##  箭头函数中的参数
    如果函数是使用箭头语法定义的，那么传给函数的参数将不能使用 arguments 关键字访问，而只能通过定义的命名参数访问。
    function foo() {
        console.log( arguments[0]);
    }
    foo(5)    // 5
    let bar = () => {
        console.log(argumnets[0]);
    }
    bar();      // ReferenceError: argumnets is not defined

##  没有重载
    ECMAScript 函数不能像传统编程那样重载。在其他语言比如 Java 中，一个函数可以有两个定义，只要签名（接收参数的类型和数量）不同就行。如前所述，ECMAScript 函数没有签名，因为参数是由包含零个或多个值的数组表示的。没有函数签名，自然也就没有重载。

##  函数声明与函数表达式
    本章到现在一直没有把函数声明和函数表达式区分得很清楚。事实上，JavaScript 引擎在加载数据时对它们是区别对待的。JavaScript 引擎在任何代码执行之前，会先读取函数声明，并在执行上下文中生成函数定义。而函数表达式必须等到代码执行到它那一行，才会在执行上下文中生成函数定义。
    //没问题
    console.log(sum(10, 10));
    function sum(num1, num2) {
         return num1 + num2;
    }
    以上代码可以正常运行，因为函数声明会在任何代码执行之前先被读取并添加到执行上下文。这个过程叫作函数声明提升（function declaration hoisting）。在执行代码时，JavaScript 引擎会先执行一遍扫描，把发现的函数声明提升到源代码树的顶部。因此即使函数定义出现在调用它们的代码之后，引擎也会把函数声明提升到顶部。如果把前面代码中的函数声明改为等价的函数表达式，那么执行的时候就会出错
    // 会出错
    console.log( sum( 10, 10));
    let sum = function( num1, num2) {
        return num1 + num2;
    }

##  函数作为值
    因为函数名在 ECMAScript 中就是变量，所以函数可以用在任何可以使用变量的地方。这意味着不仅可以把函数作为参数传给另一个函数，而且还可以在一个函数中返回另一个函数

##  函数内部
    在 ECMAScript 5 中，函数内部存在两个特殊的对象：arguments 和 this。ECMAScript 6 又新增了 new.target 属性。

##  this
    另一个特殊的对象是 this，它在标准函数和箭头函数中有不同的行为。在标准函数中，this 引用的是把函数当成方法调用的上下文对象，这时候通常称其为 this 值（在网页的全局上下文中调用函数时，this 指向 windows）。
    window.color = 'red';
    let o = {
        color: 'blue'
    };
    function sayColor() {
        console.log(this.color);
    }
    sayColor(); // 'red'
    o.sayColor = sayColor;
    o.sayColor(); // 'blue'
    定义在全局上下文中的函数 sayColor()引用了 this 对象。这个 this 到底引用哪个对象必须到函数被调用时才能确定。因此这个值在代码执行的过程中可能会变。
    
    
##  在箭头函数中，this引用的是定义箭头函数的上下文。这是因为箭头函数中的 this 会保留定义该函数时的上下文：
    function King() {
        this.royaltyName = 'Henry';
        setTimeout( () => console.log(this.royaltyName), 1000)
    }

    function Queen() {
        this.royaltyName = "Elizabeth"
        // this引用了window对象
        setTimeout(function(){ console.log( this.royaltyName)}, 1000)
    }
    new King();  // Henry
    new Queen(); // undefined

##  caller
    ECMAScript 5 也会给函数对象上添加一个属性：caller。虽然 ECMAScript 3 中并没有定义，但所有浏览器除了早期版本的 Opera 都支持这个属性。这个属性引用的是调用当前函数的函数，或者如果是在全局作用域中调用的则为 null。

##  new.target
    ECMAScript 中的函数始终可以作为构造函数实例化一个新对象，也可以作为普通函数被调用。ECMAScript 6 新增了检测函数是否使用 new 关键字调用的 new.target 属性。如果函数是正常调用的，则 new.target 的值是 undefined；如果是使用 new 关键字调用的，则 new.target 将引用被调用的构造函数。

    
##  函数属性与方法
    前面提到过，ECMAScript 中的函数是对象，因此有属性和方法。每个函数都有两个属性：length和 prototype。其中，length 属性保存函数定义的命名参数的个数，

    prototype 属性也许是 ECMAScript 核心中最有趣的部分。prototype 是保存引用类型所有实例方法的地方，这意味着 toString()、valueOf()等方法实际上都保存在 prototype 上，进而由所有实例共享。这个属性在自定义类型时特别重要。（相关内容已经在第 8 章详细介绍过了。）在 ECMAScript 5中，prototype 属性是不可枚举的，因此使用 for-in 循环不会返回这个属性

    函数还有两个方法：apply()和 call()。这两个方法都会以指定的 this 值来调用函数，即会设置调用函数时函数体内 this 对象的值。apply()方法接收两个参数：函数内 this 的值和一个参数数组。第二个参数可以是 Array 的实例，但也可以是 arguments 对象。call()方法与 apply()的作用一样，只是传参的形式不同。第一个参数跟 apply()一样，也是 this值，而剩下的要传给被调用函数的参数则是逐个传递的。

##  尾调用优化
    ECMAScript 6 规范新增了一项内存管理优化机制，让 JavaScript 引擎在满足条件时可以重用栈帧。具体来说，这项优化非常适合“尾调用”，即外部函数的返回值是一个内部函数的返回值。
    
    function outerFunction() {
        return innerFunction(); // 尾调用
    }
    在 ES6 优化之前，执行这个例子会在内存中发生如下操作。
    (1) 执行到 outerFunction 函数体，第一个栈帧被推到栈上。
    (2) 执行 outerFunction 函数体，到 return 语句。计算返回值必须先计算 innerFunction。
    (3) 执行到 innerFunction 函数体，第二个栈帧被推到栈上。
    (4) 执行 innerFunction 函数体，计算其返回值。
    (5) 将返回值传回 outerFunction，然后 outerFunction 再返回值。
    (6) 将栈帧弹出栈外。
    在 ES6 优化之后，执行这个例子会在内存中发生如下操作。
    (1) 执行到 outerFunction 函数体，第一个栈帧被推到栈上。
    (2) 执行 outerFunction 函数体，到达 return 语句。为求值返回语句，必须先求值 innerFunction。
    (3) 引擎发现把第一个栈帧弹出栈外也没问题，因为 innerFunction 的返回值也是 outerFunction的返回值。
    (4) 弹出 outerFunction 的栈帧。
    (5) 执行到 innerFunction 函数体，栈帧被推到栈上。
    (6) 执行 innerFunction 函数体，计算其返回值。
    (7) 将 innerFunction 的栈帧弹出栈外。
    很明显，第一种情况下每多调用一次嵌套函数，就会多增加一个栈帧。而第二种情况下无论调用多少次嵌套函数，都只有一个栈帧。这就是 ES6 尾调用优化的关键：如果函数的逻辑允许基于尾调用将其销毁，则引擎就会那么做。

##  尾调用优化的条件
    尾调用优化的条件就是确定外部栈帧真的没有必要存在了。涉及的条件如下：
    (1) 代码在严格模式下执行；
    (2) 外部函数的返回值是对尾调用函数的调用；
    (3) 尾调用函数返回后不需要执行额外的逻辑；
    (4) 尾调用函数不是引用外部函数作用域中自由变量的闭包。

##  闭包
    理解作用域链创建和使用的细节对理解闭包非常重要。在调用一个函数时，会为这个函数调用创建一个执行上下文，并创建一个作用域链。然后用 arguments和其他命名参数来初始化这个函数的活动对象。外部函数的活动对象是内部函数作用域链上的第二个对象。这个作用域链一直向外串起了所有包含函数的活动对象，直到全局执行上下文才终止。

    function compare( value1, value2) {
        if( value1 < value2) {
            return -1;
        } else {
            return 0;
        }
    }
    let result = compare(5, 10);    
    
    这里定义的 compare()函数是在全局上下文中调用的。第一次调用 compare()时，会为它创建一个包含 arguments、value1 和 value2 的活动对象，这个对象是其作用域链上的第一个对象。而全局上下文的变量对象则是 compare()作用域链上的第二个对象，其中包含 this、result 和 compare。

    
    待定（pending）
    兑现（fulfilled，有时候也称为“解决”，resolved）
    拒绝（rejected）

##  期约状态机
    在把一个期约实例传给 console.log()时，控制台输出（可能因浏览器不同而略有差异）表明该实例处于待定（pending）状态。如前所述，期约是一个有状态的对象，可能处于如下 3 种状态之一：

##  通过执行函数控制期约状态
    由于期约的状态是私有的，所以只能在内部进行操作。内部操作在期约的执行器函数中完成。执行器函数主要有两项职责：初始化期约的异步行为和控制状态的最终转换。其中，控制期约状态的转换是通过调用它的两个函数参数实现的。这两个函数参数通常都命名为 resolve()和 reject()。调用resolve()会把状态切换为兑现，调用 reject()会把状态切换为拒绝。另外，调用 reject()也会抛出错误（后面会讨论这个错误）。

    let p = new Promise((resolve, reject) => {
        resolve();
        reject(); // 没有效果
    });

##  Promise.resolve()
    期约并非一开始就必须处于待定状态，然后通过执行器函数才能转换为落定状态。通过调用Promise.resolve()静态方法，可以实例化一个解决的期约。下面两个期约实例实际上是一样的：
    let p1 = new Promise((resolve, reject) => resolve());
    let p2 = Promise.resolve(); 
    注意，这个静态方法能够包装任何非期约值，包括错误对象，并将其转换为解决的期约。因此，也可能导致不符合预期的行为：
    let p = Promise.resolve(new Error('foo'));
    setTimeout(console.log, 0, p);
    // Promise <resolved>: Error: foo

##  Promise.reject()
    与 Promise.resolve()类似，Promise.reject()会实例化一个拒绝的期约并抛出一个异步错误（这个错误不能通过 try/catch 捕获，而只能通过拒绝处理程序捕获）。下面的两个期约实例实际上是一样的：
    let p1 = new Promise((resolve, reject) => reject());
    let p2 = Promise.reject(); 

##  同步/异步执行的二元性
    try {
        throw new Error('foo');
    } catch(e) {
        console.log(e); // Error: foo
    }
    try {
        Promise.reject(new Error('bar'));
    } catch(e) {
        console.log(e);
    }
    // Uncaught (in promise) Error: bar

    第一个 try/catch 抛出并捕获了错误，第二个 try/catch 抛出错误却没有捕获到。乍一看这可能有点违反直觉，因为代码中确实是同步创建了一个拒绝的期约实例，而这个实例也抛出了包含拒绝理由的错误。这里的同步代码之所以没有捕获期约抛出的错误，是因为它没有通过异步模式捕获错误。从这里就可以看出期约真正的异步特性：它们是同步对象（在同步执行模式中使用），但也是异步执行模式的媒介。

##  期约的实例方法
    期约实例的方法是连接外部同步代码与内部异步代码之间的桥梁。这些方法可以访问异步操作返回的数据，处理期约成功和失败的结果，连续对期约求值，或者添加只有期约进入终止状态时才会执行的代码。

##  实现 Thenable 接口
    在 ECMAScript 暴露的异步结构中，任何对象都有一个 then()方法。这个方法被认为实现了Thenable 接口。
    Promise.prototype.then()
    Promise.prototype.then()是为期约实例添加处理程序的主要方法。这个 then()方法接收最多两个参数：onResolved 处理程序和 onRejected 处理程序。这两个参数都是可选的，如果提供的话，则会在期约分别进入“兑现”和“拒绝”状态时执行。

##  Promise.prototype.catch()
    Promise.prototype.catch()方法用于给期约添加拒绝处理程序。这个方法只接收一个参数：onRejected 处理程序。事实上，这个方法就是一个语法糖，调用它就相当于调用 Promise.prototype.then(null, onRejected)。

##  Promise.prototype.finally()
    Promise.prototype.finally()方法用于给期约添加 onFinally 处理程序，这个处理程序在期约转换为解决或拒绝状态时都会执行。这个方法可以避onResolved 和 onRejected 处理程序中出现冗余代码。但 onFinally 处理程序没有办法知道期约的状态是解决还是拒绝，所以这个方法主要用于添加清理代码。

##  Promise.all()
    Promise.all()静态方法创建的期约会在一组期约全部解决之后再解决。这个静态方法接收一个可迭代对象，返回一个新期约：
    let p1 = Promise.all([
        Promise.resolve(),
        Promise.resolve()
    ]); 
    合成的期约只会在每个包含的期约都解决之后才解决
    如果至少有一个包含的期约待定，则合成的期约也会待定。如果有一个包含的期约拒绝，则合成的期约也会拒绝
    如果所有期约都成功解决，则合成期约的解决值就是所有包含期约解决值的数组，按照迭代器顺序

##  Promise.race()
    静态方法返回一个包装期约，是一组集合中最先解决或拒绝的期约的镜像。这个方法接收一个可迭代对象，返回一个新期约
##  串行期约合成
    异步产生值并将其传给处理程序。基于后续期约使用之前期约的返回值来串联期约是期约的基本功能。这很像函数合成，即将多个函数合成为一个函数。
    可以通过Promise返回一个新Promise来实现

##  异步函数
    ES8 的 async/await 旨在解决利用异步结构组织代码的问题。为此，ECMAScript 对函数进行了扩展，为其增加了两个新关键字：async 和 await。
##  async
    async 关键字用于声明异步函数。这个关键字可以用在函数声明、函数表达式、箭头函数和方法上：
    async function() {}
    let bar = async function() {}
    let baz = async () => {}
    class Qux() {
        async qux(){}
    }
    使用 async 关键字可以让函数具有异步特征，但总体上其代码仍然是同步求值的。而在参数或闭包方面，异步函数仍然具有普通 JavaScript 函数的正常行为。正如下面的例子所示，foo()函数仍然会在后面的指令之前被求值：
    async function foo() {
        console.log(1);
    }
    console.log(2)
    // 1
    // 2
    不过，异步函数如果使用 return 关键字返回了值（如果没有 return 则会返回 undefined），这个值会被 Promise.resolve()包装成一个期约对象。异步函数始终返回期约对象。。在函数外部调用这个函数可以得到它返回的期约
    async function foo() {
        console.log(1);
        return 3;
    }
    foo().then(console.log);
    console.log(2);
    // 1
    // 2
    // 3
    当然，直接返回一个期约对象也是一样的：
    async function foo() {
        console.log(1);
        return Promise.resolve(3);
    } 
 ##   await
    因为异步函数主要针对不会马上完成的任务，所以自然需要一种暂停和恢复执行的能力。使用 await关键字可以暂停异步函数代码的执行，等待期约解决
    async function foo() {
        let p = new Promise( (resolve, reject) => setTimeout(resolve, 1000, 3));
        console.log( await p );
    }
    foo();

    await 关键字期待（但实际上并不要求）一个实现 thenable 接口的对象，但常规的值也可以。如果是实现 thenable 接口的对象，则这个对象可以由 await 来“解包”。如果不是，则这个值就被当作已经解决的期约。下面的代码演示了这些情况
    // 等待一个原始值
    async function foo() {
        console.log(await 'foo');
    }
    foo();
    // foo

    // 等待一个期约
    async function qux() {
        console.log(await Promise.resolve('qux'));
    }
    qux();
    // qux

##  BOM 

##  window 对象
    BOM 的核心是 window 对象，表示浏览器的实例。window 对象在浏览器中有两重身份，一个是ECMAScript 中的 Global 对象，另一个就是浏览器窗口的 JavaScript 接口。

##  Global 作用域
    因为 window 对象被复用为 ECMAScript 的 Global 对象，所以通过 var 声明的所有全局变量和函数都会变成 window 对象的属性和方法。

##  窗口位置与像素比
    window 对象的位置可以通过不同的属性和方法来确定。现代浏览器提供了 screenLeft 和screenTop 属性，用于表示窗口相对于屏幕左侧和顶部的位置 ，返回值的单位是 CSS 像素。可以使用 moveTo()和 moveBy()方法移动窗口。这两个方法都接收两个参数，其中 moveTo()接收要移动到的新位置的绝对坐标 x 和 y；而 moveBy()则接收相对当前位置在两个方向上移动的像素数。比如：
    // 把窗口移动到左上角
    window.moveTo(0,0);
    // 把窗口向下移动 100 像素
    window.moveBy(0, 100); 

##  像素比
    CSS 像素是 Web 开发中使用的统一像素单位。这个单位的背后其实是一个角度：0.0213°。如果屏幕距离人眼是一臂长，则以这个角度计算的 CSS 像素大小约为 1/96 英寸。这样定义像素大小是为了在不同设备上统一标准。

##  窗口大小
    在不同浏览器中确定浏览器窗口大小没有想象中那么容易。所有现代浏览器都支持 4 个属性：innerWidth、innerHeight、outerWidth 和 outerHeight。outerWidth 和 outerHeight 返回浏览器窗口自身的大小（不管是在最外层 window 上使用，还是在窗格<frame>中使用）。innerWidth和 innerHeight 返回浏览器窗口中页面视口的大小（不包含浏览器边框和工具栏）。

##  location 对象
    location 是最有用的 BOM 对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。这个对象独特的地方在于，它既是 window 的属性，也是 document 的属性。也就是说，window.location 和 document.location 指向同一个对象。location 对象不仅保存着当前加载文档的信息，也保存着把 URL 解析为离散片段后能够通过属性访问的信息。

##  navigator 对象  
    浏览器和系统相关

##  screen 对象
    window 的另一个属性 screen 对象，是为数不多的几个在编程中很少用的 JavaScript 对象。这个对象中保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度。每个浏览器都会在 screen 对象上暴露不同的属性。

##  history 对象
    history 对象表示当前窗口首次使用以来用户的导航历史记录。因为 history 是 window 的属性，所以每个 window 都有自己的 history 对象。出于安全考虑，这个对象不会暴露用户访问过的 URL，但可以通过它在不知道实际 URL 的情况下前进和后退。

##  客户端检测
    虽然浏览器厂商齐心协力想要实现一致的接口，但事实上仍然是每家浏览器都有自己的长处与不足。跨平台的浏览器尽管版本相同，但总会存在不同的问题。这些差异迫使 Web 开发者要么面向最大公约数而设计，要么（更常见地）使用各种方法来检测客户端，以克服或避免这些缺陷。

##  能力检测
    能力检测（又称特性检测）即在 JavaScript 运行时中使用一套简单的检测逻辑，测试浏览器是否支持某种特性。这种方式不要求事先知道特定浏览器的信息，只需检测自己关心的能力是否存在即可。

##  浏览器分析
    想要知道自己代码运行在什么浏览器上，大部分开发者会分析 window.navigator.userAgent返回的字符串值。所有浏览器都会提供这个值，如果相信这些返回值并基于给定的一组浏览器检测这个字符串，最终会得到关于浏览器和操作系统的比较精确的结果。

##  能力检测
    在使用之前先测试浏览器的特定能力。例如，脚本可以在调用某个函数之前先检查它是否存在。这种客户端检测方式可以让开发者不必考虑特定的浏览器或版本，而只需关注某些能力是否存在。能力检测不能精确地反映特定的浏览器或版本。
##  用户代理检测
    通过用户代理字符串确定浏览器。用户代理字符串包含关于浏览器的很多信息，通常包括浏览器、平台、操作系统和浏览器版本。用户代理字符串有一个相当长的发展史，很多浏览器都试图欺骗网站相信自己是别的浏览器。用户代理检测也比较麻烦，特别是涉及 Opera会在代理字符串中隐藏自己信息的时候。即使如此，用户代理字符串也可以用来确定浏览器使用的渲染引擎以及平台，包括移动设备和游戏机。

##  DOM 
##  MutationObserver 接口
    不久前添加到 DOM 规范中的 MutationObserver 接口，可以在 DOM 被修改时异步执行回调。使用 MutationObserver 可以观察整个文档、DOM 树的一部分，或某个元素。此外还可以观察元素属性子节点、文本，或者前三者任意组合的变化。
    MutationObserver 的实例要通过调用 MutationObserver 构造函数并传入一个回调函数来创建：
    let observer = new MutationObserver(() => console.log('DOM was mutated!')); 
    
    observe()方法
    新创建的 MutationObserver 实例不会关联 DOM 的任何部分。要把这个 observer 与 DOM 关联起来，需要使用 observe()方法。这个方法接收两个必需的参数：要观察其变化的 DOM 节点，以及一个 MutationObserverInit 对象。
    let observer = new  MutationObserver( () => {
         console.log('<body> attributes changed'))
    });
    observer.observer(document.body, {attributes: true});
    document.body.className = 'foo';
    onsole.log('Changed body class');
    // Changed body class
    // <body> attributes changed 

##  2. 回调与 MutationRecord
    每个回调都会收到一个 MutationRecord 实例的数组。MutationRecord 实例包含的信息包括发生了什么变化，以及 DOM 的哪一部分受到了影响。因为回调执行之前可能同时发生多个满足观察条件的事件，所以每次执行回调都会传入一个包含按顺序入队的 MutationRecord 实例的数组。
    let observer = new MutationObserver((mutationRecords) => console.log(mutationRecords));
    observer.observe(document.body, { attributes: true });

##  disconnect()方法
    默认情况下，只要被观察的元素不被垃圾回收，MutationObserver 的回调就会响应 DOM 变化事件，从而被执行。要提前终止执行回调，可以调用 disconnect()方法。
    observer.disconnect();

##  复用 MutationObserver
    多次调用 observe()方法，可以复用一个 MutationObserver 对象观察多个不同的目标节点。此时，MutationRecord 的 target 属性可以标识发生变化事件的目标节点。

##  重用 MutationObserver
    调用 disconnect()并不会结束 MutationObserver 的生命。还可以重新使用这个观察者，再将它关联到新的目标节点。

##  异步回调与记录队列
    MutationObserver 接口是出于性能考虑而设计的，其核心是异步回调与记录队列模型。为了在大量变化事件发生时不影响性能，每次变化的信息（由观察者实例决定）会保存在 MutationRecord实例中，然后添加到记录队列。这个队列对每个 MutationObserver 实例都是唯一的，是所有 DOM变化事件的有序列表。

##  记录队列
    每次 MutationRecord 被添加到 MutationObserver 的记录队列时，仅当之前没有已排期的微任务回调时（队列中微任务长度为 0），才会将观察者注册的回调（在初始化 MutationObserver 时传入）作为微任务调度到任务队列上。这样可以保证记录队列的内容不会被回调处理两次。
    不过在回调的微任务异步执行期间，有可能又会发生更多变化事件。因此被调用的回调会接收到一个 MutationRecord 实例的数组，顺序为它们进入记录队列的顺序。回调要负责处理这个数组的每一个实例，因为函数退出之后这些实现就不存在了。回调执行后，这些 MutationRecord 就用不着了，因此记录队列会被清空，其内容会被丢弃。

##  takeRecords()方法
    调用 MutationObserver 实例的 takeRecords()方法可以清空记录队列，取出并返回其中的所有 MutationRecord 实例。

##  DOM 扩展
##  Selectors API 
    Selectors API Level 1 的核心是两个方法：querySelector()和 querySelectorAll()。在兼容浏览器中，Document 类型和 Element 类型的实例上都会暴露这两个方法。
##  querySelector()
    querySelector()方法接收 CSS 选择符参数，返回匹配该模式的第一个后代元素，如果没有匹配项则返回 null。
##  querySelectorAll()
    querySelectorAll()方法跟 querySelector()一样，也接收一个用于查询的参数，但它会返回所有匹配的节点，而不止一个。这个方法返回的是一个 NodeList 的静态实例。

##  HTML5 
##  CSS 类扩展
##  getElementsByClassName()
##  classList 属性
    要操作类名，可以通过 className 属性实现添加、删除和替换。
##  readyState 属性
    document.readyState 属性有两个可能的值：
    loading，表示文档正在加载；
    complete，表示文档加载完成。

##  自定义数据属性
    HTML5 允许给元素指定非标准的属性，但要使用前缀 data-以便告诉浏览器，这些属性既不包含与渲染有关的信息，也不包含元素的语义信息。

##  DOM2 和 DOM3 

##  DOM2 事件处理程序
    DOM2 Events 为事件处理程序的赋值和移除定义了两个方法：addEventListener()和 removeEventListener()。这两个方法暴露在所有 DOM 节点上，它们接收 3 个参数：事件名、事件处理函数和一个布尔值，true 表示在捕获阶段调用事件处理程序，false（默认值）表示在冒泡阶段调用事件处理程序。
    let btn = document.getElementById("myBtn");
    btn.addEventListener("click", () => {
        console.log(this.id);
    }, false);
    大多数情况下，事件处理程序会被添加到事件流的冒泡阶段，主要原因是跨浏览器兼容性好。把事件处理程序注册到捕获阶段通常用于在事件到达其指定目标之前拦截事件。如果不需要拦截，则不要使用事件捕获。

##  事件对象
    在 DOM 中发生事件时，所有相关信息都会被收集并存储在一个名为 event 的对象中。这个对象包含了一些基本信息，比如导致事件的元素、发生的事件类型，以及可能与特定事件相关的任何其他数据。例如，鼠标操作导致的事件会生成鼠标位置信息，而键盘操作导致的事件会生成与被按下的键有关的信息。所有浏览器都支持这个 event 对象，尽管支持方式不同。在 DOM 合规的浏览器中，event 对象是传给事件处理程序的唯一参数。
    let btn = document.getElementById("myBtn");
    btn.onclick = function(event) {
        console.log(event.type); // "click"
    };
    btn.addEventListener("click", (event) => {
        console.log(event.type); // "click"
    }, false);

##  1. load 事件
    load 事件可能是 JavaScript 中最常用的事件。在 window 对象上，load 事件会在整个页面（包括所有外部资源如图片、JavaScript 文件和 CSS 文件）加载完成后触发。

##  事件委托
    “过多事件处理程序”的解决方案是使用事件委托。事件委托利用事件冒泡，可以只使用一个事件处理程序来管理一种类型的事件。使用事件委托，只要给所有元素共同的祖先节点添加一个事件处理程序，就可以解决问题。
    let list = document.getElementId("myLinks);
    list.addEventListener("click", (event) => {
        let target = event.target;
        switch( target.id) {
            
        }
    })

##  动画与 Canvas 图形 
    function updateProgress() {
        var div = document.getElementById("status");
        div.style.width = (parseInt(div.style.width, 10) + 5) + "%";
        if (div.style.left != "100%") {
            requestAnimationFrame(updateProgress);
        }
    }
    requestAnimationFrame(updateProgress); 

    先来看一个原生实现，其中的滚动事件监听器每次触发都会调用名为 expensiveOperation()（耗时操作）的函数。当向下滚动网页时，这个事件很快就会被触发并执行成百上千次：
    如果想把事件处理程序的调用限制在每次重绘前发生，那么可以像这样下面把它封装到 requestAnimationFrame()调中：
    function expensiveOperation() {
        console.log('Invoked at', Date.now());
    }
    window.addEventListener('scroll', () => {
        expensiveOperation()
    });

    // 修改为
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(expensiveOperation);
    });
    因为重绘是非常频繁的操作，所以这还算不上真正的节流。更好的办法是配合使用一个计时器来限制操作执行的频率。

##  基本的画布功能
##  填充和描边
    2D 上下文有两个基本绘制操作：填充和描边。填充以指定样式（颜色、渐变或图像）自动填充形状，而描边只为图形边界着色。大多数 2D 上下文操作有填充和描边的变体，显示效果取决于两个属性：fillStyle 和 strokeStyle。

##  绘制矩形
    矩形是唯一一个可以直接在 2D 绘图上下文中绘制的形状。与绘制矩形相关的方法有 3 个：fillRect()、strokeRect()和 clearRect()。这些方法都接收 4 个参数：矩形 x 坐标、矩形 y 坐标、矩形宽度和矩形高度。这几个参数的单位都是像素。

##  绘制路径
    2D 绘图上下文支持很多在画布上绘制路径的方法。通过路径可以创建复杂的形状和线条。要绘制路径，必须首先调用 beginPath()方法以表示要开始绘制新路径。然后，再调用下列方法来绘制路径。
    arc等

##  绘制文本
    文本和图像混合也是常见的绘制需求，因此2D绘图上下文还提供了绘制文本的方法，即fillText()和 strokeText()。这两个方法都接收 4 个参数：要绘制的字符串、x 坐标、y 坐标和可选的最大像素宽度。而且，这两个方法最终绘制的结果都取决于以下 3 个属性。