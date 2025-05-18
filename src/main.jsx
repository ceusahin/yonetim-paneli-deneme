import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import PanelApp from "./panel/PanelApp";
import SiteApp from "./site/SiteApp";
import "./index.css";

function Root() {
  const [mode, setMode] = useState("site"); // 'site' veya 'panel'

  return mode === "panel" ? (
    <PanelApp onSwitch={() => setMode("site")} />
  ) : (
    <SiteApp onSwitch={() => setMode("panel")} />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
