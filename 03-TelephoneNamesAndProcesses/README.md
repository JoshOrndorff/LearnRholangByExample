# Telephone, Names, and Processes

## Message Relaying


![The game of telephone is perfect to simulate message forwarding in rholang.](telephone.png)


We've previously learned how to send a message to grandma or a pizza shop. But so far all those recipients have done is acknowledge the message by printing to standard output.

Now let's make them do something more interesting by passing the message along like in a child's telephone game

[telephone3.rho](telephone3.rho)

As the message says, you learn most when you experiment. So be sure to change things as you see fit.

### Exercise

That telephone game was fun, but it's always better the have more players. Go ahead and add a third player called Charlie. Instead of printing to `result`, bob will send the message along to Charlie. Then Charlie will print it to the screen. The More the Merrier!



![The message never seems to get there correctly. I blame Bob.](telephoneChangedMessage.png)



### Exercise
If you've ever actually played telephone, you know that the message rarely arrives in tact. Change the program so Bob passes along a different message regardless of what he receives.


## WTH is That `*`?

![Opposites attract](inverse.png)

Did you notice the `*` in `bob!(*message)`? In rholang there are two kinds of things, "channels" and "processes". There are also ways to convert between the two.

<!-- TODO: Maybe an illustration of arrows labeled * and @ would be better here? -->

A "process" is any piece of rholang code such as our telephone game, or our pizza shop order program. Processes can be big hundred-line programs or small on-liners. They can even be tiny pieces of code that are just values.  Here are some example processes.

 - `result!("Sup Rholang?")` A common send
 - `Nil` The smallest possible process. It literally means "do nothing".
 - `for(msg <- phone){Nil}` A common receive that does nothing when a message arrives.
 - `"Hello World"` Another small process that also does nothing. These are called "Ground Terms".


A channel (also frequently called a "name") is something that can be to send messages over. In rholang, names come from "quoting processes" by putting the `@` sign before a process. Here are some example names.

 - `@"Hello World"` Made by quoting the ground term "Hello World".
 - `@Nil` The smallest possible name. Made by quoting the smallest possible process.
 - `@(alice!("I like rholang, pass it on."))` Made by quoting a process from our telephone game



## So What is `*` all about?


![What kind of name is that!? Did your parents just name you after some computer code?](myNameIs.png)

We can package processes up to make names by quoting them with the `@` symbol. We can also turn names back into processes by "unquoting" them with the `*` symbol.

The big thing to remember is in rholang we **send processes and receive names**. That's important so I'll say it again. You always **send a process** and on the other end, you **receive a name**.

When Alice receives our message with `for(message <- alice)` she is receiving, so `message` becomes a name. When she later sends to Bob she has to send a process, so she uses `*` to turn `message` back into a process with `bob!(*message)`



## Quiz

What do we send?
- [x] processes
- [ ] names



What do we receive?
- [ ] processes
- [x] names



  What is `registration` from the code `new registration in {...}`
- [ ] process
- [x] name
- [ ] invalid syntax




What is `Nil`?
- [x] process
- [ ] name
- [ ] invalid syntax



What is `@Nil`?
- [ ] process
- [x] name
- [ ] invalid syntax




What is `@@Nil`?
- [ ] process
- [ ] name
- [x] invalid syntax



`*importantData` is a process, so what is `importantData`?
- [ ] process
- [x] name
- [ ] invalid syntax



  Which of these is equivalent to `"BobsPhone"`?
- [x] `*@"BobsPhone"`
- [ ] `@"BobsPhone"`
- [ ] `*"BobsPhone"`
- [ ] `@*"BobsPhone"`
- [ ] `result!("BobsPhone")`



### Exercise

![This telephone game has a fork](telephoneFork.png)

Instead of a linear telephone game where each player passes the message to the next, let's add a branch in the game. So now Bob will send to Charlie like before, but Bob will also send to Dawn.

Each branch can be as long as you want, but at the end of each branch, print the message to `result`.
