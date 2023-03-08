// from https://javascript.plainenglish.io/react-18-useeffect-double-call-for-apis-emergency-fix-724b7ee6a646
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";
import { App0 } from "./components/App0";
import { App1 } from "./components/App1";
import { App2 } from "./components/App2";
import { App3 } from "./components/App3";
import { App4 } from "./components/App4";
const queryClient = new QueryClient();

function apps(n: number) {
  switch (n) {
    case 0:
      return <App0 />;
    case 1:
      return <App1 />;
    case 2:
      return <App2 />;
    case 3:
      return <App3 />;
    case 4:
      return <App4 />;
  }
  return <p>something wrong?</p>;
}

function Nav() {
  const [app, setApp] = useState(4);
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
        <button
          onClick={() => {
            setApp(2);
          }}
        >
          app2
        </button>
        <button
          onClick={() => {
            setApp(3);
          }}
        >
          app3
        </button>
        <button
          onClick={() => {
            setApp(4);
          }}
        >
          app4
        </button>
        current={app}
      </div>
      {apps(app)}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
    </QueryClientProvider>
  );
}

export default App;
