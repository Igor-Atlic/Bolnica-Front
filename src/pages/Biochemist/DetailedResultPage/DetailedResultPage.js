import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import { useLocation, useNavigate } from "react-router";
import { format } from "date-fns";
import Table from "../../../components/Table/Table";
import { getTableHeaders } from "../../../commons/tableHeaders";
import {
  getAnalysisResults,
  saveAnalysisResult,
} from "../../../redux/actions/analysisResults";
import { getEmployees } from "../../../redux/actions/employee";
import { verifyReport } from "../../../redux/actions/labReports";
import CustomModalAnswer from "../../../components/CustomModalAnswer/CustomModalAnswer";
import CustomModal from "../../../components/CustomModal/CustomModal";

const DoctorHomepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const analysisResults = useSelector((state) => state.analysisResults);
  const employees = useSelector((state) => state.employees);
  const [tableContent, setTableContent] = useState([]);
  const [results, setResults] = useState([]);
  const [labReportId, setLabReportId] = useState();
  const [modalError, setModalError] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [modalResult, setModalResult] = useState(false);

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
    dispatch(
      saveAnalysisResult(
        { nalogId: labReportId, ...resultToUpdate },
        toggleModalResult
      )
    );
  };

  const handleVerify = () => {
    const emptyResult = results.find((result) => result.rezultat === "");
    console.log(emptyResult);
    if (emptyResult) {
      toggleModalError();
    } else {
      dispatch(verifyReport(labReportId, toggleModalSuccess));
    }
  };

  const headerProps = {
    avatarUrl: "nikolaSlika 1.jpg",
    welcomeMsg: "Dobro jutro",
    userName: "Dr. Paun",
    userTitle: "Kardiolog",
  };
  const toggleModalInfo = (e) => {
    if (e) e.preventDefault();
    setModalInfo(!modalInfo);
  };
  const toggleModalError = () => setModalError(!modalError);
  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalResult = () => setModalResult(!modalResult);
  const navigateToHomepage = () => navigate("/biochemist");
  return (
    <>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("biochemist", -1)} />
      </div>
      <CustomModalAnswer
        title="Potvrda akcije"
        content="Da li želite da verifikujete rezultate?"
        toggleModal={toggleModalInfo}
        isOpen={modalInfo}
        handleClick={handleVerify}
      />
      <CustomModal
        title="Greška"
        content="Svi rezultati su neophodni da bi bili verifikovani."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      <CustomModal
        title="Uspeh"
        content="Uspešno verifikovani rezultat."
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
        handleClick={navigateToHomepage}
      />
      <CustomModal
        title="Uspeh"
        content="Uspešno uneti rezultat."
        toggleModal={toggleModalResult}
        isOpen={modalResult}
      />
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
          headers={getTableHeaders("detailedResultPreview")}
          tableContent={tableContent}
          tableType="detailedResultPreview"
          handleClick={handleClick}
          onResultChange={onResultChange}
          handleRowClick={() => {}}
        />
        <button
          onClick={toggleModalInfo}
          style={{
            margin: "auto",
            marginLeft: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Verifikuj rezultate
        </button>
      </div>
    </>
  );
};

export default DoctorHomepage;
