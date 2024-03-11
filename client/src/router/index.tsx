import { ReactElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "App";
import Home from "../pages/Home";
import Error from "../pages/Error";
import DestinationShow from "../pages/DestinationShow";
import AllDestinations from "pages/AllDestinations";

interface Route {
    path: string,
    element: ReactElement,
    errorElement?: ReactElement,
    children?: Route[]
}

const routes: Route[] = [
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            { path: "", element: <Home /> },
            { path: "/destinations", element: <AllDestinations /> },
            { path: ":id", element: <DestinationShow /> }
        ]
    },
];

const router = createBrowserRouter(routes);

const Router = (): ReactElement => {
    return <RouterProvider router={router} />
};

export default Router;