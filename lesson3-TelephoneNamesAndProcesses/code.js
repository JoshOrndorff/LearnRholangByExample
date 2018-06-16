var code = {

telephone3:
`// Start the game by sending a message to Alice
@"Alice"!("How to program: Change stuff and see what happens.")
|

// At the same time, Alice will listen for the message
for (message <- @"Alice") {

  // When she receives the message she'll pass it on to Bob
  @"Bob"!(*message)
}
|

// At the same time, Bob will listen for the message
for (message <- @"Bob") {
  // Bob is the last player, so he'll just print the message to stdout
  @"stdout"!(*message)
}`

}
