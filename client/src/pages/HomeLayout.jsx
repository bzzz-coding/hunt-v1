import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      {/* children set up in createBrowserRouter will be displayed in <Outlet /> */}
      <Outlet />
    </>
  );
};
export default HomeLayout;
