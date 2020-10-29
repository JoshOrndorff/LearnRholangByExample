# 不可伪造的Names和Acks

## 使通道"私有"

![A competing pizza shop steals orders because the channel isn't secure.](stealing.png)


到目前为止，每一个我们发送信息的通道都是公共的"name"，如`@"pizzaShop"`。 任何一个人都可以往这个通道发送信息（可能对于某些商用行为是好的），但是任何一个人也可以从这个通道中获取信息（这对于一些商业就很糟糕了）。想象一下如果竞争者可以从披萨店中获取他们的披萨订单让披萨店无法获取他们的订单，那肯定十分糟糕。

披萨店的竞争者需要什么样的代码来窃取披萨点的订单?
- [ ] `contract evilPizzaShop(interceptedMessage) = {Nil}`
- [ ] `@"evilPizzaShop"!("pizzaShop")`
- [ ] `@"pizzaShop"!("intercept")`
- [x] `for (interceptedMessage <- @"pizzaShop"){...}`

## 绑定和自由的Names

上面我们学习到如何通过`for`和`contract`获取信息。这两种方式都构造出"绑定的"“names”。举个下面例子，order就是在咖啡店代码里一个绑定的"name"。

[bound1.rho](bound1.rho)

当我们使用contract语法的时候也是一样的。

[bound2.rho](bound2.rho)

如果一个"name"存在在一个特定的"process"中并且不能被"process"外部访问，我们就认为一个"name"是绑定的。所以"name" order是绑定在咖啡代码中。另一方面，在上面的例子中，任何一个能从别的地方访问的"name"都是"自由的"“name”。在上面的例子中，`@"coffeeShop"` 是一个自由的"name"。

指出下面每段代码中 `x` 是绑定的还是自由的。

`for (x <- y){Nil}`
- [x] 绑定的
- [ ] 自由的
- [ ] 都不是

`for (y <- x){Nil}`
- [ ] 绑定的
- [x] 自由的
- [ ] 都不是

`new x in { x!(true) }`
- [x] 绑定的
- [ ] 自由的
- [ ] 都不是

`contract x(y) = { Nil }`
- [ ] 绑定的
- [x] 自由的
- [ ] 都不是

`contract y(x) = { Nil }`
- [x] 绑定的
- [ ] 自由的
- [ ] 都不是

`for (y <- @"x"){Nil}`
- [ ] 绑定的
- [ ] 自由的
- [x] 都不是

## new操作符
`for` 和 `contract`都是在连续计算中绑定"name"的完美方法。但是如果我们想要创建一个绑定的"name"用于发送? 举个例子，我们的披萨店不想让自己的订单被人截取。我们通过`new`操作符解决这个问题。

[newPizzaShop.rho](newPizzaShop.rho)

首先要注意到 `pizzaShop` 是一个"name"即使它不是以 `@`开始。 那是因为`new`操作符直接把它创造为一个"name"而不是一个引号括起的"process"。无论你如何使用`new`创造一个"name", 它总是一个绑定的"name"。

然后，注意这种方法不仅可以阻止其它披萨店获取订单，还阻止新的客户下订单。我们将会在bundles教程中解决这个问题。

当你在`new` 限制范围外尝试下订单会发生什么事情。
- [ ] 订单正常发送
- [ ] 订单正常发送但是需要更长时间
- [x] 出现关于顶层自由变量的错误
- [ ] 代码可以运行，但是没有订单成功被接受不了

我们学习到所有的"name"可以通过用@标记转化为"process"。所以 `pizzaShop`这个"name"通过@转化后是一个什么样的"process"? 尝试将那个"process"打印到`stdout` 看看。
- [ ] `@`标记的"pizzaShop"
- [ ] 并没有任何标记
- [x] "一些不可以伪造的16进制代码"

## 私有 vs 不可伪造

![Although the messages can no longer be stolen, they can still be eavesdropped on. You've been warned.](eavesdropping.png)

`new` 是一个限制操作符因为它把自己创建的绑定的"names"限制在它的花扩话中或者说"词法范围"内. 在rholang的世界里，这些新建的"names"就只能在确定的范围内可见，但是记住，程序员可以从外部世界中查找到这些"names"。当你在区块链环境工作中尤其要注意。

所以说，虽然竞争的披萨店不再可能窃取 本来给我们店的披萨订单，但是他们仍然可以在区块链浏览器中知道我们这些订单的信息。有些情况下，一些程序员会把`new` 创建的"names"称为 "私有的", 但是一个更恰当的词应该是 "不可伪造的(unforgeable)", 这就能解释前面的问题了。

我们前面用到了 `new` 来阻止元组空间被污染. 为什么使用不可伪造的"names"可以让我们避免每个合约跑之前都清理一次元组空间？
- [ ] 因为 `new` 创建自由的"names"
- [x] 因为 `new` 创建出不可伪造的"names",它们不能被外部代码使用
- [ ] 因为 `new` 自动清理元组空间

## 确认通道

![We acknowledge communications all the time in conversations](roger.png)

不可伪造"names"一个通用的用法就是 "确认通道", 简称为"ack" 通道. 披萨店可以仅仅让顾客知道订单已经被下达，而不是通过打印到屏幕让每一个人都知道来确认订单。

为了能实现这个方法，披萨点需要知道如何联系客户。所以客户需要提供一个确认通道来回调。通常这样的通道被称为`ack`.

[pizzaAck.rho](pizzaAck.rho)

为什么前面例子的确认信息并没有显示在屏幕上？
- [ ] 代码中有错误
- [ ] 订单没有正确被接收
- [x] 确认信息没有发送到`stdout`

### 练习
之前的例子会导致元组空间中的`@"Alice"` 和 `@"Bob"`通道被污染.修改它，让Alice 和 Bob 各自有自己的不可伪造的"name".

## 给发送的"names"权限
我们刚刚看到顾客如何给出一个ack通道来获取订单确定信息. 其实我们可以做得更好. 在我们之前的代码,任何一个人都可以在ack通道中联系客户. 那意味着任何一个人都可以发送一个伪造的ack通道给客户让客户认为订单已经下发成功，但是实际上并没有。所以Alice 和 Bob 真的需要严格保管他们的不可伪造的"names". 因为给别人那个"name"就意味着别人可以联系你。

[privateAck.rho](privateAck.rho)

解决方案是创建一个新的不可伪造的"name",然后发送它到披萨店以至于只有他们可以回复你。即使披萨店是在`new alice`的外面, 它仍然可以在那个通道上发送信息因为Alice给了通道名字。这是一个很好的方法来委派权限。

在这个例子中，我们相信披萨店只会在ack通道中 发送 ，但是要注意它也又可能是在通道中接收信息，如果它想要的话。我们将在下一节bundles中学习如何只给出一部分的权限出来。

Bob也想要订一份披萨，给出一个不可伪造的ack通道。我们应该在哪里创建他自己的不可伪造的通道？
- [x] 在他自己的那行,alice代码后面
- [ ] 在Alice同一行
- [ ] 在程序代码的第一行

## `stdoutAck` 和 `stderrAck`

现在既然你知道了ack通道, 那么你应该要知道其它两种打印到屏幕的方法.它们是叫做`stdoutAck` 和 `stderrAck`的通道. 他们就像第一课说的stdout一样工作，但是他们需要一个ack通道。

[stdoutAck.rho](stdoutAck.rho)

顺便说一句，你注意到每次启动一个新的元组空间都有一堆东西么？这些东西其中4个东西是内置的用于接受屏幕打印的通道。另外一些是用于加密的。我们将在以后讨论到。


### 练习
`result!("1")|stdout!("2")|stdout!("3")`
注意这段程序不会按照一定的顺序打印出数字。他们是同时发生的。想象我们现在真的要按照顺序打印几行。修改代码，使用ack通道来保证数字按顺序打印出来。

### 练习
预测这个程序怎么运行（它会输出什么，它在元组空间怎么简化计算。）然后运行它来检测你的预测。
```
new myChan in {
  myChan!("Hi There")
}
|
for (msg <- myChan) {result!(*msg)}
```

如果你对上面的程序预测失败，修改程序，让程序按照你的想法运行。



## 提问

在 `for(x <- y){Nil}`中哪个name是绑定的
- [x] `x`
- [ ] `y`
- [ ] `Nil`


在 `new x in {Nil}`哪个"name"是绑定的
- [x] `x`
- [ ] `y`
- [ ] `Nil`


如果 `pizzzaShop` 是一个"name", 那么 `@pizzaShop`是什么?
- [ ] 一个name
- [ ] 一个process
- [x] 无效的语法



为什么pizzaShopAck 代码发送 `"bob"` 作为一个ack通道而不是`@"bob"`?
- [ ] 没有原因; 就是一种风格。
- [x] 因为 @"bob" 是一个name, 但是我们必须发送processed。
- [ ] 那是给ack通道用的特别语法。
