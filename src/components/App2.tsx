import { useQuery } from "@tanstack/react-query";

// App2
// sample from https://tanstack.com/query/latest/docs/react/overview
export function App2() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch("https://api.github.com/repos/tannerlinsley/react-query").then((res) => res.json()),
    useErrorBoundary: true,
  });

  if (isLoading) return <>Loading...</>;

  if (isError) {
    console.log(error);
    return <>An error has occurred: + {(error as any).message}</>;
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong> <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
