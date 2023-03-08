/**
 * fetch()を少しwrapしたもの
 * @param {string} url
 * @param {object} [option]
 * @return {*}  {(Promise<object | string>)}
 */
export async function fetchIt(url: string, option?: object): Promise<object | string> {
  let res: Response;
  try {
    res = await fetch(url, option);
  } catch (e: any) {
    throw new Error(e.message);
  }
  if (!res.ok || res.status !== 200) {
    // 200以外ならエラーがあればエラー文字列を例外として投げる
    throw new Error(res.status + " " + res.statusText);
  }
  const s = await res.text();
  try {
    // JSONとして読めればオブジェクト化して返す
    return JSON.parse(s);
  } catch {
    // JSONとして評価できなければ得たstringをそのまま返す
    return s;
  }
}

export function jstr(o: any): string {
  return JSON.stringify(o, null, "  ");
}

export function objJStr(s: string | object): string {
  if (typeof s === "string") {
    return s;
  }
  return jstr(s);
}
export function getUrl(path: string): string {
  return new URL(document.URL).origin + path;
}
