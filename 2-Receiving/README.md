# Receiving and communicating 

![Rather than the message appearing first, then someone receiving it, Greg is trying to receive first. Hopefully someone will send him a message so he can have a comm event.](lookingForMessages.png)

When a send and a receive come together on a channel, it is called a communication event, or "comm event" for short.

Unlike normal mail where a message must be sent <em>then</em> received, the two can happen in either order or at the same time in rholang. It is just as acceptable to receive a message, then send it. Whenever a send and receive come together, a comm event takes place.

## Check for Messages

![// Dear future self, keys in freezer because...](Keys.png)

We learned last time how to send a message. Now it's time to learn how to receive a message. The general syntax is:

`for(message <- channel){ // Do something here}`

BTW, lines that start with `//` are called comments. They're just there for human coders and don't affect the way the program runs at all. They're a good idea, and you should use them! Anyone who reads your code (including your future self) will appreciate them.

## Pizza time!

![Pizza shop can receive messages on its channel.](pizza.png)

The following code sends a message on a channel for a pizza shop and the pizza shop receives it. The pizza shop acknowledges receiving the message by printing to stdout.

[pizzaOrder](pizzaOrder.rho)

## Contracts

![The poor chef is too busy making sure he can receive orders to take care of his pizza.](pizzaBurning.png)

Our pizza shop example illustrates comm events nicely, but it isn't very realistic to expect the pizza shop to manually issue a new receive every time an incoming order. This consumes theirs from the tuplespace.

Luckily it's possible to deploy code once, and have it run <em>every</em> time it receives a message. This kind of thing is called a "smart contract". Let's look at some code for a coffee shop that is much superior to the pizza shop.

[coffeeShop.rho](coffeeShop.rho)

## Persistent For
There are actually two different styles of syntax in rholang to achieve this persistent behavior. We just learned about `contract`. The following snippets are equivalent.

```rholang
contract @"coffeeShop"(order) = {
```

```rholang
for(order <= @"coffeeShop") {
```
Notice this is different from a normal `for` because it has a double arrow `<=` rather than a single arrow `<-`. The only difference between the persistent for and a contract comes when we start talking about blockchains. For now you can think of them as the same thing.

## Tuplespace Pollution
<!-- TODO I really wasn't sure where to put this part -->
If you're having trouble with old data sticking around and showing up later, you just need to clear your tuplespace. The easiest way to do that is to delete you data-directory which is usually called `.rnode`
<!-- TODO I should write a script for this -->

Clearing out your tuplespace that way can get old quickly. A better idea would be to keep it from getting polluted in the first place. We can do that by modifying the top line that says new.

Rather than the old way
```
new stdout(`rho:io:stdout`) in {
  @"world"!("Welcome to RChain")
}
```

Try this
```
new world, stdout(`rho:io:stdout`) in {
  world!("Welcome to RChain") // No more @ or " "
}
```
We'll talk about how this works in our lesson on Unforgeable names. for now just enjoy not having to reset every time.

### Exercise
Send that message we used in [pizzaOrder](pizzaOrder.rho) to a different channel like `@"coffeShop"`. Did the acknowledgement print? Is anything left in the tuplespace?

![Let's hit up the coffee shop.](coffee.png)

### Exercise
Remember, in rholang things don't happen in order, they happen concurrently. The pizza shop code will work just as well if we put the receive first. Give it a try!

### Exercise
Order a second drink from the coffee shop

### Exercise
Change the acknowledgement message

Which should generally come first?
- [ ] A send because that's how normal mail works.
- [ ] A receive because it's faster to run the code that way.
- [x] Either a send or a receive can come first, or they can come together.
- [ ] A receive because rholang is concurrent.
- [ ] Neither. Just make a comm event directly.

### Exercise
The channel is just named `@"coffeeShop"`. Change it to be named after a specific coffee shop of your choosing. While you're at it, modify the code to use `new` like we recently learned.

### Exercise
The pizza shop could use a contract like the one the coffee shop had. Let's write it one but use a persistent for instead of a contract. Try to write the entire thing from scratch so you remember the syntax better.
<!-- The solution is in persistentPizzaShop.rho
[persistentPizzaShop.rho](persistentPizzaShop.rho) -->


Which of these things is not like the other?
- [x] `for (a <- b){}`
- [ ] `contract b(a) = {}`
- [ ] `for (a <= b){}`

Which send will produce a comm event with `for (message <- @"grandmasSnapChat"){Nil}`?
- [ ] `grandmasSnapChat!("Hi Grandma")`
- [x] `@"grandmasSnapChat"!("Glad you're snapping Grandma")`
- [ ] `for("Here's a snap for you g'ma" <- @"grandmasSnapChat")`
