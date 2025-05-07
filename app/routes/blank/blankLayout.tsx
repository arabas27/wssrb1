import { Provider } from "react-redux";
import { Outlet } from "react-router";
import { store } from "~/store/store";

export default function blankLayout() {
  return <Outlet />;
}
