# 개발 환경 설정

이 튜토리얼에서 rholang snippet을 실행하려면, 당신은 어떤 종류의 개발 환경이 필요합니다. 이것은 rholang 개발 도구나 스택에 대한 완벽한 지침은 아닙니다. 오히려, 그것은 여러분을 시작하기 위한 몇 가지 일반적인 기본 개발 환경을 보여줍니다.

## RChain 클라우드
RChain 커뮤니티의 구성원들은 공개 웹 기반 [온라인 rholang transver] (http://rchain.cloud) ([mmir]) (https://rchain cloud)을 제공합니다. inblock.io)). 이 도구는 시작하는 가장 쉬운 방법이며 소프트웨어를 설치할 필요가 없습니다.

## Cryptofex IDE
Pyrofex는 [cryptofex](https://cryptofex.io/).이라 불리는 유망한 통합 개발 환경을 개발하고 있습니다. Cryptofex는 기본적으로 창, Mac 및 리눅스/에서 실행됩니다. 그것은 rholang 구문 강조를 제공하며 rholang 코드를 내부적으로 또는 실행 중인 RNode로 평가할 수 있습니다. IDE는 또한 외래 개발을 지원합니다.

경고: 2018년 10월 현재 Cryptofex는 구문 오류가 발생할 때 올바른 라인 번호를 보고하지 않습니다. 이것은 꽤 절망적일 수 있습니다.

## 로컬 노드
rholang 코드를 실행하기 위해 시도하고 참된 방법은 당신의 지역 RNode를 시작하고 그것의 rholang 통역기를 사용하는 것입니다. 먼저, 플랫폼에 대해 [ RNode](https://rchain.atlassian.net/wiki/spaces/CORE/pages/428376065/User+guide+for+running+RNode)을(를) 설치해야 합니다.

초보 학습자의 경우 [AWS](https://blog.rchain.coop/running-rnode-0-5-3-on-amazon-ec2/) 또는 [Docker](https://blog.rchain.coop/running-rnodev-0-6-x-with-docker/).을 사용하여 노드를 설정하는 단계별 가이드를 참조하세요.

RNode가 설치되면 기본 독립 실행형 노드를 실행할 수 있습니다
```
$rnode run -s -n
```

별도의 터미널에서 RNode의 eval 모드를 사용하여 코드를 평가할 수 있다.

```
$rnode eval intersection.rho.
Result for intersection.rho:
Deployment cost: CostAccount(39,Cost(1132))
Storage Contents:
 @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)}!(@{"name"}!(Nil)) | @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)}!(@{"age"}!(Nil)) | @{"world"}!("hello") | for( x0, x1 <= @{Unforgeable(0x01)} ) { Nil } | for( x0, x1, x2, x3 <= @{"secp256k1Verify"} ) { Nil } | for( x0, x1 <= @{"sha256Hash"} ) { Nil } | for( @{{@{"name"}!(_) | _ /\ @{"age"}!(_) | _}} <= @{Unforgeable(0xb19519ab773d1ec4ce96f1b71b748552e4a084dfc9942371717f5cb87e818879)} ) { @{Unforgeable(0x00)}!("Both name and age were in the data") } | for( x0, x1 <= @{Unforgeable(0x03)} ) { Nil } | for( x0, x1, x2, x3 <= @{"ed25519Verify"} ) { Nil } | for( x0, x1 <= @{"blake2b256Hash"} ) { Nil } | for( x0 <= @{Unforgeable(0x02)} ) { Nil } | for( x0 <= @{Unforgeable(0x00)} ) { Nil } | for( x0, x1 <= @{"keccak256Hash"} ) { Nil }
```

RNode의 출력 중 일부는 코드를 실행하는 동일한 터미널에 표시됩니다. 그러나 다른 출력은 노드(첫 번째 단자)에서 직접 나옵니다. 따라서 표시되는 출력에 익숙해질 때까지 두 위치를 모두 확인하세요.