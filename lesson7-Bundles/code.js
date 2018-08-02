var code = {

fanmailBad:
`// Alice reads fan mail
for (mail <- alice) {
  @"stdout"!("Alice received a fanmail")
}
|

// Bob sends fan mail
alice!("Dear Alice, you're #TheBest")
`,

fanmailEve:
`for (@stolenMail <= alice) {
  @"stdout"!("Eve stole a message")
}`,

fanmailPublish:
`// These channels are basically public names within
// the file like rho:pubkey:whatever

new alice, bob, eve in {

  // Alice creates a new write only bundle and publishes it.
  new aliceFanMail in {

    // Alice gives fanmail channel publically
    alice!!(bundle+ {*aliceFanMail})
    |

    // Alice also reads fan mail
    for (mail <- aliceFanMail) {
      @"stdout"!("Alice received a fanmail")
    }
  }
  |

  // When Bob wants to send fanmail he asks for the channel
  // and then sends
  for (aliceFanMail <- alice) {
    aliceFanMail!("Dear Alice, you're #TheBest")
  }
  |

  // Eve tries to intercept a message, but cannot
  // because Alice's fanmail channel is write-only
  for (aliceFanMail <- alice) {
    for (@stolenMail <= aliceFanMail) {
      @"stdout"!(["Eve stole a message: ", stolenMail])
    }
  }
}
`,

fanmailAsk:
`// These channels are basically public names within
// the file like rho:pubkey:whatever

new alice, bob, eve in {

  // Alice creates a write-only bundle
  new aliceFanMail in {

    // Alice gives fanmail channel to any fan that asks for it
    for (return <= alice) {
      return!(bundle+ {*aliceFanMail})
    }
    |

    // Alice also reads fan mail
    for (mail <- aliceFanMail) {
      @"stdout"!("Alice received a fanmail")
    }
  }
  |

  // When Bob wants to send fanmail he asks for the channel
  // and then sends
  new return in {
    alice!(*return) |
    for (aliceFanMail <- return) {
      aliceFanMail!("Dear Alice, you're #TheBest")
    }
  }
  |

  // Eve tries to intercept a message, but cannot
  // because Alice's channel is write-only
  new return in {
    alice!(*return) |
    for (aliceFanMail <- return) {
      for (@stolenMail <= aliceFanMail) {
        @"stdout"!(["Eve stole a message: ", stolenMail])
      }
    }
  }
}`,

jackpot:
`new throw in {
// Throw the ball worth five points
@throw!(5)
|

// Throw the ball several more times
@throw!(4) |
@throw!(2) |
@throw!(6) |

// Bill and Paige both try to catch
for (points <= @throw){
  @"stdout"!("Bill caught it")
}
|
for (points <= @throw){
  @"stdout"!("Paige caught it")
}
}`,

jackpotNicePrinting:
`for (points <= @throw){
  new ack in {
    @"stdoutAck"!("Bill caught it. Points earned: ", *ack)
    |
    for( _ <- ack){
      @"stdout"!(*points)
    }
  }
}
// Do the same for Paige
`,

jackpotEve:
`// Eve can throw a ball just as well as anyone can.
@throw!(100)
`,

jackpotPublish:
`new throw, gameCh in {

  //Give out read-only access
  gameCh!(bundle- {*throw})
  |
  // Now actually make all the throws
  throw!(4) |
  throw!(2) |
  throw!(6)
}
|
// Bill and Paige join the game
for (throw <- gameCh){
  for (points <= throw){
    @"stdout"!("Bill caught it")
  }
}
|
// Eve tries to throw a fake, but can't
for (throw <- gameCh){
  throw!(100)
}`
}
