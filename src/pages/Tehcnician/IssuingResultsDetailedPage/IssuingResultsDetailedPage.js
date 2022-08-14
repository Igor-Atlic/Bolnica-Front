import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import { useLocation } from "react-router";
import { format } from "date-fns";
import Table from "../../../components/Table/Table";
import { getTableHeaders } from "../../../commons/tableHeaders";
import {
  getAnalysisResults,
  saveAnalysisResult,
} from "../../../redux/actions/analysisResults";
import { getEmployees } from "../../../redux/actions/employee";
import { verifyReport } from "../../../redux/actions/labReports";

const DoctorHomepage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const analysisResults = useSelector((state) => state.analysisResults);
  const employees = useSelector((state) => state.employees);
  const [tableContent, setTableContent] = useState([]);
  const [results, setResults] = useState([]);
  const [labReportId, setLabReportId] = useState();

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    dispatch(getAnalysisResults(pathParts[pathParts.length - 1]));
    dispatch(getEmployees());
    setLabReportId(pathParts[pathParts.length - 1]);
  }, []);

  useEffect(() => {
    if (
      analysisResults &&
      analysisResults.rezultatiAnaliza &&
      employees &&
      employees.length > 0
    ) {
      const user = JSON.parse(localStorage.getItem("loggedUser"));
      const biochemist = employees.find(
        (employee) => employee.lbz === user.LBZ
      );
      setTableContent(
        analysisResults.rezultatiAnaliza.map((rezultatAnalize) => {
          return {
            ...rezultatAnalize.analiza,
            ...rezultatAnalize.parametar,
            ...rezultatAnalize.rezultat,
            ...biochemist,
          };
        })
      );
    }
  }, [analysisResults, employees]);

  useEffect(() => {
    setResults(
      tableContent.map((content) => {
        return { parametarId: content.parametarId, rezultat: "" };
      })
    );
  }, [tableContent]);

  const onResultChange = (event, entry) => {
    setResults(
      results.map((result) => {
        if (result.parametarId === entry[1][1]) {
          return { ...result, rezultat: event.target.value };
        } else return result;
      })
    );
  };

  const handleClick = (entry) => {
    const resultToUpdate = results.find(
      (result) => result.parametarId === entry[1][1]
    );
    dispatch(saveAnalysisResult({ nalogId: labReportId, ...resultToUpdate }));
  };

  const handleVerify = () => {
    const emptyResult = results.find((result) => result.rezultat === "");
    console.log(emptyResult);
    if (emptyResult) {
      // modal za gresk
    } else {
      dispatch(verifyReport(labReportId));
    }
  };

  const headerProps = {
    avatarUrl: "nikolaSlika 1.jpg",
    welcomeMsg: "Dobro jutro",
    userName: "Dr. Paun",
    userTitle: "Kardiolog",
  };
  console.log(tableContent);
  return (
    <>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("technician", -1)} />
      </div>
      <div style={{ marginLeft: "20%" }}>
        <Header
          avatarUrl={headerProps.avatarUrl}
          welcomeMsg={headerProps.welcomeMsg}
          userName={headerProps.userName}
          userTitle={headerProps.userTitle}
          day={format(new Date(), "d")}
          date={format(new Date(), "d MMMM, yyyy")}
        />
        <Table
          headers={getTableHeaders("issuingResults")}
          tableContent={tableContent}
          tableType="issuingResults"
          handleClick={handleClick}
          onResultChange={onResultChange}
          handleRowClick={() => {}}
        />
      </div>
    </>
  );
};

export default DoctorHomepage;
