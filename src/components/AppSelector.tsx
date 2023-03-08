import { createElement, useState } from "react";

interface Props {
  apps: (() => JSX.Element)[];
  init?: number;
}

function AppSelector({ apps, init }: Props) {
  console.log("AppSelector render");
  const [appNr, setAppNr] = useState(init ?? 0);
  return (
    <>
      <div>
        {apps.map((app, i) => (
          <button key={i} onClick={() => setAppNr(i)} style={{ fontWeight: i === appNr ? "800" : "normal" }}>
            {app.name}
          </button>
        ))}
      </div>
      <div>{createElement(apps[appNr])}</div>
    </>
  );
}

export default AppSelector;
