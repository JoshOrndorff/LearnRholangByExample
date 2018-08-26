var code = {

box:
`new box in {
  // To save data we just put it in the box
  box!(42)
  |

  // Then to get data back out
  for (data <- box) {
    // Do whatever you want with the data here.
    @"somePublicBox"!(*data)
  }
}`,

persistentBox:
`new box in {
  // To save data we just put it in the box
  box!(42)
  |

  // To check the value without consuming it
  for (data <- box) {
    // We send a copy back to the box
    box!(data)
    |
    // The do whatever with it
    @"somePublicBox"!(*data)
  }
}`,

counter:
`new currentCount, increase, reset in {

  // Start the counter at zero
  currentCount!(0) |

  // Method in increase counter
  contract increase(ack) = {
    for (old <- currentCount) {
      currentCount!(*old + 1) |
      ack!(0)
    }
  }
  |

  // Method to reset the counter
  contract reset(ack) = {
    for(_ <- currentCount){
      currentCount!(0) |
      ack!(0)
    }
  }
  |

  // Demo using the counter
  // This part gets deeply nested because it is sequential
  new ack in {

    // Increase the counter three times
    increase!(*ack) |
    increase!(*ack) |
    increase!(*ack) |
    // And check it's value afterward
    for(_ <- ack; count <- currentCount) {
      @"stdout"!(*count)
    }
  }
}`,

checkMethod:
`// Method to check the counter
contract check(return) = {
  for(count <- currentCount){
    currentCount!(*count) |
    return!(*count)
  }
}`,

counterTests:
`// This gets deeply nested because it's sequential.
// This indentation style keeps it readable
increase!(*ack)             | for(_ <- ack) {

check!(*ack)                | for(count <- ack) {
@"stdoutAck"!(*count, *ack) | for(_ <- ack) {

increase!(*ack)             | for(_ <- ack) {

check!(*ack)                | for(count <- ack) {
@"stdoutAck"!(*count, *ack) | for(_ <- ack) {

reset!(*ack)                | for(count <- ack) {

check!(*ack)                | for(count <- ack) {
@"stdout"!(*count)

}}}}}}}}`,

savingsStarter:
`new openAccount in {
  // This contract registers a new account and creates its methods.
  contract openAccount(initialDeposit, deposit, withdraw, check) = {
    new balance in {
      balance!(*initialDeposit)
      |

      // Withdraw Contract
      contract withdraw(amount, ack) = {
        for (old <- balance) {
          balance!(*old - *amount) |
          ack!(0)
        }
      }

      // Deposit Contract

      // Check contract
    }
  }
  |

  // Customer Sarah creates an uses an account
  new sarahDeposit, sarahWithdraw, sarahCheck, ack in {
    openAccount!(10, *sarahDeposit, *sarahWithdraw, *sarahCheck) |
    sarahWithdraw!(3, *ack) |
    for (_ <- ack) {
      0// TODO check balance here
    }
  }
}`
}
