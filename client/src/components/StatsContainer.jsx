import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";
import StatsItem from "./StatsItem";

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: "pending applications",
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: "#f59e0b",
      bg: "#fef3c7",
    },
    {
      title: "interview scheduled",
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bg: "#e0e8f9",
    },
    {
      title: "declined",
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: "#d66a6a",
      bg: "#ffeeee",
    },
  ];
  return (
    <Wrapper>
      {stats.map((jobStatus) => {
        return <StatsItem key={jobStatus.title} {...jobStatus} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
