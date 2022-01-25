# 发送与标准输出(stdout)

## 说声Hello

!["Person waiving hello"](helloWorld.png)
 

编程界有一个存在已久的传统——输出"Hello World"应该是你学习的第一个程序。下面是一个在屏幕上输出"Hello World"的最简单例子。

[hello.rho](hello.rho)



### 练习
请让程序输出"Rholang rocks!" 而不是 "Hello World"。

### 练习
尝试将"stdout"替换为别的语句。会得到什么结果？
* 尝试一下这个有趣的通道名称`@"someChannel"`.
* 这里可以比较随意。请让程序在屏幕上输出 "Sup World"。


## 标准输出(stdout)到底是什么东西

![Channels are like mailboxes for sending messages](mailbox.png)

rho语言的核心是通道(channel,下面都称为通道)通信. 通道是你可以用来发送和接收消息的通信线路。你可以使用`!`字符来在通道中发送消息。

![Redo this diagram!](sendSyntax.png)

`stdout` 是一个特殊的通道，用于将文本发送至"标准输出",通常指你的电脑屏幕。正因为它的特殊，我们不得不将它写在第一段学习的代码里面。


## 使用其他通道

![Sent messages wait to be received here in "message purgatory"... JK, it's called the "tuplespace"](mailboxes.png)

实际上你可以在很多通道中发送消息，而非只有`stdout`。 但其它通道不像 `stdout` 他们不会在屏幕上显示。

[tupleSpace.rho](tupleSpace.rho)

那么，在其他通道中的消息将被发送至哪里？哪里都不会去！这些消息暂时哪儿都不去，这些消息会继续待在通道内，等待其他人去取出它们。我们将在下一课程中学习如何获取这些消息。同时，消息滞留所在的地方，我们称为 "元组空间"。

请确保你的信息保留在元组空间里。你应该会看到像下面的信息。

```
Storage Contents:
 @{"RandoChannel"}!("This won't be on the screen") | for( x0, x1 <= @{Unforgeable(0x01)} ) { Nil } | for( x0, x1, x2, x3 <= @{"secp256k1Verify"} ) { Nil } | for( x0, x1 <= @{"sha256Hash"} ) { Nil } | for( x0, x1 <= @{Unforgeable(0x03)} ) { Nil } | for( x0, x1, x2, x3 <= @{"ed25519Verify"} ) { Nil } | for( x0, x1 <= @{"blake2b256Hash"} ) { Nil } | for( x0 <= @{Unforgeable(0x02)} ) { Nil } | for( x0 <= @{Unforgeable(0x00)} ) { Nil } | for( x0, x1 <= @{"keccak256Hash"} ) { Nil }
```



## 同时做两件事
![Rather than following an ordered list, all ingredients are added concurrently.  Looks delicions](cooking.png)

在rholang中，我们不会告诉计算机做完一件事，再到另一件。相反，我们会告诉它需要做的所有事情，然后"并行地"执行它们，或者一次性全部执行。

[parallel.rho](parallel.rho)

| 的发音是 "parallel", 可简称为 "par"。


### 练习
向"pizza shop"通道发送消息"1 large pepperoni please"。

### 练习
向"Mom's Phone"通道发送"Hi Mom"。

### 练习
用一个程序在屏幕上输出两个消息，"Rick"和 "Morty"。


## 小测试

`result!("Programming!")` 将在屏幕上输出什么？
- [x] Programming!
- [ ] result!
- [ ] Nothing


`@"what"!("Up")` 在什么通道上发送消息？
- [ ] `@"Up"`
- [x] `@"what"`
- [ ] `what`


rholang会先执行哪一条语句？
```
@"stdout"!("Dogs")
|
@"stdout"!("Cats")
```
- [ ] 输出 "Dogs"
- [ ] 输出 "Cats"
- [x] 都不。 它们是并行的


PS. 有一个特殊的通道 stderr. 请尝试一下看看往这个通道发送消息，会发生什么？

[有什么区别?](https://en.wikipedia.org/wiki/Standard_streams)
