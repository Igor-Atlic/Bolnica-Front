import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import { createPatientsVisits } from "../../../redux/actions/patientsVisits";

const initialState = {
  jmbg: "",
  ime: "",
  napomena: "",
  prezime: "",
};
const RecepcionistRegistationVisitsPage = () => {
  const [form, setForm] = useState(initialState);
  const [lbp, setLbp] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    setLbp(pathParts[pathParts.length - 1]);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.jmbg === "" || form.ime === "" || form.prezime === "") {
      //console.log("Cap")
    } else {
      console.log(lbp, form);
      dispatch(createPatientsVisits(lbp, form));
    }
    navigate("/recepcionist/visits");
  };
  return (
    <div style={{ marginLeft: "20%" }}>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("recepcionist", -1)} />
      </div>
      <form className="form-custom">
        <h1 className="form-heading">Registracija posete</h1>
        <br></br>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Ime"
            onChange={handleChange}
            name="ime"
          />
          <input
            type="text"
            className="margin-left"
            placeholder="Prezime"
            onChange={handleChange}
            name="prezime"
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="JMBG"
            onChange={handleChange}
            name="jmbg"
          />
          <input
            type="text"
            className="margin-left"
            placeholder="Napomena"
            onChange={handleChange}
            name="napomena"
          />
        </div>
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Registruj posetu
        </button>
      </form>
    </div>
  );
};
export default RecepcionistRegistationVisitsPage;
