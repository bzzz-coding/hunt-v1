// Need to import React so that we can add react icons as values of objects; for the same reason, this is a .jsx file instead of a js file
import React from "react";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";

const sidebarLinks = [
  {
    text: "add job",
    path: ".", // or '/dashboard', for the index child
    icon: <FaWpforms />,
  },
  {
    text: "all jobs",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    text: "stats",
    path: "stats",
    icon: <IoBarChartSharp />,
  },
  {
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    text: "admin",
    path: "admin",
    icon: <MdAdminPanelSettings />,
  },
];

export default sidebarLinks;
