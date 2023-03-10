import Fetch from "./Fetch";

export default Fetch1();
export function Fetch1() {
  return (
    <>
      <h1>認証なしCORSなしテスト</h1>
      <Fetch url="/test.txt">public/test.txtを読んで表示。</Fetch>
      <Fetch url="/notexists.txt">存在しないURLを読んで表示(404 Not Foundになるはず)。</Fetch>
      <Fetch url="/test.json">public/test.jsonを読んで文字列化して表示。</Fetch>
    </>
  );
}
