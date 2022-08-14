import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { createPatient } from "../../../redux/actions/patients";
import { useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import CustomModal from "../../../components/CustomModal/CustomModal";

const initialState = {
  jmbg: "",
  ime: "",
  imeRoditelja: "",
  prezime: "",
  datumRodjenja: new Date(),
  mestoRodjenja: "",
  zemljaDrzavljanstva: "",
  adresa: "",
  mestoStanovanja: "",
  zemljaStanovanja: "",
  kontaktTelefon: "",
  email: "",
  jmbgStaratelj: "",
  imeStaratelj: "",
  porodicniStatus: "",
  bracniStatus: "U_BRAKU",
  brojDece: 0,
  stepenStrucneSpreme: "",
  zanimanje: "",
  pol: "muski",
  datumVremeSmrti: new Date(),
};

function RegistrationPatientPage() {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onChangeDateHandler = (e) => {
    const date = new Date(e.target.value);
    const years = date.toLocaleDateString("en-US", { year: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "numeric" });
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    let formatted = years;
    formatted += month.length === 1 ? `-0${month}` : `-${month}`;
    formatted += day.length === 1 ? `-0${day}` : `-${day}`;
    setForm({
      ...form,
      datumRodjenja: formatted,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createPatient(
        { ...form, pol: "MUSKI" },
        toggleModalSuccess,
        toggleModalError
      )
    );
  };

  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalError = () => setModalError(!modalError);
  const navigateToHomepage = () => navigate("/recepcionist");

  return (
    <div style={{ marginLeft: "20%" }}>
      <CustomModal
        title="Uspeh"
        content="Uspesno registrovan pacijent."
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
        handleClick={navigateToHomepage}
      />
      <CustomModal
        title="Greška"
        content="Doslo je do greške prilikom kreiranja pacijenta."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("recepcionist", 2)} />
      </div>
      <form className="form-custom">
        <h1 className="form-heading">Dodavanje pacijenta</h1>
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
            placeholder="Ime roditelja"
            onChange={handleChange}
            name="imeRoditelja"
          />
          <input
            type="text"
            className="margin-left"
            placeholder="JMBG"
            onChange={handleChange}
            name="jmbg"
          />
        </div>
        <div className="form-group-custom">
          <input
            type="date"
            className="margin-right"
            data-date=""
            data-date-format="ddmmyyyy"
            onChange={onChangeDateHandler}
            name="datumRodjenja"
          />
          <input
            type="text"
            className="margin-left margin-right"
            placeholder="Mesto rodjenja"
            name="mestoRodjenja"
            onChange={handleChange}
          />
          <input
            type="text"
            className="margin-left"
            placeholder="Adresa stanovanja"
            onChange={handleChange}
            name="adresa"
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Mesto stanovanja"
            onChange={handleChange}
            name="mestoStanovanja"
          />
          <input
            type="text"
            className="margin-left margin-right"
            placeholder="Zemlja stanovanja"
            onChange={handleChange}
            name="zemljaStanovanja"
          />
          <input
            type="text"
            className="margin-left"
            placeholder="Zemlja drzavljanstva"
            onChange={handleChange}
            name="zemljaDrzavljanstva"
          />
        </div>
        <div className="form-group-custom">
          <input
            className="margin-right"
            type="text"
            placeholder="Kontankt telefon"
            onChange={handleChange}
            name="kontaktTelefon"
          />
          <input
            className="margin-left"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Ime i prezime staratelja"
            onChange={handleChange}
            name="imeStaratelj"
          />
          <input
            type="text"
            className="margin-left"
            placeholder="JMBG staratelja"
            onChange={handleChange}
            name="jmbgStaratelj"
          />
        </div>
        <div className="form-group-custom">
          <select
            className="form-select-custom small-select margin-right"
            aria-label="Default select example"
            defaultValue=""
            name="porodicniStatus"
            onChange={handleChange}
          >
            <option value="" disabled>
              Porodicni status
            </option>
            <option value="OBA_RODITELJA">Oba roditelja</option>
            <option value="RAZDVOJENI">Roditelji razdvojeni</option>
            <option value="RAZVEDENI">Razvedeni</option>
            <option value="JEDAN_RODITELJ">Jedan roditelj</option>
            <option value="BEZ_RODITELJA">Bez roditelja</option>
            <option value="USVOJEN">Usvojen</option>
          </select>
          <select
            className="form-select-custom small-select margin-left"
            aria-label="Default select example"
            defaultValue=""
            name="bracniStatus"
            onChange={handleChange}
          >
            <option value="" disabled>
              Bracni status
            </option>
            <option value="U_BRAKU">U braku</option>
            <option value="UDOVAC">Udovac</option>
            <option value="UDOVICA">Udovica</option>
            <option value="SAMAC">Samac</option>
            <option value="SAMICA">Samica</option>
          </select>
        </div>
        <div className="form-group-custom">
          <input
            type="number"
            className="margin-right"
            placeholder="Broj dece"
            onChange={handleChange}
            name="brojDece"
          />
          <input
            type="text"
            className="margin-left margin-right"
            placeholder="Zanimanje"
            onChange={handleChange}
            name="zanimanje"
          />
          <select
            className="form-select-custom small-select margin-left"
            aria-label="Default select example"
            defaultValue=""
            onChange={handleChange}
            name="stepenStrucneSpreme"
          >
            <option value="" disabled>
              Stepen strucne spreme
            </option>
            <option value="BEZ_OSNOVNOG_OBRAZOVANJA">
              Bez osnovnog obrazovanja
            </option>
            <option value="OSNOVNO">Osnovno obrazovanje</option>
            <option value="SREDNJE">Srednje obrazovanje</option>
            <option value="VISE">Vise obrazovanje</option>
            <option value="VISOKO">Visoko obrazovanje</option>
          </select>
        </div>
        <br></br>
        <div className="form-group-custom">
          <div className="wrapper">
            <input
              type="radio"
              name="pol"
              id="option-1"
              value="MUSKI"
              onChange={handleChange}
              checked
            />
            <input
              type="radio"
              name="pol"
              value="ZENSKI"
              id="option-2"
              onChange={handleChange}
            />
            <label htmlFor="option-1" className="option option-1">
              <div className="dot"></div>
              <span>Muski pol</span>
            </label>
            <label htmlFor="option-2" className="option option-2">
              <div className="dot"></div>
              <span>Zenski pol</span>
            </label>
          </div>
        </div>
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Registruj pacijenta
        </button>
      </form>
    </div>
  );
}
export default RegistrationPatientPage;
