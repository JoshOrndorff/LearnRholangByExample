# Going Off Chain

So far all of our exercises have existed entirely inside the world of rholang. While rholang is meant to be a general-purpose programming language, it's current role is as a blockchain language. Many wonderful smart contracts are being written in rholang . But people don't live their whole lives on-chain. They also go outside and ply, eat dinner, and go to concerts. And while they're away doing those real-world things, they need a place to store their unforgeable names. Because unforgeable names can only exist on the blockchain.

<!-- Julie drawing of unforgeable name not allowed to cross some line. -->



## Name Registry
The name registry provides a partial solution to the problem. To register a name follow this example.
[insertArbitrary.rho](insertArbitrary.rho)


To look a name up to use it later, try this
[lookup.rho](lookup.rho)

There is also a feature called `insertSigned` which allows contract publishers to later update their contracts, but I have security concerns about it, so I won't document it here.

## Cryptography
The name registry got us close to what we need. The remaining challenge is that now that names can be made publicly accessible, how do we ensure that only authorized personnel have access to sensative contracts? Cryptography to the rescue!



TODO This section is incomplete

Rholang has primitives for hashing and signature verification

Show how to do a simple signature verified contract on a public name
Link to RSign and RChain-API
