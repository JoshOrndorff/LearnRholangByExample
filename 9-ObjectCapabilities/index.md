Recently we learned how bundles can be used for read- or write-only capabilities. We've also see how state channels can be used to store data.

In this lesson we'll build up a full example project that uses state channels, and object capabilities. Rather than using bundles directly, we'll see how unforgeable names can represent specific capabilities including read and write, but also much more like reset the counter or delete this facebook account.

Let's revisit the ATC example so that they can update the information

// Station stuff
contract @"createStation"(initialMessage, publicCh, updateCh) = {
  new currentMessage, tuneIn in {
    // Populate the initial message
    currentMessage!(initialMessage)
    |

    // Publish the listening channel for everyone
    publicCh!(tuneIn)

    // Owner can update the message anytime
    contract updateCh(newMessage) = {
      for (msg <- currentMessage) {
        currentMessage!(newMessage)
      }
    }
    |

    // User tunes in for latest message
    contract tuneIn(return) = {
      for (msg <- currentMessage){
        return!(msg)
        |
        currentMessage!(msg)
      }
    }
  }
}
|

// Owner creates new station
new updateCap in {
  @"createStation"!("Weather is nice", "airportInfo", *updateCap)
}
|
// Listener tunes in to receive latest message
@"airportInfo"!("stdout")

It may seem natural to use a read-only bundle for tuning into the station. However, if we use a bundle, then the first listener to receive the message, would consume it from the state channel. It wouldn't be left for other pilots to receive. In order to ensure that the message is persisted like we want, we handle all access to the stateChannel ourselves, and only give the pilots a capability to query our code for the the correct message.

## Method Dispatching
two techniques for methods (separate channel for each vs list of channel and method name)

### Exercise
Convert one to the other


## Creating ocaps
There are two techniques for creating an object capability, and we'll explore both here.

pass in name, contract builds cap on it
One advantage: If you ever need one to be on a public name

contract makes name, builds cap, passes it back

### Exercise
Convert one idiom to the other

## Design Patterns
Cite picture book of secure computation
implement a few
exercises to implement others

You have a remote garagedoor opener and want to let your neighbor store her bike in your garage. You want to give her access with her own remote, but also want to lock her out if something goes wrong in the future. Which common design pattern would be appropriate
revokable forwarder
???
???
???

## Abortable Rocket Launch
Back when we first learned the join operator we considered a scenario in which two operators must both give clearance to launch a rocket. We desired that they should also be able to retract the clearance.

This problem can be solved by giving the operator an abort button when they give their launch command.

[abortableLaunch.rho](abortableLaunch.rho)
