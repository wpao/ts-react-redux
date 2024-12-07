import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import { reducers } from "./store/store.ts";

const globalStore = legacy_createStore(reducers);

createRoot(document.getElementById("root")!).render(
  <Provider store={globalStore}>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);

// ------------------
// fitur yang akan datang (tentang router)

// // mengaktifkan versi terbaru react-router-dom
// import { Future } from "react-router"; // kata Future hanya perumpamaan

// // Aktifkan future flag `v7_startTransition`
// Future.enable({ v7_startTransition: true });
