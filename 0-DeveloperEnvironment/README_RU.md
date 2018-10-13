# Подготовка среды разработки

Нам понадобится среда разработки, чтобы запускать примеры из туториала. Перечисленные способы -- далеко не полное описание всех инструментов для разработки на ро. Ниже мы предлагаем несколько инстументов, с которых можно начать изучение языка.

## Онлайн интерпретатор
Сообщество RChain поддерживает публичный веб-сервер, на котором размещен  [онлайн интерпретатор ро](http://rchain.cloud). Это очень доступный инструмент, использование которого не требует никакой предварительной подготовки. 

## Локальная нода
Самый правительный и проверенный путь исполнять код, написанный на ро, -- установить собственную ноду `rnode` и использовать интерпретатор на ней. Для этого нужно следовать инструкции [по установке](https://rchain.atlassian.net/wiki/spaces/CORE/pages/428376065/User+guide+for+running+RNode) для вашей платформе.

Самый простой способ для новичков - это установить ноду на облаке [AWS](https://blog.rchain.coop/running-rnode-0-5-3-on-amazon-ec2/) или у другого поставщика вычислительных услуг при помощи [Docker](https://blog.rchain.coop/running-rnodev-0-6-x-with-docker/).

После установки вы можете запустить отдельностоящую ноду следующей командой:
```
$ rnode run -s -n
```

В другом терминале мы можем запускать по строчке кода за раз в режиме REPL (read execute print loop).
```
$ rnode repl

  ╦═╗┌─┐┬ ┬┌─┐┬┌┐┌  ╔╗╔┌─┐┌┬┐┌─┐  ╦═╗╔═╗╔═╗╦  
  ╠╦╝│  ├─┤├─┤││││  ║║║│ │ ││├┤   ╠╦╝║╣ ╠═╝║  
  ╩╚═└─┘┴ ┴┴ ┴┴┘└┘  ╝╚╝└─┘─┴┘└─┘  ╩╚═╚═╝╩  ╩═╝

rholang $ Nil

Deployment cost: CostAccount(0,Cost(0))
Storage Contents:
 for( x0, x1 <= @{Unforgeable(0x01)} ) { Nil } | for( x0, x1, x2, x3 <= @{"secp256k1Verify"} ) { Nil } | for( x0, x1 <= @{"sha256Hash"} ) { Nil } | for( x0, x1 <= @{Unforgeable(0x03)} ) { Nil } | for( x0, x1, x2, x3 <= @{"ed25519Verify"} ) { Nil } | for( x0, x1 <= @{"blake2b256Hash"} ) { Nil } | for( x0 <= @{Unforgeable(0x02)} ) { Nil } | for( x0 <= @{Unforgeable(0x00)} ) { Nil } | for( x0, x1 <= @{"keccak256Hash"} ) { Nil }

rholang $ @"world"!("hello")

Deployment cost: CostAccount(5,Cost(64))
Storage Contents:
 @{"world"}!("hello") | for( x0, x1 <= @{Unforgeable(0x01)} ) { Nil } | for( x0, x1, x2, x3 <= @{"secp256k1Verify"} ) { Nil } | for( x0, x1 <= @{"sha256Hash"} ) { Nil } | for( x0, x1 <= @{Unforgeable(0x03)} ) { Nil } | for( x0, x1, x2, x3 <= @{"ed25519Verify"} ) { Nil } | for( x0, x1 <= @{"blake2b256Hash"} ) { Nil } | for( x0 <= @{Unforgeable(0x02)} ) { Nil } | for( x0 <= @{Unforgeable(0x00)} ) { Nil } | for( x0, x1 <= @{"keccak256Hash"} ) { Nil }
```

Когда вы захотите запускать более длинные сегменты кода (а это случится очень скоро), то можно выполнять код в несколько срочек в режиме eval. Не забудьте указать путь к файлу с кодом с расширением `.rho`.

```
$ rnode eval intersection.rho
Evaluating from intersection.rho

Result for intersection.rho:
Deployment cost: CostAccount(39,Cost(1132))
Storage Contents:
 @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)}!(@{"name"}!(Nil)) | @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)}!(@{"age"}!(Nil)) | @{"world"}!("hello") | for( x0, x1 <= @{Unforgeable(0x01)} ) { Nil } | for( x0, x1, x2, x3 <= @{"secp256k1Verify"} ) { Nil } | for( x0, x1 <= @{"sha256Hash"} ) { Nil } | for( @{{@{"name"}!(_) | _ /\ @{"age"}!(_) | _}} <= @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)} ) { @{Unforgeable(0x00)}!("Both name and age were in the data") } | for( x0, x1 <= @{Unforgeable(0x03)} ) { Nil } | for( x0, x1, x2, x3 <= @{"ed25519Verify"} ) { Nil } | for( x0, x1 <= @{"blake2b256Hash"} ) { Nil } | for( x0 <= @{Unforgeable(0x02)} ) { Nil } | for( x0 <= @{Unforgeable(0x00)} ) { Nil } | for( x0, x1 <= @{"keccak256Hash"} ) { Nil }
```

Часть ответа ноды появляется в том же терминале, где вы запускали код. Другая часть там, где вы запускали ноду, т.е. в первом терминале. Обязательно проверяйте оба окна, пока не освоитесь, где появляется какая часть. 

## Cryptofex IDE
Pyrofex готовится выпустить среду разработки приложений на платформах RChain и Etherium под названием [cryptofex](https://cryptofex.io/). Сейчас она находится в alpha стадии. При помощи этого IDE можно создавать не только dApp для RChain, но и смартконтракты для EVM.

## Плагин для IntelliJ IDEA
[Он](https://plugins.jetbrains.com/plugin/9833-rholang) подходит и для других редакторов и сред разработки, включая PhpStorm, AppCode, GoLand, Android Studio и др. Предлагает подсветку систаксиса и другие полезные при написании программ фичи.
