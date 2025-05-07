import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/main-layout.tsx", [
    index("routes/user/home/App.tsx"),

    ...prefix("create", [index("routes/user/create/memorandum/App.tsx")]),
  ]),
  route("create/preview", "routes/user/create/memorandum/Preview.tsx"),
] satisfies RouteConfig;
