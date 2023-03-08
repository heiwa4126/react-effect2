import { useQuery } from "@tanstack/react-query";
import { fetchIt, objJStr } from "../libs/utils";

// App3
export function App3() {
  const q3 = useQuery<object | string>({
    queryKey: ["q3"],
    queryFn: () => fetchIt("/hello.json"),
  });

  if (q3.isLoading) return <>Loading...</>;

  if (q3.isError) {
    console.log(q3.error);
    return <>{(q3.error as any).message}</>;
  }

  return (
    <>
      <h1>App3</h1>
      <p>TanStack query (旧 react-query)を使う。</p>
      <pre>{objJStr(q3.data)}</pre>
    </>
  );
}
