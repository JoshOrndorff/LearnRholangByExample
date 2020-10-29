# 更多语法

到目前为止你已经成功写出一些实际的项目。你就应该这么做！在我们深入下一单元前，让我们学习更多实用的语法，然后你需要的现实世界的工具来创建下一代杀手级应用。

## 二元运算符
第一个学习的语法就是二元运算符。二元运算符需要有两个操作数，那是他们为什么成为“二元”的原因。大多数都是用于算术。请看下面的例子。

[math.rho](math.rho)

### 练习
现在轮到你写出`f2c`的合约。你可以使用相同的两个测试案例以确保你的结果正确。

最后你应该知道的二元操作符是 `++` ，它是用于“联合”或者说把两个小东西组合成一个大东西。这个操作符适用于列表和字符串。列表我们会在下一单元学习到，字符串我们已经学习过了。

[greeter.rho](greeter.rho)

代码 `result!("I" ++ "<3" ++ "rholang")` 会输出什么?
- [ ] I <3 rholang
- [ ] ["I", "<3", "rholang"]
- [x] I<3rholang
- [ ] I++<3++rholang



## 接收 Processes?

我们通常发送 ____ 和接收 ____.
- [x] processes, names
- [ ] processes, processes
- [ ] names, names
- [ ] names, processes
- [ ] 没有严格规定

要做的事情：有一种站在门口的邮箱柜子。我们可能会把在你家门口的邮箱或者邮件槽什么的弄混。“嘿，兄弟，还是账单？我想要情书”。

那只是重温一下以前单元的内容。希望你还记住吧。如果你已经写过你自己的rholang代码，那么你可能已经发现你是多么的希望你可以直接接收"Processes"而不需要输入各种`*`。这是很普遍的一种现象，很幸运rholang有一个很好的解决方法。我们经常接收"names"，当时我们可以通过`@myValue`这里来绑定"name"语法。既然`@myValue`是一个"name"，那么`myValue`一定是一个"process"。

这个语法允许我们做像这样的事，
`for (@number <- @"someChan"){@"double"!(2 * number)}``

应该用什么样的代码来与前面的代码并行以达到`24`在`@"double"`中？
- [ ] @number!(12)
- [x] @"someChan"!(12)
- [ ] @number!(24)
- [ ] @"double"!(48)

### 练习
重看一下第三课中传音筒的游戏，那个展示我们已经使用了`@message`的语法模式，所以`message`是一个"process"

我们应该把 `for(@x <- @y){result!(...)}`  中 ... 替换为什么来让程序是正确的？
- [ ] `@x`
- [x] `x`
- [ ] `*x`


## 条件语句
几乎在所有编程语言中，程序的行为需要根据情况来定义。例如，如果天气很好的话，我就可以跑在小道上面，但是如果下雨的话，我就在路边。rholang是这样用语法实现的。

```
if ( /* condition */ ) {
  Nil // Do this if condition is true
}
else {
  Nil // Do this if condition is false
}`
```

你用`if`的情况是没有限制的，包括猜一个秘密字母的正确，在游戏中设定一个高分数，决定哪张扑克牌更大和计算选举胜者。下面的例子合约展示给你看如何检查一个银行账号的状态。

[signTest.rho](signTest.rho)

### 练习
The accounting program has a problem. It says that accounts with a balance of zero are overdrawn. But really zero should be in good standing. You can fix this using the "greater than or equal" operator, `>=`. Make sure you add a few tests to make sure it works.


## 比较符
现在你知道了如何使用`if`/`else`，这里还有很多比较符给你使用。
* `a > b` a大于b么？
* `a < b` a小于b么？
* `a == b` a等于b么？
* `a <= b` a小于或者等于b么？
* `a >= b` a大于或者等于b么？
* `a != b` a不等于b么？

这些操作符可以作用于数字或者字符串。字符串按照字典顺序排序，有点像字母表排序。但是小心！如果你用一个数字与一个字符串比较，它会是另一个停止的"process"。
These operators work on both numbers and text strings. Text strings are sorted lexicographically, which is a lot like alphabetically. But be careful! If you try to compare a number to a string, it will just be another stopped process.

下面哪个是对的？
- [ ] 4 < 3
- [ ] "b" < "a"
- [x] 5 <= 6
- [ ] "hello" != "hello"

### 练习

写一个rholang程序，要求用户发送他们的名字。在多数情况下，合约可以简单地回复“hello”，但是如果他们的名字与你的一样，你要告诉他们。

## 布尔操作符
Rholang也有传统的布尔操作符， AND, OR, 和 NOT。语法是

* 当 `a`和`b`都是真的，`a and b` 是真的
* 当 `a`或`b`都是真的，`a and b` 是真的
* 当 `a`是假的 ，`not a` 是真的


`result!(true and true)` 会输出什么？?
- [x] true
- [ ] false
- [ ] 都不是; 非法语法

`result!(not true)` 会输出什么?
- [ ] true
- [x] false
- [ ] 都不是; 非法语法

`result!((not not true) or false)` 会输出什么?
- [x] true
- [ ] false
- [ ] 都不是; 非法语法

### 练习
写一个合约告诉调用的人他们是否有资格投票。你必须达到一定的年纪和在一个规定的国家内才能投票。你可以选择年龄和国家。我可以通过并行`@"canIVote!("Nigeria", 30)"` 来使用合约。

### 练习
上面的合约指适用于一个特定的国家。用我们学过的工厂来创建出有各种资格的检查者。创建一个投票年龄为18岁的加拿大的检查者，用`@"checkerFactory"!(canadaChecker, "Canada", 18)`使用。然后用代码`canadaChecker!("Estonia", 41)`测试一个41岁的爱沙尼亚人他是否符合加拿大的投票资格。
提示：他不能在加拿大投票。
