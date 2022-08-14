import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Table from "../../../components/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import { searchLabReports } from "../../../redux/actions/labReports";
import { useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import { getTableHeaders } from "../../../commons/tableHeaders";
import { getPatients } from "../../../redux/actions/patients";
import { format } from "date-fns";
import Header from "../../../components/Header/Header";

const DoctorHomepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [form, setForm] = useState({});
  const labReports = useSelector((state) => state.labReports);
  const patients = useSelector((state) => state.patients);
  const [tableContent, setTableContent] = useState([]);

  useEffect(() => {
    dispatch(searchLabReports({}));
    dispatch(getPatients());
  }, []);

  useEffect(() => {
    if (patients.length > 0 && labReports.length > 0) {
      setTableContent(
        labReports.map((labReport) => {
          const patient = patients.find((patient) =>
            patient.lbp === labReport.lbp ? patient : false
          );
          return { ...labReport, ...patient };
        })
      );
    }
  }, [patients, labReports]);

  function handleOnChange(event) {
    setValue(event.target.value);
  }
  const onChangeDateHandler = (e, targetName) => {
    let formatted;
    const date = new Date(e.target.value);
    const years = date.toLocaleDateString("en-US", { year: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "numeric" });
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    formatted = years;
    formatted += month.length === 1 ? `-0${month}` : `-${month}`;
    formatted += day.length === 1 ? `-0${day}` : `-${day}`;
    setForm({
      ...form,
      [targetName]: formatted,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(value);
    dispatch(searchLabReports(value));
  }

  const handleRowClick = (entry) => {
    navigate(`/technician/issuing-results/${entry[0][1]}`);
  };

  const handleChange = (e) => {};

  const headerProps = {
    userName: "Dr. Paun",
    userTitle: "Lab Tehnicar",
  };

  return (
    <>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("technician", 4)} />
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
        <div style={{ width: "60%", margin: "auto" }}>
          <form>
            <div className="form-group-custom">
              <select
                className="form-select-custom small-select"
                onChange={handleChange}
                name="lbp"
                value={form.lbp}
                defaultValue=""
              >
                <option value="" disabled>
                  Izaberite pacijenta
                </option>
                {patients.length > 0 ? (
                  <>
                    {patients.map((patient) => {
                      return (
                        <option key={patient.lbp} value={patient.lbp}>
                          {patient.ime}
                        </option>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </select>
            </div>
            <div className="form-group-custom">
              <input
                type="date"
                data-date=""
                data-date-format="ddmmyyyy"
                name="startDate"
                onChange={(e) => onChangeDateHandler(e, "startDate")}
                className="margin-right"
              />
              <input
                type="date"
                data-date=""
                data-date-format="ddmmyyyy"
                name="endDate"
                onChange={(e) => onChangeDateHandler(e, "endDate")}
                className="margin-left"
              />
            </div>
            <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
              Pretrazi
            </button>
          </form>
        </div>
        <Table
          headers={getTableHeaders("labReportPreview")}
          tableContent={tableContent}
          handleRowClick={handleRowClick}
          tableType="labReports"
        />
      </div>
    </>
  );
};

export default DoctorHomepage;
