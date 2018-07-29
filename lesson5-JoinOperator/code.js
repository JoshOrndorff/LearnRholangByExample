var code = {

joinDemo:
`for (p1Pushups <- @"player1"; p2Pushups <- @"player2") {
  @"stdout"!("The winner is...")
}
`,

launch:
`// Listen for both launch commands
for (x <- @"AliceLaunch"; y <- @"BobLaunch"){
  @"Rocket"!("launch")
}
|
// When ready, Engineers send their commands
@"AliceLaunch"!("launch")
|
@"BobLaunch"!("launch")
`,

launchBad:
`// Listen for Alice's then Bob's launch commands
for (x <- @"AliceLaunch"){
  for (y <- @"BobLaunch"){
    @"Rocket"!("launch")
  }
}
|
// When ready, Engineers send their commands
@"AliceLaunch"!("launch")
|
@"BobLaunch"!("launch")
`,

abortableLaunch:
`// When giving the launch command, Alice also makes an abort button.
@"AliceLaunch"!("launch")
|
for (abortMessage <- @"AliceAbort"){
  // When a message comes on @"AliceAbort", the launch command is immediately consumed.
  for (junkMessage <- @"AliceLaunch"){
    0
  }
}
|
// If she decides to abort, she just sends a message
@"AliceAbort"!("abort")
`,

patienceTemplate:
`// Player one sends a message like this
@"P1"!("Send any message")
|
// Player two sends a message like this
@"P2"!("Hope I win")
|
// You write the code that determines the winner
0`,

patienceSolution:
`// Send these messages in both orders to test your code
@"P1"!("Send any message")
|
@"P2"!("Hope I win")
|
// When Player one wins
|
for (m2 <- @"P2"){
  for (m1 <- @"P1"){
    @"stdout"!("Player one wins!")
  }
}
// when player two wins
for (m1 <- @"P1"){
  for (m2 <- @"P2"){
    @"stdout"!("Player two wins!")
  }
}
`,

P1First:
`// P1 sends their message then signals P2 who is waiting
@"P1"!("Send any message")
|
@"signal"!("Go ahead, I'm done.")
|
// When P2 receives the signal, they send their message
for (_ <- @"signal"){
  @"P2"!("Hope I win")
}`
}
