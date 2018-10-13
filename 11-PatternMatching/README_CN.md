# 模式匹配

## 关于模式

模式其实经常出现在我们的日常生活中。如果你看到一辆你从来没有见过的新型车而你仍然知道那是一辆车因为它匹配你心里对车的模式的定义，4个轮子，两个或者4个门还有挡风玻璃。

相似地，我们可以匹配句式模式。句子“我喜欢芝士”和“我喜欢熊猫”都匹配模式“我喜欢____”。但是“我有一只狗”就不匹配那样的模式。Rholang允许程序员使用模式匹配来控制程序的运行。就是说，不同的代码能根据一个“process”是否匹配一个特定的模式来执行。

## `match` 结构

rholang使用模式匹配最明显的一个地方就是它的`match`结构，它的工作原理请看下面。

[matching.rho](matching.rho)

在这个代码里，任何一条从`patternMatcher`通道中获取的信息`x`代表一个标记的"process"。我们拿"process"(未标记)与一些下面的模式比较一下，然后看看那些模式是匹配的。下划线仅仅是用来填空的，它可以匹配任何模式。它被称为"通配符"，你可以经常看到它在`match`结构中用作最后的模式匹配以保证如果没有模式匹配的话就使用默认的情况处理。

<!--![Receives that use pattern matching are much pickier than the ones we have used before.](lookingForMessagesPatternMatching.png)-->

模式匹配也可以在使用`for`或者`contract`时候使用。为了让信息成功被接收，发出去的信息必须匹配应该要被接收的模式。我们一会可以看到一个这种用途的例子。

## 我们看到的两种情况
我们有时候会使用下划线。例如我经常会使用`for (_ <- ack)`，这样代表ack通道里的信息无论匹配什么模式都接收。当你只关心你是否接收一个信息而不是接收信息的内容的时候就可以用下划线来表示，这是一种标准用法。

我们也可以在前面我们学习到如何接收“processes”的课程中的使用模式匹配。当我们写`for (@p <- x)` 时候，这代码的意思是接收所有匹配标记process模式的信息，然后把“process”绑定到p。

`p`在`x!("hello") | for(@p <- x){Nil}` 中会绑定到什么样的变量
- [ ] `@"hello"`
- [x] `"hello"`
- [ ] `hello`
- [ ] `4`

`p`在`x!("hello" | 4) | for(@{"hello" | p} <- x){Nil}` 中会绑定到什么样的变量
- [ ] `@"hello"`
- [ ] `"hello"`
- [ ] `hello`
- [x] `4`

## 语法糖
![Yummy, syntactic sugar. Now with extra curly braces.](sugar.png)
其实我们完全可以用模式匹配来替换到之前我们学习到的 `if`/`else`。事实上，那正是 `if`/`else` 内在实现的方式。因为那个只是其他语法的速记，所以`if`/`else`也可以说是语法糖。下面的两段代码其实作用完全一样。
```
if (cond) {
  // Do Process P
}
else {
  // Do Process Q
}
```
into
```
match cond {
  true => // Do Process P
  false => // Do Process Q
}
```

### 练习
用`march`而不是`if`/`else`来重写我们前面课程的`signTest.rho`的例子

我们应该如何用`if`/`else`重写上面第一个`match`的例子？
- [ ] 仅仅只是反转前面的练习
- [ ] 以`if (x == a|b)`开始
- [x] 我们无法重写因为上面的例子比只是`true`和`false`更复杂


## 一个更友好的招待员
让我们制作一个更友好的招待员，这个招待员即使我们不告诉他我们的名字，他也会说你好。关键部分在于我们有两个不一样的合约在监听同一个`greeter`通道。
[greeter2.rho](greeter2.rho)

你可能可以明白每个合约单独是如何运行的。有意思的部分是如何让rholang决定当信息从`greeter`通道过来的时候实际上哪一个合约去执行。方法在于rholang应该根据哪一个合约的参数匹配我们发送的模式。如果我发送两个参数，招待员就使用两个参数来调用。如果我只发送一个参数，那么合约就应该使用一个参数来调用。在未来，rholang将会支持发送参数的类型做模式匹配。

### 练习
写一系列的合约来计算长方形的面积。在大多数明显的情况下，调用的人需要提供长度和宽度。但是用户可能也只提供单个宽度，这种情况通常长方形实际上是一个正方形，长宽都是提供的的宽度长度。最后，用户也可能什么都不提供，这种情况就是长方形是1x1的正方形。

## 高级模式匹配
你可以通过模式匹配做一些有意思的事情，比如`for(@{x!(P)} <- y){ Q }`只会在"process"在频道`x`发送匹配单独发送模式的时候才会计算。然后在process Q 里面你将会绑定变量 `x`这个频道和 `p`这个被发送的process。

[sendASend.rho](sendASend.rho)

`x!("hello") | for ({P | Q} <- x){Nil}` 会产生一个通信事件么?
- [ ] 会的，因为发送和接收在同一个通道
- [ ] 会的，因为发送和接收在同一个通道并且模式匹配
- [ ] 不会的，因为发送和接收在不同一个通道
- [x] 不会的，因为发送和接收在同一个通道但是模式不匹配。

## Unions and Intersections

可能有时候你想要匹配两种模式中的一种或者同时匹配两种模式。这些操作都与我们使用上一节课讨论的布尔运算相似，但是我们当我们要模式匹配时要使用不同的运算符。

你可以用"unions"操作符，`\/`来匹配其中一种模式。

[union.rho](union.rho)

使用"intersection"操作符来同时匹配两个模式。在这个例子里，我们检查注册数据是否有效。一个注册者必须提供他们的名字和年龄，可能需要提供一些额外的数据。顺便说一句，这项保存键值得技术经常也成为"RHOCore"。
To match both of two patterns you use the "intersection" operator, `/\`. In this example we are verifying that registration data is valid. A registrant must supply their name and age, and may supply any amount of additional data. By the way, this technique for storing key-value data is often known as "RHOCore".

[intersection.rho](intersection.rho)

### 练习
这个union语法的例子是相当基础的。扩展那个代码使它可以匹配更多的语言和更多的单词。同时也写出测试来展示当只有默认模式被匹配时候会发生什么。

在这一节当中讨论的逻辑连接与绑定有一点关系，但是那超出本教程的范围。我鼓励你通过例子程序来做式样，当你可以的时候可以参考rholang使用手册。

## 更多关于Bundles
几节课前，我们讨论了怎么使用bundles来创建可读或者可写的通道。但是我们还没有讨论过他们的同名特征。Bundles可以用来绑定组合的名字，让他们在做模式匹配的时候无法分开。

在这个例子中，一个军队有一个导弹，他们通过创建在一个不可伪造的"name"上创建功能来保持对导弹的控制。由于外交关系，军队需要允许公众检查导弹的安全，但是不能发射它。

[missileUnsafe.rho](missileUnsafe.rho)

### 练习
军队在这里犯了一个很严重的错误，所有人都可以发射他们的导弹。请想一个让外界发射导弹的方法。

答案:
[missileAttack.rho](missileAttack.rho)

为了解决这个问题，军队只要简单地给出一个bundled版本的组合"name"，让他们无法再模式匹配中分开。

[missileSafe.rho](missileSafe.rho)

当攻击在安全的代码上运行时，会有什么输出？
- [ ] "launching..."
- [ ] "inspecting..."
- [ ] "failed to launch..."
- [x] 什么都没有
