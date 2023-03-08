import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchIt, objJStr } from "../libs/utils";

// いちばんありがちなパターン。あとで外だしにする
function uqFmt(uq: UseQueryResult<string | object, Error>): string | JSX.Element {
  if (uq.isLoading) return "Loading...";
  if (uq.isError) {
    console.log(uq.error);
    return uq.error.message;
  }
  return objJStr(uq.data);
}

// App3
export function App3() {
  const q3 = useQuery<object | string, Error>({
    queryKey: ["q3"],
    queryFn: () => fetchIt("/hello.json"),
    // デフォルトだと、エラーの場合リトライする
  });

  return (
    <>
      <h1>App3</h1>
      <p>TanStack query (旧 react-query)を使う。</p>
      <pre>{uqFmt(q3)}</pre>
    </>
  );
}
