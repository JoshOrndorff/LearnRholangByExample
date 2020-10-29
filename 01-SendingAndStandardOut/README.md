# Sending and Standard Out

## Say Hello

!["Person waiving hello"](helloWorld.png)


There is a long-standing tradition in programming that your first program should say "Hello World". Here's the simplest rholang code to put that text on the screen.

[hello.rho](hello.rho)

### Exercise
Make the program print "Rholang rocks!" instead of "Hello World".


## WTH is result?

![Channels are like mailboxes for sending messages](mailbox.png)

The heart of rholang is communicating on channels. Channels are communication lines that you use to send and receive messages. To send a message on a channel, you use the `!` character.

![Redo this diagram!](sendSyntax.png)

We created the channel `result` on the first line of the program with `new result`. You'll create lots of channels as you learn rholang. The first new channel defined will be returned as the result of an explore deploy. More on that later, but for now just know that you need that the first channel name will give you a result of an explore. For an actual deploy onto the blockchain the value retuned will be on a special deployId channel.


## Using other channels

![Sent messages wait to be received here in "message purgatory"... JK, it's called the "tuplespace"](mailboxes.png)

You can actually send messages on lots of channels, not just `result`. But unlike `result` they won't display on the screen because we won't add any special powers to them.

[tupleSpace.rho](tupleSpace.rho)

So where do the other channels go then? Nowhere! Not yet anyway. The messages just sit there waiting for someone (or some process) to receive them. We'll learn how to receive messages in the next lesson. The place where messages sit in the meantime is called the "tuplespace".

Make sure your message is sitting in the tuplespace. You should see some text like this depending on which developer environment you use.

```
Storage Contents:
 @{"RandoChannel"}!("This won't be on the screen") | for( x0, x1 <= @{Unforgeable(0x01)} ) { Nil } | for( x0, x1, x2, x3 <= @{"secp256k1Verify"} ) { Nil } | for( x0, x1 <= @{"sha256Hash"} ) { Nil } | for( x0, x1 <= @{Unforgeable(0x03)} ) { Nil } | for( x0, x1, x2, x3 <= @{"ed25519Verify"} ) { Nil } | for( x0, x1 <= @{"blake2b256Hash"} ) { Nil } | for( x0 <= @{Unforgeable(0x02)} ) { Nil } | for( x0 <= @{Unforgeable(0x00)} ) { Nil } | for( x0, x1 <= @{"keccak256Hash"} ) { Nil }
```



## Doing two things at once
![Rather than following an ordered list, all ingredients are added concurrently.  Looks delicions](cooking.png)

In rholang we don't tell the computer to do one thing, then another, then a third. Rather we tell it all the things to do, and it does them "concurrently," or all at once.

[parallel.rho](parallel.rho)

The `|` is pronounced "parallel", or "par" for short.


### Exercise
Send the message "1 large pepperoni please" on a channel called "pizza shop".

### Exercise
Send "Hi Mom" on the channel "Mom's Phone".

### Exercise
Print two messages, "Rick" and "Morty", on the screen in one program.



## Quiz

What will `result!("Programming!")` print to the screen?
- [x] Programming!
- [ ] result!
- [ ] Nothing


What channel does `what!("Up")` send a message on?
- [ ] `Up`
- [x] `what`
- [ ] `what`
- [ ] `result`


Which does rholang do first in
```
result!("Dogs")
|
result!("Cats")
```
- [ ] prints "Dogs"
- [ ] prints "Cats"
- [x] Neither. They are concurrent


### Exercise
There is also a special channel called `rho:io:stderr`. Check out what happens when you send to it. ([what's the difference?](https://en.wikipedia.org/wiki/Standard_streams))
