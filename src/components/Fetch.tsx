import { useState } from "react";
import { fetchIt, objJStr } from "../libs/utils";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface Props {
  url: string;
  title?: string;
  option?: object;
  children?: string | JSX.Element;
}

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

function Fetch(props: Props) {
  const [f, setF] = useState(false);
  const q = useQuery<object | string, Error>({
    queryKey: [props.url],
    queryFn: async ({ signal }) => fetchIt(props.url, { ...Option, signal }),
    enabled: f, // コンポーネントのマウント時にクエリを実行しない
    staleTime: 5 * 60 * 1000, // 5分は最後に取ったものを表示する
  });

  return (
    <div className="Fetch">
      <h2>{props?.title ?? props.url}</h2>
      {props?.children}
      <div>
        <button
          disabled={f}
          onClick={() => {
            setF(true);
          }}
        >
          fetch
        </button>
        <button
          disabled={!q.isSuccess}
          onClick={() => {
            q.remove();
            setF(false);
          }}
        >
          clear
        </button>
      </div>
      <pre>{uqFmt(q)}</pre>
    </div>
  );
}

export default Fetch;
