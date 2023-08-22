import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Navbar, BigSidebar, SmallSidebar, Loading } from "../components";
import Wrapper from "../assets/wrappers/Dashboard";
import { useState, createContext, useContext } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

// create a context
const DashboardContext = createContext();

const DashboardLayout = ({ isDarkThemeEnabled }) => {
  // isDarkThemeEnabled passed in from App, check localStorage when the entire app renders
  const { user } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    // Will reuse the boolean value so assign it to a variable
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);

    // Save in local storage
    localStorage.setItem("darkTheme", newDarkTheme); // Once saved, the value is a string type, instead of boolean
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast.success("logging out", {
      icon: "👋",
      autoClose: 1000,
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleSidebar,
        toggleDarkTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          {/* Using CSS to hide one sidebar depending on screen size */}
          <BigSidebar />
          <SmallSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// Set up a custom hook to export, instead of exporting the main context
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
