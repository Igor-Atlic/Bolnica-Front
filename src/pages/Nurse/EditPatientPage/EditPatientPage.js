import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { updatePatient, getPatient } from "../../../redux/actions/patients";
import { useLocation, useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import CustomModal from "../../../components/CustomModal/CustomModal";
import CustomModalAnswer from "../../../components/CustomModalAnswer/CustomModalAnswer";

const initialState = {
  jmbg: "",
  ime: "",
  imeRoditelja: "",
  prezime: "",
  datumRodjenja: "2000-03-03",
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
  datumVremeSmrti: "2022-03-03",
};

function EditPatientPage() {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [lbp, setLbp] = useState();
  const [role, setRole] = useState("");
  const patients = useSelector((state) => state.patients);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [patient, setPatient] = useState({});

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    setRole(pathParts[1]);
    setLbp(pathParts[pathParts.length - 1]);
    dispatch(getPatient(pathParts[pathParts.length - 1]));
  }, []);

  useEffect(() => {
    if (patients.length > 0) setPatient(patients[0]);
  }, [patients]);

  useEffect(() => {
    if (patient) {
      const dateOfBirth = new Date(patient.datumRodjenja);
      var day = ("0" + dateOfBirth.getDate()).slice(-2);
      var month = ("0" + (dateOfBirth.getMonth() + 1)).slice(-2);
      var today = dateOfBirth.getFullYear() + "-" + month + "-" + day;
      console.log(patient);
      setForm({
        ime: patient.ime,
        prezime: patient.prezime,
        jmbg: patient.jmbg,
        email: patient.email,
        adresa: patient.adresa,
        city: patient.city,
        zanimanje: patient.zanimanje,
        brojDece: patient.brojDece,
        bracniStatus: patient.bracniStatus,
        pol: "MUSKI",
        datumRodjenja: today,
        imeRoditelja: patient.imeRoditelja,
        imeStaratelj: patient.imeStaratelj,
        jmbgStaratelj: patient.jmbgStaratelj,
        kontaktTelefon: patient.kontaktTelefon,
        mestoRodjenja: patient.mestoRodjenja,
        mestoStanovanja: patient.mestoStanovanja,
        zemljaDrzavljanstva: patient.zemljaDrzavljanstva,
        zemljaStanovanja: patient.zemljaStanovanja,
        porodicniStatus: patient.porodicniStatus,
        stepenStrucneSpreme: patient.stepenStrucneSpreme,
      });
    }
  }, [patient]);

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
      updatePatient(
        { ...form, pol: "MUSKI" },
        lbp,
        toggleModalSuccess,
        toggleModalError
      )
    );
  };

  const toggleModalSuccess = () => setModalSuccess(!modalSuccess);
  const toggleModalError = () => setModalError(!modalError);
  const navigateToHomepage = () => navigate("/nurse/patient-preview");

  return (
    <div style={{ marginLeft: "20%" }}>
      <CustomModal
        title="Uspeh"
        content="Uspesno izmenjen pacijent."
        toggleModal={toggleModalSuccess}
        isOpen={modalSuccess}
        handleClick={navigateToHomepage}
      />
      <CustomModal
        title="Greška"
        content="Doslo je do greške prilikom izmene pacijenta."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      <div className="sidebar-link-container">
        <Sidebar
          links={
            role === "nurse"
              ? getSidebarLinks("nurse", 0)
              : getSidebarLinks("doctor", 0)
          }
        />
      </div>
      <form className="form-custom">
        <h1 className="form-heading">Izmena pacijenta</h1>
        <br></br>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Ime"
            onChange={handleChange}
            name="ime"
            value={form.ime}
          />
          <input
            type="text"
            className="margin-left"
            placeholder="Prezime"
            onChange={handleChange}
            name="prezime"
            value={form.prezime}
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Ime roditelja"
            onChange={handleChange}
            name="imeRoditelja"
            value={form.imeRoditelja}
          />
          <input
            type="text"
            className="margin-left"
            placeholder="JMBG"
            onChange={handleChange}
            name="jmbg"
            value={form.jmbg}
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
            value={form.datumRodjenja}
          />
          <input
            type="text"
            className="margin-left margin-right"
            placeholder="Mesto rodjenja"
            name="mestoRodjenja"
            onChange={handleChange}
            value={form.mestoRodjenja}
          />
          <input
            type="text"
            className="margin-left"
            placeholder="Adresa stanovanja"
            onChange={handleChange}
            name="adresa"
            value={form.adresa}
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Mesto stanovanja"
            onChange={handleChange}
            name="mestoStanovanja"
            value={form.mestoStanovanja}
          />
          <input
            type="text"
            className="margin-left margin-right"
            placeholder="Zemlja stanovanja"
            onChange={handleChange}
            name="zemljaStanovanja"
            value={form.zemljaStanovanja}
          />
          <input
            type="text"
            className="margin-left"
            placeholder="Zemlja drzavljanstva"
            onChange={handleChange}
            name="zemljaDrzavljanstva"
            value={form.zemljaDrzavljanstva}
          />
        </div>
        <div className="form-group-custom">
          <input
            className="margin-right"
            type="text"
            placeholder="Kontakt telefon"
            onChange={handleChange}
            name="kontaktTelefon"
            value={form.kontaktTelefon}
          />
          <input
            className="margin-left"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={form.email}
          />
        </div>
        <div className="form-group-custom">
          <input
            type="text"
            className="margin-right"
            placeholder="Ime i prezime staratelja"
            onChange={handleChange}
            name="imeStaratelj"
            value={form.imeStaratelj}
          />
          <input
            type="text"
            className="margin-left"
            placeholder="JMBG staratelja"
            onChange={handleChange}
            name="jmbgStaratelj"
            value={form.jmbgStaratelj}
          />
        </div>
        <div className="form-group-custom">
          <select
            className="form-select-custom small-select margin-right"
            aria-label="Default select example"
            name="porodicniStatus"
            onChange={handleChange}
            value={form.porodicniStatus}
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
            name="bracniStatus"
            onChange={handleChange}
            value={form.bracniStatus}
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
            value={form.brojDece}
          />
          <input
            type="text"
            className="margin-left margin-right"
            placeholder="Zanimanje"
            onChange={handleChange}
            name="zanimanje"
            value={form.zanimanje}
          />
          <select
            className="form-select-custom small-select margin-left"
            aria-label="Default select example"
            onChange={handleChange}
            name="stepenStrucneSpreme"
            value={form.stepenStrucneSpreme}
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
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Izmeni
        </button>
      </form>
    </div>
  );
}
export default EditPatientPage;
