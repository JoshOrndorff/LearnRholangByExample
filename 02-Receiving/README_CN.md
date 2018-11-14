# 接收

## 消息检查

![// Dear future self, keys in freezer because...](Keys.png)

在上一章我们学习了如何发送消息。现在是时候学习如何接收消息了。常规语法如下：

`for(message <- channel){ // Do something here}`

顺便提一下， // 用于标示注释。 //后面的内容程序并不会运行。写好注释可以有利于其他开发者（包括你自己）阅读代码，并了解代码的意图，其他读你代码的开发者会感激你写注释的。



## 通信事件

![Pizza shop can receive messages on its channel.](pizza.png)

下面的代码使用披萨店的通道发送了一个消息，披萨店收到了它。pizza店通过将消息打印至标准输出来表明其已收到。

[pizzaOrder](pizzaOrder.rho)

### 练习
将上述消息发送至一个不同的通道，如`@"coffeShop"`. 消息会被接收端打印出来吗? 还是东西留在了元组空间里么？

![Let's hit up the coffee shop.](coffee.png)

### 练习
记住，在rholang中，任何事情都是并行地而非按顺序地执行。如果我们把接收信息的代码放在前面，那么披萨店的代码仍可执行。尝试一下吧。

## 元组空间污染
<!-- TODO I really wasn't sure where to put this part -->
如果你遇到了旧数据滞留在元组空间并会对后面的代码执行有影响，你需要清空你的元组空间。最简单的方式是删除你的数据目录`.rnode`
<!-- TODO I should write a script for this -->
使用上述方法清空元组空间已经过时了。一个更好的方法是防止它一开始被旧数据污染。我们可以通过修改最上面的new代码段来实现。

旧的方案
```
new stdout(`rho:io:stdout`) in {
  @"world"!("Welcome to RChain")
}
```

尝试下面新的方案
```
new world, stdout(`rho:io:stdout`) in {
  world!("Welcome to RChain") // No more @ or " "
}
```
我们将在“不可伪造的names”的课程中讲解它的原理。现在你不需要每次都重置通道。

## 发送前接收

![Rather than the message appearing first, then someone receiving it, Greg is trying to receive first. Hopefully someone will send him a message so he can have a comm event.](lookingForMessages.png)

当发送和接收同时存在于通道时，这被称为通信事件，或称为"comm event"。

不像普通邮件那样必须被发送，对方才能被接收，在rholang中，上述两个事件可以以任何顺序发生或者同时发生。这类似于可以先接收消息，再发送它。每当发送和接收共存时，就会触发通信事件。


## 合约

![The poor chef is too busy making sure he can receive orders to take care of his pizza.](pizzaBurning.png)

我们的披萨店例子很好地说明了通信事件，但期望每次有新的订单时，披萨店都能自动发出一个新的接收来处理它们，这并不现实。

幸运地是，我们可以只部署一次代码，然后每次接收到它的消息时都执行一次。这类代码称为“智能合约”。让我们看一个比披萨店更高级但相似的例子--咖啡店。

[coffeeShop.rho](coffeeShop.rho)


### 练习
在咖啡店点第二杯饮料

### 练习
更改上面例子的确认消息

一般来说，下列哪一个会第一个发生?
- [ ] 发送，因为它与普通邮件的工作原理一样。
- [ ] 接收，因为以该方式运行的代码更快。
- [x] 发送或接收都可以最先发生，或者同时。
- [ ] 接收，因为rohlang是并行的。
- [ ] 都不。直接触发通信事件(comm event)。

### 练习
通道被命名为  `@"coffeeShop"`。将它更名为你所选择的特定咖啡店的名称。然后使用我们最近学到的`new`来修改代码



## Persistent For
实际上，在rholang中有两种不同的语法来表示持续从通道取出信息。我们刚刚学习`contract`语法。下面的用for语法的代码是等价的。


```rholang
contract @"coffeeShop"(order) = {
```

```rholang
for(order <= @"coffeeShop") {
```
注意，上述代码与正常的 `for` 不同，因为它使用了双划线 `<=` 而不是单划线 `<-`. `for`和`contract`是有不同的地方的，我们会在讨论区块链的时候讨论到他们的区别。现在你可以将它们当做同一功能。

### 练习
用持久的for语法而不是"contract"语法来写一个想咖啡店这样的披萨店合约。尝试自己从头写一次整个代码，这样会让你更容易记清语法。
<!-- The solution is in persistentPizzaShop.rho
[persistentPizzaShop.rho](persistentPizzaShop.rho) -->


下面哪一项是与其他两项不同的？
- [x] `for (a <- b){}`
- [ ] `contract b(a) = {}`
- [ ] `for (a <= b){}`

哪一个发送语句会与`for (message <- @"grandmasSnapChat"){Nil}`对应产生一个通信事件 ?
- [ ] `grandmasSnapChat!("Hi Grandma")`
- [x] `@"grandmasSnapChat"!("Glad you're snapping Grandma")`
- [ ] `for("Here's a snap for you g'ma" <- @"grandmasSnapChat")`
