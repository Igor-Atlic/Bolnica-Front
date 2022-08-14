import React from "react";
import "./styles.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { format } from "date-fns";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import GeneralStatsLink from "../../../components/GeneralStatsLink/GeneralStatsLink";
import { FaPlusCircle, FaUserNurse } from "react-icons/fa";

const AdminHomepage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("admin", 1)} />
      </div>
      <div style={{ marginLeft: "20%" }}>
        <Header
          avatarUrl={"nikolaSlika 1.jpg"}
          welcomeMsg={"Dobro jutro"}
          userName={"Dr. Paun"}
          userTitle={"Kardiolog"}
          day={format(new Date(), "d")}
          date={format(new Date(), "d MMMM, yyyy")}
        />
        <div className="components">
          <GeneralStatsLink
            image={<FaUserNurse size="45px" />}
            text={"Zaposleni"}
            path="/admin/employee-preview"
          />
          <GeneralStatsLink
            image={<FaPlusCircle size="45px" />}
            text={"Nov zaposleni"}
            path="/admin/register-employee"
          />
        </div>
      </div>
    </>
  );
};

export default AdminHomepage;
