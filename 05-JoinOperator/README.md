# Join Operator

## Multiple data sources

![In general, the winner of this pushup competition can't be determined until both participants are finished.](pushups.png)

Occasionally a computation can only be made once data is retrieved (messages are received) from two or more different data sources. For example, you can't tell whether you won the lottery until you've got your ticket number and the winning number. You can't make change for a purchase until you know the price and the amount tendered. You can't tell who wins a pushup contest until you know how many pushups each competitor completed.

Rholang has the join operator for exactly this situation. To perform a join, just use the `;` character.

```
for (p1Pushups <- player1; p2Pushups <- player2) {
  result!("The winner is...")
}
```

When you use the join operator, neither message will be received until both messages are available.

## Rocket Launch

A space exploration company wants to make sure their rocket only launches when both of two flight engineers, Alice and Bob, give the launch command. As an example, Bob would give the go ahead by sending `bobLaunch!("launch")`. When both engineers give the command, the rocket can be launched.

### Exercise
Consider how this code might be written using the join operator that we just discussed.


## The wrong way

One may have been tempted to solve the rocket problem by first receiving one launch command then the other.

[launchBad.rho](launchBad.rho)

The problem here is when Alice okay's the launch, but Bob hasn't yet. Alice should be able to change her mind, but she cannot. Imagine if she suddenly noticed a problem with the rocket, or received some bad news and wanted to abort the launch.

When using a join, she can still change her mind because the `for` won't consume her launch message until Bob's message also appears and is ready to be consumed.

![No use in grabbing just one set of mail. Might as well wait until the second set](join.png)

## Launch Solution

[launch.rho](launch.rho)

What code would Alice need to "par in" to retract her launch command.
- [ ] `aliceCancel!("cancel")`
- [ ] `aliceLaunch!("cancel")`
- [x] `for (x <- aliceLaunch){ Nil }`


I've explored the concept of joins in the context of the famous dining philosophers problem in [this blog post](https://www.rchain.coop/blog/rholang-vs-the-dining-philosophers/).



In `for (x <- y; a <- b){ Nil }`, which channel must be sent on first?
- [ ] y
- [ ] b
- [x] doesn't matter
- [ ] they must be sent simultaneously

In `for (x <- y; a <- b){ Nil }`, which message will be consumed first?
- [ ] x
- [ ] a
- [ ] doesn't matter
- [x] they will be consumed simultaneously



### Exercise
There is a game where two players will each send a message on separate channels. Whoever sends the first message, loses, and whoever sends the second message wins. Your task here is to write the game code that will tell which player won. To play the game, players should send messages like shown.

`P1!("Send any message")`
`P2!("Hope I win")`



## Solution to the patience game
In this case we actually don't want to use join because we care which player went first. Hope I didn't trick you ;)

[patienceSolution.rho](patienceSolution.rho)

Like the comment says, you should send the messages in both orders to make sure of who wins. The easiest way to do that right now is to have one player signal the other for when to go as shown below. We'll explore this concept further in the next lesson.

[P1First.rho](P1First.rho)

Why is it possible for nobody to win the patience game as we wrote it above?
- [ ] Because both players could send messages at the same time
- [ ] The players are sending on the wrong channels
- [x] The first block receives P2 while the second receives P1, so neither ever finishes
