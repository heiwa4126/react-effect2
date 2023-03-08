import { useState } from "react";

/**
 * 指定時間後にpromiseをresolveする関数
 * @param {number} [mSec=1000] 待ち時間
 * @return {*}  {Promise<unknown>}
 */
async function delay(mSec: number = 1000): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, mSec));
}

/**
 * delay()があんまりなんで、結果を返すようにしたもの
 * @return {*}  {Promise<string>}
 */
async function d2(): Promise<string> {
  return delay().then(() => {
    return "done!";
  });
}

export default function CancelDelay() {
  return (
    <>
      <h1>CancelDelay</h1>
      <CD2 />
      <CD1 />
    </>
  );
}

function CD1() {
  const [msg, setMsg] = useState("...");
  const onClick = async () => {
    setMsg("waiting...");
    await delay();
    setMsg("done!");
  };

  return (
    <>
      <h2>CD1</h2>
      <p>1秒後にpromiseを返す。途中で止められないし、ボタンの連打も防げない。</p>
      <p>status: {msg}</p>
      <div>
        <button onClick={onClick}>start</button>
      </div>
    </>
  );
}

function CD2() {
  const [msg, setMsg] = useState("...");
  const onClick = async () => {
    setMsg("waiting...");
    const s = await d2();
    setMsg(s);
  };

  return (
    <>
      <h2>CD2</h2>
      <p>1秒後にpromiseを返す。途中で止められないし、ボタンの連打も防げない。</p>
      <p>status: {msg}</p>
      <div>
        <button onClick={onClick}>start</button>
      </div>
    </>
  );
}
