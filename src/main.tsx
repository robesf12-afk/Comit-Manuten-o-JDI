import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import DDM from "./pages/DDM";
import Treinamentos from "./pages/Treinamentos";
import OnePager from "./pages/OnePager";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/ddm", element: <DDM /> },
  { path: "/treinamentos", element: <Treinamentos /> },
  { path: "/onepager", element: <OnePager /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
