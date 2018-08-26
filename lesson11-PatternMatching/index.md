# Pattern Matching

## About Patterns
general intro... maybe find a good reference to summarize

## Two cases we've seen
--  and for(@x <- @y) in the last lesson were both related to pattern matching. Let's generalize

-- We've also seen the underscore sometimes. That's pattern matching.

## Syntactic sugar
It turns out that pattern matching ca nbe used to totally replace if/else. We would just have to match to the cases true and false
### Exercise
rewrite some if else code in terms of match

### Exercise
rewrite some match code in terms of if else

-- In the process: for(x <- y) { P }, x is not necessarily a name, but a quoted process pattern with holes in it.
you can use for(@process <- chan){0} if you intend to use the param as a process. We could have done this in our savingsAccount code.

-- The code for(@"myChan" <- x) { P } is listening for a process sent on x that matches the pattern "myChan". So x!(P) | for(@"stdout" <- x) will not reduce unless P is exactly the process "stdout".

-- You can do cool things like for(@(x!(P)) <- y){ Q } which will only reduce if the process sent to x matches the pattern of a single send. Then in the process Q you will have the variable x (to use as a name) and P (to use as a process).

-- Do some examples of sends and receives on the same channel that don't comm because patterns don't match


-- If then else is really just syntactic sugar for pattern matching.

## Boolean Operators
Rholang also has operators the classic Boolean operators AND, OR, and NOT. The syntax is

* `a /\ b` AND -- true when both `a` and `b` are true
* `a \/ b` OR -- true when either `a` or `b` is true
* `!a` NOT -- true when `a` is false

I'm not sure exactly how these work. Check out https://github.com/rchain/rchain/blob/dev/rholang/examples/tut-rcon-or.rho ?
