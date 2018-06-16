var code = {

pizzaOrder:
`@"pizzaShop"!("2 medium pies")
|
for(order <- @"pizzaShop"){
  @"stdout"!("Order Received.")
}
`,

coffeeShop:
`contract @"coffeeShop"(order) = {
  @"stdout"!("Coffee Order Received")
}
|
@"coffeeShop"!("one hot chocolate")
|
@"coffeeShop"!("two large latte's please")
`,

persistentCoffeeShop:
`for (order <= @"coffeeShop") {
  @"stdout"!("Coffee Order Received")
}
|
@"coffeeShop"!("one hot chocolate")
|
@"coffeeShop"!("two large latte's please")
`
}
