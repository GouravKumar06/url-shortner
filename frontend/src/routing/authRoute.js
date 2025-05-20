
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import LoginPage from "../pages/LoginPage";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: LoginPage
});