/**
 * 指定時間後にpromiseをresolveする関数
 * @param {number} [mSec=1000] 待ち時間
 * @return {*}  {Promise<unknown>}
 */
export async function delay(mSec: number = 1000): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, mSec));
}
/**
 * delay()があんまりなんで、結果を返すようにしたもの。
 * 「何か複雑な処理をしているつもり」関数。
 * @return {*}  {Promise<string>}
 */
export async function ultimateAnswer1(): Promise<string> {
  return delay2().then(() => {
    return "42";
  });
}

/**
 * 指定時間後にpromiseをresolveする関数。delay()と違ってキャンセル可能
 * @param {number} [mSec=2000] 待ち時間
 * @param {AbortSignal} [signal] 省略可能。
 * `const controller = new AbortController();` の controller.signal を与える。
 * キャンセルするには `controller.abort()`
 * @return {*}  {Promise<void>}
 */
export async function delay2(mSec: number = 2000, signal?: AbortSignal): Promise<void> {
  try {
    await new Promise<void>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        resolve();
      }, mSec);

      if (signal) {
        signal.addEventListener("abort", () => {
          clearTimeout(timeoutId);
          reject(new Error("delay2() aborted!"));
        });
      }
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 * 「何か複雑な処理をしているつもり」関数その2。キャンセル可能
 * @param {number} [mSec=2000] 待ち時間。delay2() 参照。
 * @param {AbortSignal} [signal] 省略可能。delay2() 参照。
 * @return {*}  {Promise<string>}
 */
export async function ultimateAnswer2(mSec: number = 2000, signal?: AbortSignal): Promise<string> {
  console.log("ultimateAnswer2() begin.");
  return delay2(mSec, signal).then(() => {
    return "42?";
  });
}
