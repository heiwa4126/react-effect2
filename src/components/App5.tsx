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

// App5
// https://tanstack.com/query/latest/docs/react/guides/query-cancellation
export function App5() {
  const query = useQuery<object>({
    queryKey: ["todos"],
    queryFn: async ({ signal }) => {
      const hello = await fetch("/hello.json", {
        // Pass the signal to one fetch
        signal,
      });
      return hello.json();
    },
  });

  return (
    <>
      <h1>App5</h1>
      <p>
        TanStack queryの中断。サンプルほぼそのまま。こう書けば
        <a href="https://developer.mozilla.org/ja/docs/Web/API/AbortSignal">AbortSignal()</a>
        を作って渡してくれるらしい。
      </p>
      <pre>{query.data ? objJStr(query.data) : "(undefined)"}</pre>
      <p>
        <a href="https://tanstack.com/query/v4/docs/react/guides/query-cancellation">
          Query Cancellation | TanStack Query Docs
        </a>
      </p>
    </>
  );
}
