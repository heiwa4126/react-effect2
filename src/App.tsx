// from https://javascript.plainenglish.io/react-18-useeffect-double-call-for-apis-emergency-fix-724b7ee6a646
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [app, setApp] = useState(0);
  return (
    <>
      <div>
        <button
          onClick={() => {
            setApp(0);
          }}
        >
          app0
        </button>
        <button
          onClick={() => {
            setApp(1);
          }}
        >
          app1
        </button>
        current={app}
      </div>
      {apps(app)}
    </>
  );
}

function apps(n: number) {
  switch (n) {
    case 0:
      return <App0 />;
    case 1:
      return <App1 />;
  }
  return <p>something wrong?</p>;
}

function getUrl(path: string): string {
  return new URL(document.URL).origin + path;
}

// App0 : a bad exeample
function App0() {
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

// App1 : a bad exeample
function App1() {
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

export default App;
