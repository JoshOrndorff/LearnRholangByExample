# 对象功能

最近我们学习了如何用不可伪造的"names"来限制知道这个"name"的人来使用这个通道。我们也见识了如何用状态通道来保存数据，还有如何用将方法用于修改封装数据。在这节课中，我们将会学习如何将方法放置在不可伪造的"name"上，设计出一种非常有用的设计模式--“对象功能”。

![Good thing I didn't lose my car capabilities, I mean car keys in that freezer](keys.png)

对象功能的日常例子就是你家或者车的钥匙。你可以通过使用这个对象的功能来进入你的家里或者启动你的汽车。你也可以通过给予你的钥匙或者你钥匙的复制品给别人，让别人也拥有那些功能。

在这一节课中，我们将会使用状态通道和对象功能来创建一些例子工程。我们可以看到对象功能比bundle赋予读写数据权利的方式更常用，还可以使用更抽象的功能如重置计数器或者删除一个facebook账户。

## 重访空中交通管制塔
让我们现在再看一下第四课的空中交通管制的例子。先前的控制者可以通过使用一个持续性的发送来广播天气和跑道信息。但是他们不能够更新信息。我们都知道天气是经常无法预测地变化。所以在这个例子中，我们将要保存现在的信息在状态通道里面，然后给控制者一个功能来按需要更新信息。

[atc.rho](atc.rho)

使用一个只读的bundle来调整到站里似乎更加自然。然而，如果我们使用budle，然后第一个接收信息的监听者可能会取出在状态通道的信息。然后就不能给其它飞行员接收这个信息。为了能确保消息可以按我们想的那样持久化，我们要处理所有到状态通道的权限，然后只能给飞行员去获取正确信息的功能。

空中交通管制是如何跟新信息的？
- [x] `set!("Strong crosswinds, be advised")`
- [ ] `setInfo!("Strong crosswinds, be advised")`
- [ ] `getInfo!("Strong crosswinds, be advised")`
- [ ] `stationFactory.setInfo!("Strong crosswinds, be advised")`

### 练习
写更多全面的测试以确保空中交通管制可以成功地更新信息而飞行员不可以。
Write more thorough tests to make sure the ATCs can update the status successfully, and that pilots cannot

## 储蓄账户
在这个例子里，我们要用rholang写代码来模拟一个简单的储蓄账户。它有存入，提取和查看的方法。

不想我们的计数器，储蓄账户必需要安全的。我们也不想其他人知道我们有多少钱，更不想别人能拿我们的钱。

这里是一些需要考虑的初步的代码。
[savingsStarter.rho](savingsStarter.rho)

### 练习
在账户代码里把剩下的方法代码补上。

下面哪个合约是被当做工厂的？
- [ ] `check`
- [ ] `withdraw`
- [ ] `deposit`
- [x] `openAccount`

我们当前的储蓄账户允许负的存款，但是可能它不应该这样的。请想一想你应该怎么去解决这个问题。我们将会在下一节课学习一样合社的工具来完成这个事。

## 盗取资金
尝试写出Eve需要盗取Sarah资金的代码。我敢打赌你想不出任何方法。因为只有Sarah有权限使用控制账户的不可伪造的"name"。


如果Sarah想要允许别人存钱到她的银行账户，但是不可以查看和提取，她应该怎么创建她的账户？
- [ ] `openAccount!(10, *"sarahDeposit", *sarahWithdraw, *sarahCheck)`
- [x] `openAccount!(10, @"sarahDeposit", *sarahWithdraw, *sarahCheck)`
- [ ] `openAccount!(10, @"sarahDeposit", @"sarahWithdraw", @"sarahCheck")`
- [ ] `openAccount!(10, *sarahDeposit, @"sarahWithdraw", @"sarahCheck")`




## 两种工厂
到目前为止，我们所有的工厂方法都要求我们传入“names”来创建合约。在储蓄账户的例子中，这些"names"是 `check`, `deposit` 和 `withdraw`。我把这种工厂叫做“自我创建”工厂，简称"BYOC"。这种BYOC技术有一个优势，就是用户可以提供任何她喜欢的从别的合约来的或者公共的"names"。

另一种技术是允许工厂创建需要的不可伪造的"names"然后发送给回调的人。我把这种方式成为“全面服务”工厂。如果你不要求有灵活传入随意"names"的功能，一个全面服务的工厂可能更不麻烦。

### 练习
把例子中的工厂模式转化为另一种模式


现在你已经装换了储蓄账户的代码，Sarah还有可能让别人给她的账户存款么？
- [ ] 不可以；她不再可以传入一个公共的“name”
- [ ] 不可以；她没有权利这么做
- [x] 可以；她只需要自己把新的功能公开。
- [ ] 可以；就像以前一样


## 可中止的火箭发射
回到我们学到join操作的时候，我们假想了一个情况，两个操作员必须同时许可火箭发射。我们希望他们也可以收回发射许可。

这个问题的解决方法是，当他们允许火箭发射的时候，可以给操作员一个中止按钮。

[abortableLaunch.rho](abortableLaunch.rho)

### 练习
完成上面代码中bob的发射逻辑并且测试。

## 设计模式
还有很多常用的对象功能设计模式。你可以在[A Picturebook of Secure Cooperation](http://erights.org/talks/efun/SecurityPictureBook.pdf)中找到很多例子解释说明。

### 练习
我们会在以后遇到的例子中遇到很多这样的设计模式，但是我鼓励你尝试自己用rholang实现1到2个。
