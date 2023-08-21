import { useDashboardContext } from "../pages/DashboardLayout";
import sidebarLinks from "../utils/sidebarLinks";
import { NavLink } from "react-router-dom";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();

  return (
    <div className="nav-links">
      {sidebarLinks.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (path === "admin" && role !== "admin") {
          return;
        }
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar} // Hide small sidebar when clicking on a NavLink
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
