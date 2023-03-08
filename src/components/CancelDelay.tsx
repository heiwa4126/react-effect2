import { useState } from "react";

async function delay(mSec: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, mSec));
}

export function CancelDelay() {
  const [msg, setMsg] = useState("...");
  const onClick = async () => {
    setMsg("waiting...");
    await delay();
    setMsg("done!");
  };

  return (
    <>
      <h1>CancelDelay</h1>
      <p>1秒後にpromiseを返す。途中で止められないし、ボタンの連打も防げない。</p>
      <p>status: {msg}</p>
      <div>
        <button onClick={onClick}>start</button>
      </div>
    </>
  );
}
