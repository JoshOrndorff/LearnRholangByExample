# More Syntax

By now you can already build some actual projects. And you should do it! Before we dive into the next unit, let's learn some more practical syntax so you have the real-world tools you need need to build that next killer dapp.

## Binary Operators
The first new syntax will be some binary operators. Binary operators take two operands, which is why they're called _bi_ -nary. Most of these are for arithmetic. Consider these examples.

[math.rho](math.rho)

### Exercise
Your turn to implement the `f2c` contract. You can use the same two test cases in reverse to make sure you're getting the right result.

The final binary operator you should know is `++` which is used for "concatenation" or connecting two smaller things to make a bigger thing. The operator works for lists, which we'll learn about in the next unit, as well as strings which we already know about.

[greeter.rho](greeter.rho)

What would the code `result!("I" ++ "<3" ++ "rholang")` output?
- [ ] I <3 rholang
- [ ] ["I", "<3", "rholang"]
- [x] I<3rholang
- [ ] I++<3++rholang



## Receiving Processes?

We always send ____ and receive ____.
- [x] processes, names
- [ ] processes, processes
- [ ] names, names
- [ ] names, processes
- [ ] no such restriction

<!-- TODO: Another standing at a mailbox drawing. Maybe mix it up with the kind of mailbox that mounts on the front of your house or a mail slot or something. "Awww man, bills again? I wanted love letters." -->

That was just a nice refresher from last unit. Hope your memory is holding up so far. If you've been writing your own rholang code, you may have found yourself really wishing you could receive processes directly so you didn't have to type all those `*`s. This is a common situation, and luckily rholang has a nice solution. We do always have to receive names, but we can bind them to name syntax like `@myValue`. Since `@myValue` is a name, `myValue` must be a process.

This syntax allows us to do things like
`for (@number <- someChan){double!(2 * number)}``

What code could be parred with the previous code to leave the number `24` on `double`?
- [ ] @number!(12)
- [x] someChan!(12)
- [ ] @number!(24)
- [ ] double!(48)

### Exercise
Revisit the telephone game from lesson 3 and show that we could have used the `@message` pattern so `message` would be a process.

What should replace the ... in `for(@x <- @y){result!(...)}` to make the program valid?
- [ ] `@x`
- [x] `x`
- [ ] `*x`


## Ifs and Conditions
In nearly every programming language the program's behavior can vary depending on some condition. For example I run on the trails _if_ it is nice out, but stick to the roads in _if_ it is rainy. In rholang the syntax is to do that is.

```
if ( /* condition */ ) {
  Nil // Do this if condition is true
}
else {
  Nil // Do this if condition is false
}`
```

The situations where you will use `if` are limitless and include guessing a secret word correctly, setting the high score in a video game, determining which poker hand is higher, and calculating the winner of an election. This example contract shows how you might check the status of a bank account.

[signTest.rho](signTest.rho)

### Exercise
The accounting program has a problem. It says that accounts with a balance of zero are overdrawn. But really zero should be in good standing. You can fix this using the "greater than or equal" operator, `>=`. Make sure you add a few tests to make sure it works.


## Comparison Operators
Now that you know how to use the `if`/`else` construct, there are lots of good comparison operators at your disposal.
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

## Boolean Operators
Rholang also has the classic Boolean operators AND, OR, and NOT. The syntax is

* `a and b` true when both `a` and `b` are true
* `a or b` true when either `a` or `b` is true
* `not a` true when `a` is false

What would `result!(true and true)` output?
- [x] true
- [ ] false
- [ ] neither; that's invalid syntax

What would `result!(not true)` output?
- [ ] true
- [x] false
- [ ] neither; that's invalid syntax

What would `result!((not not true) or false)` output?
- [x] true
- [ ] false
- [ ] neither; that's invalid syntax

### Exercise
Write a contract that tells a caller whether they are eligible to vote. In order to vote you must be a certain age and of a certain country. You can pick the age and country. To use the contract, I would par in `canIVote!("Nigeria", 30)"`.

### Exercise
The contract above only works for one specific country. Use what we learned about factories to enable creating many of these eligibility checkers. To create a new checker for Canada, where the voting age is 18 par in `checkerFactory!(canadaChecker, "Canada", 18)`. Then a 41-year-old Estonian would check whether he can vote in Canada with `canadaChecker!("Estonia", 41)`. Spoiler alert: He cannot vote in Canada.
