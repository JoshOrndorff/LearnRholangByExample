# 配置你的开发环境

为了可以运行这个教程里面的rholang代码，你需要一些开发环境。
这不是一个会让你感到疲惫的rholang开发工具或者技术栈。
然而它展示了一些基本的开发环境给你开始。

## 网上编译器
RChain社区的成员提供了一个基于公共网站的[在线rholang编译器](http://rchain.cloud)。
这个工具非常有前途，也是一种入门的简单方式。
但是它还是开发节点，有时候会不稳定。

## 本地节点
真正正确运行rholang代码的方法是在通过启动你自己本地机子的RNode然后使用它的rholang编译器。
首先你要为你自己的平台[安装 RNode](https://rchain.atlassian.net/wiki/spaces/CORE/pages/428376065/User+guide+for+running+RNode)

对于初学者，这里有详细的一步一步指导你怎么使用[AWS](https://blog.rchain.coop/running-rnode-0-5-3-on-amazon-ec2/) 或者[Docker](https://blog.rchain.coop/running-rnodev-0-6-x-with-docker/)启动你的节点.

一旦你的RNode安装好了，你可以运行基本的独立节点。
```
$ rnode run -s -n
```

在单独的终端里，你可以在REPL模式下一次执行一行rholang。
```
$ rnode repl

  ╦═╗┌─┐┬ ┬┌─┐┬┌┐┌  ╔╗╔┌─┐┌┬┐┌─┐  ╦═╗╔═╗╔═╗╦  
  ╠╦╝│  ├─┤├─┤││││  ║║║│ │ ││├┤   ╠╦╝║╣ ╠═╝║  
  ╩╚═└─┘┴ ┴┴ ┴┴┘└┘  ╝╚╝└─┘─┴┘└─┘  ╩╚═╚═╝╩  ╩═╝

rholang $ Nil

Deployment cost: CostAccount(0,Cost(0))
Storage Contents:
 for( x0, x1 <= @{Unforgeable(0x01)} ) { Nil } | for( x0, x1, x2, x3 <= @{"secp256k1Verify"} ) { Nil } | for( x0, x1 <= @{"sha256Hash"} ) { Nil } | for( x0, x1 <= @{Unforgeable(0x03)} ) { Nil } | for( x0, x1, x2, x3 <= @{"ed25519Verify"} ) { Nil } | for( x0, x1 <= @{"blake2b256Hash"} ) { Nil } | for( x0 <= @{Unforgeable(0x02)} ) { Nil } | for( x0 <= @{Unforgeable(0x00)} ) { Nil } | for( x0, x1 <= @{"keccak256Hash"} ) { Nil }

rholang $ @"world"!("hello")

Deployment cost: CostAccount(5,Cost(64))
Storage Contents:
 @{"world"}!("hello") | for( x0, x1 <= @{Unforgeable(0x01)} ) { Nil } | for( x0, x1, x2, x3 <= @{"secp256k1Verify"} ) { Nil } | for( x0, x1 <= @{"sha256Hash"} ) { Nil } | for( x0, x1 <= @{Unforgeable(0x03)} ) { Nil } | for( x0, x1, x2, x3 <= @{"ed25519Verify"} ) { Nil } | for( x0, x1 <= @{"blake2b256Hash"} ) { Nil } | for( x0 <= @{Unforgeable(0x02)} ) { Nil } | for( x0 <= @{Unforgeable(0x00)} ) { Nil } | for( x0, x1 <= @{"keccak256Hash"} ) { Nil }
```

当你运行更多行数的rholang代码时候，你可以使用RNode的eval模式来执行代码。

```
$ rnode eval intersection.rho
Evaluating from intersection.rho

Result for intersection.rho:
Deployment cost: CostAccount(39,Cost(1132))
Storage Contents:
 @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)}!(@{"name"}!(Nil)) | @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)}!(@{"age"}!(Nil)) | @{"world"}!("hello") | for( x0, x1 <= @{Unforgeable(0x01)} ) { Nil } | for( x0, x1, x2, x3 <= @{"secp256k1Verify"} ) { Nil } | for( x0, x1 <= @{"sha256Hash"} ) { Nil } | for( @{{@{"name"}!(_) | _ /\ @{"age"}!(_) | _}} <= @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)} ) { @{Unforgeable(0x00)}!("Both name and age were in the data") } | for( x0, x1 <= @{Unforgeable(0x03)} ) { Nil } | for( x0, x1, x2, x3 <= @{"ed25519Verify"} ) { Nil } | for( x0, x1 <= @{"blake2b256Hash"} ) { Nil } | for( x0 <= @{Unforgeable(0x02)} ) { Nil } | for( x0 <= @{Unforgeable(0x00)} ) { Nil } | for( x0, x1 <= @{"keccak256Hash"} ) { Nil }
```

有一些RNode的输出会出现在你运行代码的同一个终端。但是其它一些代码输出会直接出现在第一个终端。
所以在你熟悉什么输出出现在哪里前请确定好检查两边的终端。

## Cryptofex IDE
一个叫做[cryptofex](https://cryptofex.io/) 的开发环境已经进入了alpha版本。
Cryptofex可能最后最好的开发rholang的地方，但是现在还是很早期的软件。
Cryptofex提供rholang语法高亮特性并且可以在RChain集成节点上检测dApps。
IDE同时也提供环境创建和测试在以太网上，私人测试网上和单独模式的EVM上的智能合约。