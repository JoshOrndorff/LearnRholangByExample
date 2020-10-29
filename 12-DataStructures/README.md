# Data Structures

It is common for programs to process and store real world data. And whenever you have lots of data it is important to keep it organized so you can find the information you need quickly. In the analog world, paper files are kept organized by stacking them, putting them in folders, and file cabinets. The same concept applies in programming, and rholang is no exception (for once!).

If you've never seen data structures before, you will likely want to consult some other references, and look at additional example code.

## String Methods
Let's start with a familiar idea. We've seen strings since the very first program in lesson one. Really strings are just a nice way to organize a bunch of characters, and that makes them a data structure. Like all data structures, strings have "methods" that you can perform on them.

String's length method tells how many characters are in a string. While it's slice method creates a new string with some characters sliced off of each end. Strings also support the `++` operator for concatenation.
[wordLength.rho](wordLength.rho)

What is the result of `"hello world".length()`?
- [ ] 2
- [ ] 10
- [x] 11
- [ ] undefined
- [ ] "hello"

Which of the following evaluates to "ello"?
- [x] `"hello world".slice(1, 5)`
- [ ] `"hello world".slice(0, 5)`
- [ ] `"hello world".slice(1, 4)`
- [ ] `"hello world".slice(3, 6)`

Strings also have a method called `hexToBytes` that is designed to work on strings that contain valid hexadecimal numbers. It gives back a byte array that is represented by that hex number. Try to run `"1241243e".hexToBytes()`


Pro tip: It is also possible to slice a byte array. Experiment with that on your own.



## Tuples
Tuple can rhyme with either "couple" or "drupal"; both pronunciations are correct. You've seen tuples before when you wrote contracts that take in multiple arguments like `contract c(x, y, z) = { Nil }`. The number of items in a tuple is know as its arity. So the tuple received by contract `c` is arity three.

Tuples contain several pieces of data **in order**. They are always a fixed arity, and have relatively few methods. Thus they are the least interesting data structure, but at the same time, the most fundamental. Let's look at some of the methods offered by tuples.

[tuple.rho](tuple.rho)

What is the arity of [3, 4, 9, Nil]?
- [ ] 3
- [x] 4
- [ ] 9
- [ ] Nil

What would `("a", "b", "c").nth(3)` evaluate to?
- [ ] 3
- [x] That's an error
- [ ] "c"
- [ ] ("a", "b", "c")

### Exercise
Write a program that takes in a 4-tuple and prints elements 0 and 3 to the screen.


## Lists
Lists are a lot like tuples, but they are made with square brackets instead of parentheses. They also have more methods, and can be concatenated or glued together using the `++` operator just like strings can. Here are examples of all of list's methods.

[list.rho](list.rho)

### Exercise
Implement the body of the following running log contract. The user will call the contract every time they go for a run passing in the distance that they ran. The contract will keep track of all the runs in a list. You may also write methods to get all the run data, or get the total distance the user has run.

```rholang
new logRun, runsCh in {

  // No runs to start with
  runsCh!([])|

  contract logRun(distance) = {
    // Your code here
  }
}
```

## Sets

Sets are similar to lists in some ways, but the one big difference is that sets **are not ordered**. A set is a collection of processes, but there is no first or last item in the set. There are also **no duplicates** allowed in sets. Let's take a look at some of set's methods.

[set.rho](set.rho)

Which code would produce a set of all club members who have not paid their dues?
- [x] `allMembers.diff(paidMembers)`
- [ ] `paidMembers.diff(allMembers)`
- [ ] `paidMembers.union(allMembers)`
- [ ] `paidMembers.contains(allMembers)`

What is the result of `Set(1,2,3) == Set(3,2,1)`
- [x] `true`
- [ ] `false`
- [ ] invalid syntax
- [ ] `Set(2)`

## Maps
Maps are a lot like sets but they contain **key value pairs**. Maps are also unordered, but when you add an item (which is now known as a key) you also add an associated value. Here are examples of all of map's methods.

[map.rho](map.rho)

What is the result of `{"years": 1, "weeks": 52, "days": 365}.get(52)`
- [ ] weeks
- [ ] years
- [ ] 52
- [x] Nil

To demonstrate the usefulness of maps in rholang, let's consider this contract that looks up the capital of any country (that I bothered to type).

[capitalOf.rho](capitalOf.rho)

## Exercise
Starting from the example code above, make a Countries and Capitals quiz game where the user calls up a contract and get's back a challenge country as well as an answer channel. The user then sends her best guess for that country's capital back over the answer channel and gets back a boolean for whether she was correct.

To learn how to use this game interactively with a nice user interface, check out some dapp development examples such as the [nth caller game](https://github.com/JoshOrndorff/nth-caller-game)

## Exercise
Map's `diff` method takes another map as an argument. What happens if the diff map has some of the same keys but with different values associated. For example:
```
{"a": "A", "b": "B", "c": "C"}.diff({"a": 25})
```


## Method Summary Table

That was a lot of info about data structures in one go. So here is a handy table to remind you what methods exist. This info is also on the [cheat sheet](../cheatSheet).

Method       | Tuple |  List |  Map  |  Set
---          | ----- | ----- | ----- | -----
nth          |   x   |   x   |       |
toByteArray  |   x   |   x   |   x   |   x
union        |       |       |   x   |   x
diff         |       |       |   x   |   x
add          |       |       |       |   x
delete       |       |       |   x   |   x
contains     |       |       |   x   |   x
get          |       |       |   x   |
getOrElse    |       |       |   x   |
set          |       |       |   x   |
keys         |       |       |   x   |
size         |       |       |   x   |   x
length       |       |   x   |       |
slice        |       |   x   |       |

## Sending and Receiving on Compound Names
We've learned about several interesting data structures in this lesson. Data structures are processes just like integers, booleans, and `Nil`. So they can be quoted and turned into names like all those other processes. We can build contracts on those names just like we can any other names. Names that are built on data structures such as tuples are often called compound names.

In this example, Alice and Bob each have one unforgeable name (that I've called key). The keys may be useful on their own (for things not shown in the snippet), but only when used together, can the contract shown be called. This is known as "rights amplification".
```
new result, alice, bob, key1, key2 in {

  alice!(*key1)|
  bob!(*key2)|

  contract @(*key1, *key2)(_) = {
    result!("Congratulations, Alice and Bob, you've cooperated.")
  }
}
```



What tuple is used to build the compound name in `contract @(*self, "getVal")(_) = { Nil }`?
- [ ] `self`
- [ ] `"getval"`
- [x] `(*self, "getVal")`
- [ ] `@(*self, "getVal")`
- [ ] `@"getVal"`
