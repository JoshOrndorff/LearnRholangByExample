var code = {

persistentSend:
`// ATC sends the info
@"airportInfo"!!("No wind; Runway 11")
|
// Pilot receives the info
for (info <- @"airportInfo") {
  0 // Pilot just listens, doesn't do anything
}
`,

grandma:
`// I send the message
@"grandma"!("Meet at the mall at 4:00")
|
// Grandma receives it
for (msg <- @"grandma"){
  @"stdout"!{"I got your message"}
}`,

grandma-check:
`// I send the message
@"grandma"!("Meet at the mall at 4:00")
|
// I double check the message
for (msg <- @"grandma"){
  0 // Do whatever you do to double check the time
  |
  // Put a copy back on the channel for grandma
  @"grandma"!(*msg)
}
|
// Grandma receives it
for (msg <- @"grandma"){
  @"stdout"!{"I got your message"}
}`,

peek:
`// I send the message
@"grandma"!("Meet at the mall at 4:00")
|
// I double check the message
for (msg <! @"grandma"){
  0 // Do whatever you do to double check the time
    // Message is still safely on the channel
}
|
// Grandma receives it
for (msg <- @"grandma"){
  @"stdout"!{"I got your message"}
}`
}
