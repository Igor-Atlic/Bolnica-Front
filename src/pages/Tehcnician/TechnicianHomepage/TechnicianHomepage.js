import React, { useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import GeneralStatsLink from "../../../components/GeneralStatsLink/GeneralStatsLink";
import { useDispatch } from "react-redux";
import { FaUserInjured, FaClipboardList } from "react-icons/fa";
import { GiMedicalPack } from "react-icons/gi";
import { resetUser } from "../../../redux/actions/auth";
import { useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import HeaderRight from "../../../components/HeaderRight/HeaderRight";
import "./styles.css";

const TechnicianHomepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const doctor = JSON.parse(localStorage.getItem("loggedUser"));
            dispatch(resetUser());
        } else navigate("/login");
    }, []);*/

  const headerProps = {
    userName: "Dr. Paun",
    userTitle: "Lab Tehnicar",
  };

  const generalStatsProps = [
    {
      image: <GiMedicalPack size="45px" />,
      text: "Zakazivanje posete",
    },
    {
      image: <FaUserInjured size="45px" />,
      text: "Prijem pacijenata",
    },
    {
      image: <FaClipboardList size="45px" />,
      text: "Izdavanje rezultata",
    },
  ];

  return (
    <>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("technician", 1)} />
      </div>
      <div style={{ marginLeft: "20%" }}>
        <div className="flexRow" style={{ marginLeft: "83%" }}>
          <HeaderRight
            userName={headerProps.userName}
            userTitle={headerProps.userTitle}
          />
        </div>
        <div className="components">
          <GeneralStatsLink
            image={generalStatsProps[0].image}
            text={generalStatsProps[0].text}
            path="/technician/visits"
          />
          <GeneralStatsLink
            image={generalStatsProps[1].image}
            text={generalStatsProps[1].text}
            path="/technician/patient-admission"
          />
          <GeneralStatsLink
            image={generalStatsProps[2].image}
            text={generalStatsProps[2].text}
            path="/technician/issuing-results"
          />
        </div>
      </div>
    </>
  );
};

export default TechnicianHomepage;
