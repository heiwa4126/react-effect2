import { useEffect, useState } from "react";
import { getUrl } from "../libs/utils";

// App1
export function App1() {
  const [msg, setMsg] = useState("(none)");
  useEffect(() => {
    // strictModeで2回呼ばれるが、fetchをちゃんと取り消す。
    // エラーは表示されるが正しい動作。
    const controller = new AbortController();
    console.log("app1 useEffect");
    fetch(getUrl("/hello.json"), {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((j) => {
        setMsg(j.msg);
      });
    return () => controller.abort();
  }, []);

  return (
    <div>
      <h1>App1</h1>
      <p>{msg}</p>
      <p>strictModeで2回呼ばれるが、fetchをちゃんと取り消す。エラーは表示されるが正しい。</p>
    </div>
  );
}
