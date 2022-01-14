// import * as print from './exportTest'
// console.log(print)

// print('test')

// eval("function sayHi() { console.log('hi'); }");
// sayHi(); 

// let global = function() {
//     return this;
// }(); 
// console.log( global) // lObject [global] {}

// let foo = {
//     * generatorFn() {}
// } 
// console.log( foo)

// 代理proxy

// let target = {
//     id: "target"
// }

// let handler = {}

// let proxy = new Proxy(target, handler)

// // id 属性会访问同一个值
// console.log( target.id)
// console.log( proxy.id)

// target.id = "foo";
// console.log( target.id)
// console.log( proxy.id)

// proxy.id = "test";
// console.log( target.id)
// console.log( proxy.id)

// console.log( target.hasOwnProperty('id'))
// console.log( proxy.hasOwnProperty('id'))

// console.log( target.__proto__)
// console.log( proxy.__proto__)

// let target = {
//     foo: 'bar'
// };
// let handler = {
//     get() {
//         return 'handler override';
//     }
// };

// let proxy = new Proxy(target, handler);

// console.log( target.foo);
// console.log( proxy.foo);
// console.log( target['foo']);
// console.log( proxy['foo']);
// console.log( Object.create(target)['foo']);
// console.log( Object.create(proxy)['foo']);



// let target = {
//     foo: 'bar'
// };
// let handler = {
//     get(trapTarget, property, receiver) {
//         console.log(trapTarget === target);
//         console.log(property);
//         console.log(receiver === proxy);
//     }
// };

// let proxy = new Proxy( target, handler);

// proxy.foo;

// let target = {
//     foo: 'bar'
// };
// let handler = {
//     get() {
//         return Reflect.get( ...arguments);
//     }
// };
// let proxy = new Proxy(target, handler);

// console.log(proxy.foo);
// console.log(target.foo);

// const target = {
//     foo: 'bar',
//     baz: 'qux'
// };
// let handler = {
//     get(trapTarget, property, receivee) {
//         let decoration = '';
//         if(property === 'foo') {
//             decoration = '!!!';
//         }
//         return Reflect.get(...arguments) + decoration;
//     }
// };

// let proxy = new Proxy(target, handler);
// console.log( target.foo);
// console.log( proxy.foo);
// console.log( target.baz);
// console.log( proxy.baz);

// let handler = {
//     get() {
//         return 'intercepted';
//     }
// };

// const {proxy, revoke} = Proxy.revocable(target, handler);
// console.log( proxy.foo);
// console.log( target.foo);

// revoke();
// console.log( proxy.foo)

// const o = {};

// try {
//     Object.defineProperty(o, 'foo', 'bar');   // failure
//     Object.defineProperty(o, 'foo', {value: 'bar'});   // success
//     console.log('success');
// } catch(e) {
//     console.log('failure');
// }

// if( Reflect.defineProperty(o, 'foo', {value: 'bar'})) {
//     console.log('success');
// } else {
//     console.log('failure');
// }
// Object.defineProperty(o, 'foo', 'bar');


// const target = {
//     foo: 'bar'
// };
// const firstProxy = new Proxy(target, {
//     get() {
//         console.log('first proxy');
//         return Reflect.get(...arguments);
//     }
// });
// const secondProxy = new Proxy(firstProxy, {
//     get() {
//         console.log('second proxy');
//         return Reflect.get(...arguments);
//     }
// });
// console.log(secondProxy.foo);

// const target = {
//     thisValEqualsProxy() {
//         return this === proxy;
//     }
// }

// const proxy = new Proxy(target, {});
// console.log(target.thisValEqualsProxy());   // false
// console.log(proxy.thisValEqualsProxy());    // true

// let user = {
//     name: 'Jake'
// };
// let proxy = new Proxy( user, {
//     get(target, property, receicver) {
//         console.log(`Getting ${property}`);
//         return Reflect.get(...arguments);
//     },
//     set(target, property, receiver) {
//         console.log(`Setting ${property}`);
//         Reflect.set(...arguments);
//     }
// })

// proxy.name;
// proxy.age = 27;

// function foo() {}
// let bar = function() {}
// let baz = () => {}
// console.log( foo.name);
// console.log( bar.name);
// console.log( baz.name);
// console.log((() => {}).name );
// console.log( (new Function()).name);

// function foo() {
//     console.log( arguments[0]);
// }
// foo(5)    // 5
// let bar = () => {
//     console.log(argumnets[0]);
// }
// bar();      // ReferenceError: arguments is not defined

// console.log(sum(10, 10));
// function sum(num1, num2) {
//     return num1 + num2;
// }

// 会出错
// console.log( sum( 10, 10));
// let sum = function( num1, num2) {
//     return num1 + num2;
// }

// function factorial(num) {
//     if( num < 1) {
//         return 1;
//     } else {
//         return num * factorial( num - 1 )
//     }
// }

// function factorial(num) {
//     if( num < 1) {
//         return 1;
//     } else {
//         return num * arguments.callee( num - 1);
//     }
// }
// console.log( factorial(5))

// function King() {
//     this.royaltyName = 'Henry';
//     setTimeout( () => console.log(this.royaltyName), 1000)
// }

// function Queen() {
//     this.royaltyName = "Elizabeth"
//     // this引用了window对象
//     setTimeout(function(){ console.log( this.royaltyName)}, 1000)
// }
// // new King();  // Henry
// new Queen(); // undefined


// function outer() {
//     inner();
// }
// function inner() {
//     console.log(inner.caller);
// }
// inner();

// function King() {
//     if(!new.target) {
//         throw 'King must be instantiated using "new"'
//     }
//     console.log('King instantiated using "new"');
// }

// new King();
// King();

// function compare( value1, value2) {
//     if( value1 < value2) {
//         return -1;
//     } else {
//         return 0;
//     }
// }

// let result = compare(5, 10);
// let p = new Promise.all( [
//     Promise.resolve(), 
//     Promise.resolve()
// ])

// async function foo() {
//     console.log(1);
//     return 3;
// }
// foo().then(console.log);
// console.log(2)

// let p = new Promise( (resolve, reject) => setTimeout(resolve, 1000, 3));
// p.then( x => console.log(x));

// async function foo() {
//     let p = new Promise( (resolve, reject) => setTimeout(resolve, 1000, 3));
//     console.log( await p );
// }
// foo();
