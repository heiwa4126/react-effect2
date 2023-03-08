import { useEffect, useRef, useState } from "react";
import { fetchIt, objJStr } from "../libs/utils";

// App4
export function App4() {
  const [data, setData] = useState<object | string>("loading...");
  const f = useRef(false);
  useEffect(() => {
    if (f.current) return;
    f.current = true;
    fetchIt("/hello.json")
      .then((res) => {
        setData(res);
        f.current = false;
      })
      .catch((e) => {
        setData(e.message);
        f.current = false;
      });
  }, []);

  return (
    <>
      <h1>App4</h1>
      <p>TanStack query (旧 react-query)を使わないでApp3と同じものを書くのは意外と難しい。</p>
      <pre>{objJStr(data)}</pre>
    </>
  );
}
