import { useRef, useState } from "react";
import { delay, delay2, ultimateAnswer1 } from "../libs/delay";

export default CancellableFunctions;
function CancellableFunctions() {
  return (
    <>
      <h1>Cancellable async Functions</h1>
      <p>中断可能なasync関数を作る練習</p>
      <CF3 />
      <CF2 />
      <CF1 />
    </>
  );
}

function CF1() {
  const [msg, setMsg] = useState("...");
  const onClick = async () => {
    setMsg("waiting...");
    await delay();
    setMsg("done!");
  };

  return (
    <>
      <h2>CF1</h2>
      <p>1秒後にpromiseを返す。途中で止められないし、ボタンの連打も防げない。</p>
      <p>status: {msg}</p>
      <div>
        <button onClick={onClick}>start</button>
      </div>
    </>
  );
}

function CF2() {
  const [msg, setMsg] = useState("...");
  const onClick = async () => {
    setMsg("waiting...");
    const s = await ultimateAnswer1();
    setMsg(s);
  };

  return (
    <>
      <h2>CF2</h2>
      <p>1秒後にpromiseを返す。途中で止められないし、ボタンの連打も防げない。</p>
      <p>status: {msg}</p>
      <div>
        <button onClick={onClick}>start</button>
      </div>
    </>
  );
}

function CF3() {
  const controller = useRef<AbortController | null>();
  const [msg, setMsg] = useState("...");
  const onClick = async () => {
    setMsg("waiting...");
    controller.current = new AbortController();
    delay2(2000, controller.current.signal)
      .then(() => {
        setMsg("done!");
        controller.current = null;
      })
      .catch((e: any) => {
        setMsg(e.message);
        controller.current = null;
      });
  };

  return (
    <>
      <h2>CF3</h2>
      <p>
        2秒後にpromiseを返す。キャンセル可能。ボタンの連打は防げない。
        <br />
        御覧の通りけっこう複雑。
      </p>
      <p>status: {msg}</p>
      <div>
        <button onClick={onClick}>start</button>
        <button
          onClick={() => {
            if (controller.current) {
              controller.current.abort();
            } else {
              setMsg("not running...");
            }
          }}
        >
          abort
        </button>
      </div>
    </>
  );
}
