# Persistent Sends and Peek

## Why send repeatedly?

![This radio navigation aid helps airplanes navigate by broadcasting the same message over and over](broadcasting.png)

Our pizza and coffee shops were both interested in receiving many messages on the same reusable channel. We accomplished that with a persistent for `for (msg <= chan){...}` or a contract `contract chan(msg){...}`.

An air traffic control tower may be interested in doing just the opposite -- sending the same message over and over. The controllers in the tower want to record a message containing weather and active runway information once, and make it available for every pilot who needs it. Like the pizza shop, they are busy and can't be bothered to continually re-send the message every time a pilot consumes it.



## Persistent send syntax

The control tower just needs a minor adjustment in their code to make the send persistent. Rather than sending with a single `!`, they will use a double `!!`.

[persistentSend.rho](persistentSend.rho)

Confirm for yourself that the original send is still in the tuplespace.

### Exercise
Modify the above code so that a second pilot also receives the information. Still, the send persists.

By the way, did you notice that we don't need `new stdout(...) in {}` when we don't actually use `stdout`.

How many comms happen in `for (x <- y) {0} | y!!(0)`
- [x] `1`
- [ ] `many`
- [ ] `0`


## Double Checking a Message

Persistent sends and receives are very useful as we just showed. But often normal sends and receives are perfectly good too. Imagine that I send my grandmother a letter, and she receives it.

[grandma.rho](grandma.rho)

Now Imagine that I want to double check that I sent her the correct time. I could simply consume the message, but then it wouldn't be around for her to read anymore.

### Exercise
Using what you already know, you can achieve this by consuming the message, checking it yourself, and then sending the same message back to the old channel.

Give that a try on your own first. The solution is listed below.


How many comms happen in `for (x <= y) {0} | y!!(0)`
- [ ] `1`
- [x] `many`
- [ ] `0`


## Answer to Exercise

[grandmaCheck.rho](grandmaCheck)


## Peek Syntax

![Maybe I'll just peak at Grandma's letter through the envelope.](letterPeak.png)


Rholang will have a special syntax for this sort of thing eventually. It isn't available right now, but I'll show you the syntax just so you're ready. To "peek" at what's on a channel without consuming it, use the `<!` operator.

[peek.rho](peek.rho)

If you've ever written spreadsheet macros, or even used a spreadsheet. Accessing data without consuming it should be familiar. Think of it as `for (value <! A1) { ... }`



Which syntax is used to peek at a message?
- [x] `for (x <! y){...}`
- [ ] `for (x <= y){...}`
- [ ] `x!!(y)`



How many comms happen in `for (x <! y) {0} | y!!(0)`
- [x] `1`
- [ ] `many`
- [ ] `0`
