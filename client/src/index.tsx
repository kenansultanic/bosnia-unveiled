import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "store";
import Router from "router";

const root = createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Provider store={store}>
        <Router />
    </Provider>
);