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

// App6
export function App6() {
  const q = useQuery<object | string, Error>({
    queryKey: ["hello"],
    queryFn: async ({ signal }) => fetchIt("/hello.json", { signal }),
  });

  return (
    <>
      <h1>App6</h1>
      <p>TanStack query (旧 react-query)を使う。App3にcancellation追加したもの。</p>
      <pre>{uqFmt(q)}</pre>
      <div>
        <button
          onClick={() => {
            q.refetch();
          }}
        >
          refetch
        </button>
      </div>
    </>
  );
}
