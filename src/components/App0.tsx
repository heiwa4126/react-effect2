import { useEffect, useState } from "react";
import { getUrl } from "../libs/utils";

// App0 : a bad exeample
export function App0() {
  const [msg, setMsg] = useState("(none)");
  useEffect(() => {
    //
    console.log("app0 useEffect");
    fetch(getUrl("/hello.json"))
      .then((res) => res.json())
      .then((j) => {
        setMsg(j.msg);
      });
  }, []);

  return (
    <div>
      <h1>App0 (a bad example)</h1>
      <p>{msg}</p>
      <p>strictModeでfetchが2回呼ばれる。よくない</p>
    </div>
  );
}
