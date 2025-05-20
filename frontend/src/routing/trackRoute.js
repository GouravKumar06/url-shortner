

import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import TrackPage from "../pages/TrackPage";

export const trackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/track",
  component: TrackPage
});