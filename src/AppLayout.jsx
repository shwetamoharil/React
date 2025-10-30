import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

export default AppLayout;
