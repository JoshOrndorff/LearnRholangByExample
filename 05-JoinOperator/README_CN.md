# Join操作
## 多数据源

![In general, the winner of this pushup competition can't be determined until both participants are finished.](pushups.png)

有时候仅当从两个以上不同的数据源获取数据后，才会开始计算。例如，在你得知了你的彩票号码和中奖号码之前，你无法知道你是否赢得大奖。在你知道购买物品价格和购买总额之前，你无法进行购买。在你知道每个参赛者做了多少个俯卧撑前，你无法知道谁赢得俯卧撑比赛。

rholang提供了Join操作，来应对这种情况。使用`;`符号来执行一次Join操作。

```
for (p1Pushups <- @"player1"; p2Pushups <- @"player2") {
  @"stdout"!("The winner is...")
}
```



## 火箭发射

一家太空探索公司想要确保，仅当两个航空工程师，Alice和Bob，都下达了发射命令后，他们的火箭才会发射。例如，Bob将通过发送`BobLaunch!("launch")`来下达命令。当两位工程师都下达了命令，那么火箭便可以发射。

### 练习
思考一下，使用我们刚提到的Join操作符，应该怎么写这个代码呢？


## 错误的方式

下面的例子中，其中一人先收到发射指令，并尝试处理火箭发射问题，然后再轮到另一个人。

[launchBad.rho](launchBad.rho)

问题在于，当Alice批准发射，而Bob还没有，Alice应该能够更改她的指令，但在此例中她不行。设想一下，如果她突然发觉火箭有一个问题，或者收到了一些不好的消息，想要停止发射。

![No use in grabbing just one set of mail. Might as well wait until the second set](join.png)

当使用Join时，她依然可以更改她的决定，因为`for`只会在双方的消息都进入通道并准备好后，才会开始取出双方的消息。

## 发射的解决方案

[launch.rho](launch.rho)

下列哪一段代码是Alice所需，用以撤销发射命令的？
- [ ] `@"AliceCancel"!("cancelZ")`
- [ ] `@"AliceLaunch"!("cancel")`
- [x] `for (x <- @"AliceLaunch"){Nil}`


Join的概念起初是在哲学家进餐问题中被提出，并且在这篇简短的rholang教程中(更详细的解释)[https://developer.rchain.coop/tutorial/#dining-philosophers-and-deadlock"]。



在`for (x <- y; a <- b){ Nil }`中, 应该优先向哪一个通道发送消息？
- [ ] y
- [ ] b
- [x] 无所谓
- [ ] 同时被发送

在`for (x <- y; a <- b){ Nil }`中, 哪一条消息被优先取出？
- [ ] x
- [ ] a
- [ ] 无所谓
- [x] 会被同时取出



### 练习
有一个比赛，两名选手将各自在各自的通道发送消息。谁第一个发送了消息，谁就输掉比赛，第二个发送消息的人获胜。你的任务是写一段代码告诉我们谁赢了。参赛选手应按如下方式发送消息。

`P1!("Send any message")`
`P2!("Hope I win")`



在这场需要靠耐心获胜竞赛这一例子中，我们不使用求并运算，因为我们在意哪个选手先行动。希望你没有陷入我的陷阱中;)

[patienceSolution.rho](patienceSolution.rho)

正如注释所说，你应该使用REPL模式运行上面的代码，然后用两种不同的顺序来发送的消息确保两个选手都获胜一次。另一个方案如下所示，让一个玩家去通知另一个玩家何时执行。我们将在下一节继续研究这种方法。

[P1First.rho](P1First.rho)

在上面我们写的代码中，为什么可能出现没有人赢得这场耐心比赛？
- [ ] 因为两名选手可以同时发送消息
- [ ] 选手们在错误的通道发送消息
- [x] 第一个块接收P2，而第二个块接收P1，所以代码并不能保证游戏完成
