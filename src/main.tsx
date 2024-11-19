import React from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthProvider";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
