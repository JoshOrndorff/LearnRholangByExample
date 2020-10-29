# Bundles

## 被盗取的信息

![Alice's fans love her and want to send her lots of mail .](Alice.png)

Alice 是一个越来越出名的名人，她收到很多她粉丝的来信。她的粉丝们都是直接把信件发送到她的公共的"name"里。

[fanmailBad.rho](fanmailBad.rho)

但是她变得越来越受欢迎，她嫉妒的竞争对手Eve开始盗取她的信件。

### 练习
写出竞争对手盗取信件的代码

现在的问题是竞争者可以监听Alice可以监听的相同的通道. 所有她真正需要的是有一个"只写的 bundle"给她的粉丝

[fanmailPublish.rho](fanmailPublish.rho)

`bundle+ {*aliceFanMail}` 像 `aliceFanMail` 一样是一个channel ，但是它只能用于发送，不能用于接收。

## 订阅
上面bundle的解决方案可以阻止Eve盗取信件，那是很好的。但是在区块链世界中，这样也是会有不好的效果因为Alice一定要为发送她的粉丝通道地址而付钱。 区块链的费用有点像邮资。

![The sender includes a return envelope already posted to himself](returnEnvelope.png)

### 练习
Alice可以通过让粉丝请求她的粉丝邮箱地址来节省邮资。然后粉丝们一定要付这个钱。有点像发送一个已经带有邮票的信封回来。

完善 Alice的代码让她可以获得Bod需要的地址。

这里是答案:
[fanmailAsk.rho](fanmailAsk.rho)

精明的读者已经注意到Eve可以通过请求粉丝邮箱地址来窃取信息。很好的观察力。作为一个额外的练习，你可以写出Eve的代码（提示：跟旧的一样）。这个问题的解决方法涉及公钥加密和注册。我们会在第四节学到。

### 练习
在我们第二课的披萨店有一个跟Alice相似的问题。重新编写代码，让他们可以容易地接收新客户。

## Jackpot

![A single "thrower" throws a ball for one of many catchers to catch](jackpot.png)

我以前小时候玩一个游戏叫Jackpot。一个人扔一个球然后说出一个数字。其他的人都会尝试去抓住那个球，无论谁抓住了那个球就可以获得那个数字的分数。

玩jackpot只是跟发送粉丝邮件正好相反。以前很多粉丝都发送邮件到明星。现在有一个发送者，发送给许多收件人中的一个。

[jackpot.rho](jackpot.rho)

在jackpot代码中，谁会抓住那个球？
- [ ] Bill因为他抓住球的代码最前。
- [ ] Bill因为他抓住球的代码离抛球代码最近。
- [ ] Paige因为他抓住球的代码最后面。
- [x] 我们不知道。这是不确定的。


### 练习
练习: 当他们抓住球的时候，使用stdoutAck来显示每个人实际上的分数。
<!-- solution in jackpotNicePrinting.rho -->

大多数程序语言都允许你组合或者"串联"两个字符串在一起,当然Rholang也不例外了。我们可以 `result!("Hello " ++ "world")`, 但是我们不能串联一个字符串和一个整型。那就是为什么我们要用`stdoutAck`这个方法。另一个方法就是打印一个列表 `stdout!(["Bill caught it. Points earned: ", *points])`。我们将在未来课程讨论更多关于这方面的细节。

在rholang里的这个游戏与现实中一个球不断重复抛有什么区别?
- [ ] 是相当准确的模拟
- [x] 在rholang中，所有球都只抛一次然后按顺序接住
- [ ] 在rholang中球会按照他们被扔的相反顺序被接住
- [ ] 在rholang中，Bill先会抓住球，然后到Paige抓住球


## 欺骗性的抛投

注意任何一个人都可以过来抛投一个假分数的球来把整个游戏弄乱。这就跟Eve去偷Alice粉丝信件的情况相反。

Eve应该怎么样在代码中扔一个100分的欺骗的球？
- [ ] for (imposter <- throw){imposter!(100)}
- [x] throw!(100)
- [ ] @"throw"!("100")


我们通过确定公众只能从抛投通道中进行读的操作来解决这个问题，公众不能进行写入。

[jackpotPublish.rho](jackpotPublish.rho)

像以前一样，这个代码要求游戏主持人为所有从他获取bundle的人支付费用。我们可以重构代码让玩家需要订阅这个游戏就像Alice和她的粉丝邮箱。

## 公钥加密

![This bundle is sealed within the blockchain world, but totaly openable to anyone outside. Remember that just because data is off limits within the blockchain, doesn't mean it's truly private.](privateNames.png)

在某些方面上，只读的bundles就跟[公钥加密](https://en.wikipedia.org/wiki/Public-key_cryptography))的签名特性一样。 jackpot里面抓球的人要确定抛投人身份因为只有他可以在抛投通道发送，这种情况就像加密签名。

在某些方面上，只写的bundles就跟公钥加密的特性一样。只有Alice可以接受她粉丝邮箱通道里的信息。一个 **非常重要的不同** 是这里发送的信息在区块链中是100%透明的！所以即使只写的bundle对于不可伪造names是一种十分有效的通信方法，但是他们不是策划抢劫和逃避政府监控的好方法。 **一定要小心注意!**

## 更多Bundles

除了只写和只读bundles，还有另外两种形式的bundles。另外的bundle类型比较少见但是也是有用的。我们将会在有需要的时候再探索他们，但是我们这里先简短地总结他们。

| 语法 | 可读 | 可写 |
| ------ | -------- | --------- |
| `bundle- {proc}`  | YES |  NO |
| `bundle+ {proc}`  | NO  | YES |
| `bundle0 {proc}`   | NO  |  NO |
| `bundle {proc}`   | YES | YES |

你可能想知道为什么一个bundle 既不能发送也不能接受有什么用。根据我们现在所学到的，那是一个很好的问题。当我们在下一单元讨论模式匹配，我们就可以看到bundles可以做更严格的读写功能。它们也可以阻止把组合names分开然后看里面的内容。
