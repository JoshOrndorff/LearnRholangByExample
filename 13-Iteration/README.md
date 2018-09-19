# Iteration and Recursion
Let's start with some exercises to review old topics and motivate the problem we're solving in this lesson.


### Exercise
Write a program that prints a countdown of the numbers 3, 2, 1 in order on the screen.

### Exercise
Now countdown from 5.

### Exercise
Write a contract that returns a random number between 1 and 3.
Hint, you can use race conditions to your advantage here.

### Exercise
Now make it choose a random number between 1 and 10.

Is this method of writing a random number generator sustainable?
- [ ] Yes
- [x] No



## Iteration
TODO Julie drawing for iteration.


Iterating is the process of ..... Many programming languages use iteration as a fundamental way of controlling the flow of their programs. Iteration inherently means doing a process to one item then the next then the next. Because rholang is a fully concurrent programming language this is impossible. But that's actually a strength!

```
manually iterate through the list [1, 2, 3, 4]
```

This process is clearly not sustainable because long lists would be extremely deeply nested. Worse, any code that we actually write would have a maximum depth. And we don't want to limit the length of our list. Consider this crafty code

```
Simple recursion that passes a counter and compares it to the lists length
```

```
Better version that uses pattern matching to detect empty list
```








## Recursion
Todo Julie drawing about recursion or a picture of a picture or something.

map
filter
sumlist


## heading

### Exercise
Write a contract that takes in two integers that represent a minimum and a maximum.

Exercise: group forwarder. I, the king, send messages to the forwarder who copies them to all the recipients. Rather than just having kill switch, I have the ability to change group subscription.
