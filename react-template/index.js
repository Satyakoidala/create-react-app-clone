import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/App";

const domRoot = document.getElementById("root");

if (domRoot) {
	const root = createRoot(domRoot);
	root.render(<App />);
}
