import React from "react";
import { createRoot } from "react-dom/client";

import Welcome from "./Welcome";

import "../common.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>
);
