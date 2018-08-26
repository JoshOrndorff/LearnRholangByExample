# More Syntax

By now you can already build some actual projects. And you should do it! Before we dive into the next unit, let's learn more practical syntax so you have the real-world tools you need need to build that next killer dapp.

## Binary Operators
+ - / * ++

## Receiving Processes?

We always send ____ and receive ____.
- [x] processes, names
- [ ] processes, processes
- [ ] names, names
- [ ] names, processes
- [ ] no such restriction

TODO: Another standing at a mailbox drawing. Maybe mix it up with the kind of mailbox that mounts on the front of your house or a mail slot or something. "Awww man, bills again? I wanted love letters."

That was just a nice refresher from last unit. Hope your memory is holding up so far. If you've been writing your own rholang code, you may have found yourself really wishing you could receive processes directly so you didn't have to type all those `*`s. This is a common situation, and luckily rholang has a nice solution. We do always have to receive names, but we can bind them to name syntax like `@myValue`. Since `@myValue` is a name, `myValue` must be a process.

This syntax allows us to do things like
`for (@number <- @"someChan"){@"double"!(2 * number)}``

### Exercise
Revisit the telephone game from unit 1 and show that we could have used the `@message` pattern so `message` would be a process.

What should replace the ... in for(@x <- @y){stdout!(...)}
- [ ] `@x`
- [x] `x`
- [ ] `*x`


## Ifs and Conditions
In nearly every programming language the program's behavior can change depending on some condition. In rholang that syntax is

TODO maybe make this a file. But what should condition be to make it run
```rholang
if ( /* condition */ ) {
  0 // Do this if condition is true
}
else {
  0 // Do this if condition is false
}`
```

The situations where you will use `if` are limitless and include guessing a secret word correctly, setting the high score in a video game, determining which poker hand is higher, and calculating the winner of an election. This example contract shows how you might check the status of a bank account.

[signTest.rho](signTest.rho)

### Exercise
The accounting program has a problem. It says that accounts with a balance of zero are overdrawn. But really zero should be in good standing. You can fix this using the "greater than or equal" operator, `>=`.


## Comparison Operators
Now that you know how to use the `if` `else` construct, there are lots of good comparison operators at your disposal.
* `a > b` Is a greater than b?
* `a < b` Is a less than b?
* `a == b` Is a equal to b?
* `a <= b` Is a less than _or_ equal to b?
* `a >= b` Is a greater than _or_ equal to b?
* `a != b` Is a unequal to b?

These operators work on both numbers and text strings. Text strings are sorted lexicographically, which is a lot like alphabetically. But be careful! If you try to compare a number to a string, it will just be another stopped process.

Which of these are true?
- [ ] 4 < 3
- [ ] "b" < "a"
- [x] 5 <= 6
- [ ] "hello" != "hello"

### Exercise

Write a rholang program that requires the user to send in their name. In most cases the contract will simply reply with "hello", but if their name is the same as yours, it will tell them so.
