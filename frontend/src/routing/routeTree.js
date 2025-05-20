
import { createRootRoute } from "@tanstack/react-router";
import RootLayout from "../RootLayout.jsx";
import { authRoute } from "./authRoute.js";
import { homePageRoute } from "./homepage.js";
import { dashboardRoute } from "./dashboard.js";
import { trackRoute } from "./trackRoute.js";

export const rootRoute = createRootRoute({
  component: RootLayout
});



export const routeTree = rootRoute.addChildren([
    homePageRoute,authRoute, dashboardRoute,trackRoute
]);