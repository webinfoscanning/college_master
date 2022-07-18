import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store, { perstior } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={perstior}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
