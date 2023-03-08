# react-effect2

useEffect()のサンプル。
だったんだけど「onLoadの時にfetch()する」のを
**正しく**書くのは意外と面倒
(React18のStrictModeありがとう)。

参考: [React 18 useEffect Double Call for APIs: Emergency Fix \- DEV Community](https://dev.to/jherr/react-18-useeffect-double-call-for-apis-emergency-fix-27ee)

なので
[TanStack Query (旧: react-query)](https://tanstack.com/query/latest)
を使ってみたサンプルが追加されている。v4。

TanStack Query自体はhttpでGET、みたいな機能がぜんぜん無い、というのが凄い。stateライブラリに近い。
Promiseするfunctionをサポートしてくれるラッパーのような...
