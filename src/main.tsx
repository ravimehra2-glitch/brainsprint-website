import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { initAnalytics } from "./lib/analytics";

// Restores the originally requested path if the visitor was bounced through
// public/404.html (used by static hosts without SPA rewrite support).
const redirectPath = sessionStorage.getItem("redirect-path");
if (redirectPath) {
  sessionStorage.removeItem("redirect-path");
  window.history.replaceState(null, "", redirectPath);
}

initAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
