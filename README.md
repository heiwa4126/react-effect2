# react-effect2

useEffect()のサンプル。
だったんだけど「onLoad の時に fetch()する」のを
**正しく書く**のは意外と面倒
(React 18 の StrictMode ありがとう)。

参考: [React 18 useEffect Double Call for APIs: Emergency Fix - DEV Community](https://dev.to/jherr/react-18-useeffect-double-call-for-apis-emergency-fix-27ee)

なので
[TanStack Query (旧: react-query)](https://tanstack.com/query/latest)
を使ってみたサンプルが追加されている。v4。

TanStack Query 自体は http で GET、みたいな機能がぜんぜん無い、というのが凄い。state ライブラリに近い。
Promise する function をサポートしてくれるラッパーのような...

上記ホームページの機械翻訳:

> TS/JS、React、Solid、Vue、Svelteに対応した強力な非同期状態管理機能
きめ細かな状態管理、手動での再フェッチ、延々と続く非同期スパゲッティコードを捨て去りましょう。
TanStack Query は、宣言的で常に最新の自動管理されたクエリとミューテーションを提供し、開発者とユーザーの両方の体験を直接改善します。

最初読んでも意味不明だったが、使ってみるとよくわかる。
