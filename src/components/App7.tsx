import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useState } from "react";
import { fetchIt, objJStr } from "../libs/utils";

// いちばんありがちなパターン。あとで外だしにする
function uqFmt(q: UseQueryResult<string | object, Error>): string | JSX.Element {
  if (q.isFetching) return `Fetching... state=(${q.status})`;
  if (q.isError) {
    console.log(q.error);
    return q.error.message;
  }
  if (!q.data) return "....";
  return objJStr(q.data);
}

export function App7() {
  const [f, setF] = useState(false);
  const q = useQuery<object | string, Error>({
    queryKey: ["hello"],
    queryFn: () => fetchIt("/hello.json"),
    enabled: f, // コンポーネントのマウント時にクエリを実行しない
  });

  return (
    <>
      <h1>App7</h1>
      <p>TanStack query v4でコンポーネントのマウント時にクエリを実行しない。</p>
      <pre>{uqFmt(q)}</pre>
      <div>
        <button
          disabled={f}
          onClick={() => {
            setF(true);
          }}
        >
          load
        </button>
        <button
          disabled={!q.isSuccess}
          onClick={() => {
            q.remove();
            setF(false);
          }}
        >
          remove
        </button>
      </div>
      <p>
        参照:
        <a href="https://tanstack.com/query/v4/docs/react/guides/disabling-queries">Disabling/Pausing Queries | TanStack Query Docs</a>
      </p>
    </>
  );
}
