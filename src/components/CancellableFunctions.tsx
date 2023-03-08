import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { delay, delay2, ultimateAnswer1, ultimateAnswer2 } from "../libs/delay";

export default CancellableFunctions;
function CancellableFunctions() {
  return (
    <>
      <h1>Cancellable async Functions</h1>
      <p>中断可能なasync関数を作る練習</p>
      <CF4 />
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

// いちばんありがちなパターン。あとで外だしにする
function uqFmt(uq: UseQueryResult<string>): string {
  if (uq.isLoading) return "Loading...";
  if (uq.isError) {
    console.log(uq.error);
    return (uq.error as Error).message;
  }
  return uq.data;
}

function CF4() {
  const q = useQuery<string, Error>({
    queryKey: ["ultimateAnswer2"],
    queryFn: async ({ signal }) => ultimateAnswer2(3000, signal),
  });

  return (
    <>
      <h2>CF4</h2>
      <p>
        TanStack query で「究極の答え」をコンポーネントがレンダリングされた時に計算する(3秒後に計算終了)。
        <br />
        strict modeだと、1回アボートされるのが見えるはず(コンソール参照)。
      </p>
      <pre>{uqFmt(q)}</pre>
    </>
  );
}
