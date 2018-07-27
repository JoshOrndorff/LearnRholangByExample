var code = {

bound1:
`for (order <= @"coffeeShop") {
  @"stdout"!("Coffee Order Received")
}
`,

bound2:
`contract @"coffeeShop"(order) = {
  @"stdout"!("Coffee Order Received")
}
`,

newPizzaShop:
`new pizzaShop in {

  // Same contract as before
  contract pizzaShop(order) = {
    @"stdout"!("Order Received.")
  }
  |
  // Known customers can order because pizzaShop is bound here.
  pizzaShop!("Extra bacon please")
  |
  pizzaShop!("Hawaiian Pizza to go")
}
`,

pizzaAck:
`new pizzaShop in {

  // Now we take an order and an ack channel
  contract pizzaShop(order, ack) = {
    // Instead of acknowledging via stdout, we use ack
    ack!("Order Received.")
  }
  |
  // Known customers can order because pizzaShop is bound here.
  pizzaShop!("Extra bacon please", "alice")
  |
  pizzaShop!("Hawaiian Pizza to go", "bob")
}
`,

privateAck:
`new pizzaShop in {

  // Take orders and acknowledge them
  contract pizzaShop(order, ack) = {
    ack!("Order Received.")
  }
  |
  // Order a pizza and send a private ack channel.
  new alice in {
    pizzaShop!("One medium veggie pizza", *alice)
  }
}
`,

stdoutAck:
`new myAckChannel in {
  @"stdoutAck"!("Print some words.", *myAckChannel)
  |
  for (acknowledgement <- myAckChannel) {
    @"stdout"!("Received an acknowledgement.")
  }
}
`


}
