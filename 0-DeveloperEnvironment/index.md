# Setting up Your Developer Environment

In order to run the rholang snippets in this tutorial, you will need some kind of development environment. This is not an exhaustive guide to rholang development tools or stacks. Rather it shows a few common basic development environments to get you started.

## Online Interpreter
Members of the RChain community provide a public web-based [online rholang interpreter](http://rchain.cloud). This tool is very promising and a very eaasy way to get started. It is also early in development and not always stable.

## Local Node
The tried and true way to run rholang code is by starting up your own local RNode and using its rholang interpreter. First you'll have to [install RNode](https://rchain.atlassian.net/wiki/spaces/CORE/pages/428376065/User+guide+for+running+RNode) for your platform.

Once RNode is installed, you can run a basic standalone node
```
$ rnode run -s -n
```

In a separate terminal, you can execute one line of rholang at a time in the REPL (run execute print loop).
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

When you want to run larger multi-line rholang snippets (which won't take long), you can use RNode's eval mode to evaluate code.

```
$ rnode eval intersection.rho
Evaluating from intersection.rho

Result for intersection.rho:
Deployment cost: CostAccount(39,Cost(1132))
Storage Contents:
 @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)}!(@{"name"}!(Nil)) | @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)}!(@{"age"}!(Nil)) | @{"world"}!("hello") | for( x0, x1 <= @{Unforgeable(0x01)} ) { Nil } | for( x0, x1, x2, x3 <= @{"secp256k1Verify"} ) { Nil } | for( x0, x1 <= @{"sha256Hash"} ) { Nil } | for( @{{@{"name"}!(_) | _ /\ @{"age"}!(_) | _}} <= @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)} ) { @{Unforgeable(0x00)}!("Both name and age were in the data") } | for( x0, x1 <= @{Unforgeable(0x03)} ) { Nil } | for( x0, x1, x2, x3 <= @{"ed25519Verify"} ) { Nil } | for( x0, x1 <= @{"blake2b256Hash"} ) { Nil } | for( x0 <= @{Unforgeable(0x02)} ) { Nil } | for( x0 <= @{Unforgeable(0x00)} ) { Nil } | for( x0, x1 <= @{"keccak256Hash"} ) { Nil }
```

Some of RNode's output comes in the same terminal that you run the code in. But other output comes directly from the node (the first terminal). So be sure to check both places until you're familiar with what output comes from where.

## Cryptofex IDE
An up-and-coming integrated development environment called [cryptofex](https://cryptofex.io/) just entered alpha. Cryptofex may eventually be the preferred way of developing rholang, but at the moment it is quite young software.
