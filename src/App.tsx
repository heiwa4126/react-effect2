// from https://javascript.plainenglish.io/react-18-useeffect-double-call-for-apis-emergency-fix-724b7ee6a646
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { App0 } from "./components/App0";
import { App1 } from "./components/App1";
import { App2 } from "./components/App2";
import { App3 } from "./components/App3";
import { App4 } from "./components/App4";
import { App5 } from "./components/App5";
import { App6 } from "./components/App6";
import AppSelector from "./components/AppSelector";
import CancellableFunctions from "./components/CancellableFunctions";

function App() {
  const apps = [App0, App1, App2, App3, App4, App5, App6, CancellableFunctions];
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AppSelector apps={apps} init={apps.length - 1} />
    </QueryClientProvider>
  );
}

export default App;
