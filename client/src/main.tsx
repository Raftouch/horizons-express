import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import "./i18n.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Forecast from "./components/Forecast.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/forecast", element: <Forecast /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
