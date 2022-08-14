import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { getPatients } from "../../../redux/actions/patients";
import { useNavigate } from "react-router";
import { getSidebarLinks } from "../../../commons/sidebarLinks";
import { Switch } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";
import "./styles.css";
import { createReferral } from "../../../redux/actions/referrals";

function RegistrationPatientPage() {
  const [form, setForm] = useState({ komentar: "", razlogUpucivanja: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patients = useSelector((state) => state.patients);

  useEffect(() => {
    dispatch(getPatients());
  }, []);

  const handleAnalysisChange = (e) => {
    setForm({
      ...form,
      zahtevaneAnalize: form.zahtevaneAnalize
        ? [...form.zahtevaneAnalize, e.target.value]
        : [e.target.value],
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    dispatch(
      createReferral({
        ...form,
        lbz: user.LBZ,
        izOdeljenjaId: 1,
        zahtevaneAnalize: "GLU",
        datumVremeKreiranja: new Date(),
        zaOdeljenjeId: 1,
      })
    );
    console.log({ ...form, lbz: user.LBZ, izOdeljenjaId: 1 });
    // navigate("/");
  };

  return (
    <div style={{ marginLeft: "20%" }}>
      <div className="sidebar-link-container">
        <Sidebar links={getSidebarLinks("doctor", 5)} />
      </div>
      <form className="form-custom">
        <h1 className="form-heading">Kreiranje uputa</h1>
        <br></br>
        <div className="form-group-custom">
          <select
            className="form-select-custom small-select margin-right"
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
          <select
            className="form-select-custom small-select margin-left"
            onChange={handleChange}
            name="tip"
            value={form.tip}
            defaultValue=""
          >
            <option value="" disabled>
              Izaberite tip uputa
            </option>
            <option value="LABORATORIJA">Laboratorija</option>
            <option value="DIJAGNOSTIKA">Dijagnostika</option>
            <option value="STACIONAR">Stacionar</option>
          </select>
        </div>
        {form.tip === "LABORATORIJA" ? (
          <>
            <div className="form-group-custom">
              <select
                className="form-select-custom small-select margin-right"
                onChange={handleChange}
                name="institution"
                value={form.institution}
                defaultValue=""
              >
                <option value="" disabled>
                  Zdravstvena ustanova
                </option>
                <option value="MED_LAB">MedLab</option>
                <option value="BIO_MED">BioMedical</option>
              </select>
              <input
                type="text"
                className="margin-left"
                placeholder="Komentar"
                onChange={handleChange}
                name="komentar"
                value={form.komentar}
              />
            </div>
            <div className="form-group-custom margin-top margin-bottom">
              <Switch
                className="margin-right"
                shape="slim"
                color="primary"
                name="GLU"
                value="GLU"
                onChange={handleAnalysisChange}
              >
                GLU
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="HOL"
                value="HOL"
                onChange={handleAnalysisChange}
              >
                HOL
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="TRIG"
                value="TRIG"
                onChange={handleAnalysisChange}
              >
                TRIG
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="URE"
                value="URE"
                onChange={handleAnalysisChange}
              >
                URE
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="KREAT"
                value="KREAT"
                onChange={handleAnalysisChange}
              >
                KREAT
              </Switch>
              <Switch
                className="margin-left"
                shape="slim"
                color="primary"
                name="MK"
                value="MK"
                onChange={handleAnalysisChange}
              >
                MK
              </Switch>
              <Switch
                className="margin-left"
                shape="slim"
                color="primary"
                name="URIN"
                value="URIN"
                onChange={handleAnalysisChange}
              >
                URIN
              </Switch>
            </div>
            <div className="form-group-custom margin-top margin-bottom">
              <Switch
                className="margin-right"
                shape="slim"
                color="primary"
                name="BILIR-uk"
                value="BILIR-uk"
                onChange={handleAnalysisChange}
              >
                BILIR-uk
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="ALT"
                value="ALT"
                onChange={handleAnalysisChange}
              >
                ALT
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="AST"
                value="AST"
                onChange={handleAnalysisChange}
              >
                AST
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="CK"
                value="CK"
                onChange={handleAnalysisChange}
              >
                CK
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="TSH"
                value="TSH"
                onChange={handleAnalysisChange}
              >
                TSH
              </Switch>
              <Switch
                className="margin-left"
                shape="slim"
                color="primary"
                name="FT4"
                value="FT4"
                onChange={handleAnalysisChange}
              >
                FT4
              </Switch>
              <Switch
                className="margin-left"
                shape="slim"
                color="primary"
                name="SARS CoV-2 antigen"
                value="SARS CoV-2 antigen"
                onChange={handleAnalysisChange}
              >
                SARS CoV-2 antigen
              </Switch>
            </div>
            <div className="form-group-custom margin-top margin-bottom">
              <Switch
                className="margin-right"
                shape="slim"
                color="primary"
                name="CRP"
                value="CRP"
                onChange={handleAnalysisChange}
              >
                CRP
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="WBC"
                value="WBC"
                onChange={handleAnalysisChange}
              >
                WBC
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="RBC"
                value="RBC"
                onChange={handleAnalysisChange}
              >
                RBC
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="PLT"
                value="PLT"
                onChange={handleAnalysisChange}
              >
                PLT
              </Switch>
              <Switch
                className="margin-right margin-left"
                shape="slim"
                color="primary"
                name="Hb"
                value="Hb"
                onChange={handleAnalysisChange}
              >
                Hb
              </Switch>
              <Switch
                className="margin-left"
                shape="slim"
                color="primary"
                name="KKS"
                value="KKS"
                onChange={handleAnalysisChange}
              >
                KKS
              </Switch>
              <Switch
                className="margin-left"
                shape="slim"
                color="primary"
                name="SE"
                value="SE"
                onChange={handleAnalysisChange}
              >
                SE
              </Switch>
            </div>
          </>
        ) : form.tip === "DIJAGNOSTIKA" ? (
          <>
            <div className="form-group-custom">
              <select
                className="form-select-custom small-select margin-right"
                onChange={handleChange}
                name="stepenStrucneSpreme"
                value={form.institution}
                defaultValue=""
              >
                <option value="" disabled>
                  Zdravstvena ustanova
                </option>
                <option value="MED_LAB">MedLab</option>
                <option value="BIO_MED">BioMedical</option>
              </select>
              <input
                type="text"
                className="margin-left"
                placeholder="Komentar"
                onChange={handleChange}
                name="komentar"
                value={form.komentar}
              />
            </div>
            <div className="form-group-custom">
              <select
                onChange={handleChange}
                className="form-select-custom small-select margin-right"
                aria-label="Default select example"
                defaultValue=""
                name="diagnosis"
              >
                <option value="" disabled>
                  Uputna dijagnoza
                </option>
                <option value="A15.3">A15.3 - Tuberkuloza pluća</option>
                <option value="D50">D50 - Nedostatkom gvožđa</option>
                <option value="I10">I10 - Povišen krvni pritisak</option>
                <option value="I35.0">I35.0 - Suženje aortnog zaliska</option>
                <option value="J11">J11 - Grip, virus nedokazan</option>
                <option value="J12.9">J12.9 - Zapaljenje pluća</option>
                <option value="K35">
                  K35 - Akutno zapaljenje slepog creva
                </option>
                <option value="K70.3">
                  K70.3 - Ciroza jetre uzrokovana alkoholom
                </option>
                <option value="K71.0">
                  K71.0 - Toksička bolest jetre zbog zastoja žuči
                </option>
                <option value="N20.0">N20.0 - Kamen u bubregu</option>
              </select>
              <input
                type="text"
                className="margin-left"
                placeholder="Razlog upucivanja"
                onChange={handleChange}
                name="razlogUpucivanja"
                value={form.razlogUpucivanja}
              />
            </div>
          </>
        ) : form.tip === "STACIONAR" ? (
          <>
            <div className="form-group-custom">
              <select
                className="form-select-custom small-select margin-right"
                onChange={handleChange}
                name="stepenStrucneSpreme"
                value={form.institution}
                defaultValue=""
              >
                <option value="" disabled>
                  Zdravstvena ustanova
                </option>
                <option value="MED_LAB">MedLab</option>
                <option value="BIO_MED">BioMedical</option>
              </select>
              <input
                type="text"
                className="margin-left"
                placeholder="Komentar"
                onChange={handleChange}
                name="komentar"
                value={form.komentar}
              />
            </div>
            <div className="form-group-custom">
              <select
                onChange={handleChange}
                className="form-select-custom small-select"
                aria-label="Default select example"
                defaultValue=""
                name="diagnosis"
              >
                <option value="" disabled>
                  Uputna dijagnoza
                </option>
                <option value="A15.3">A15.3 - Tuberkuloza pluća</option>
                <option value="D50">D50 - Nedostatkom gvožđa</option>
                <option value="I10">I10 - Povišen krvni pritisak</option>
                <option value="I35.0">I35.0 - Suženje aortnog zaliska</option>
                <option value="J11">J11 - Grip, virus nedokazan</option>
                <option value="J12.9">J12.9 - Zapaljenje pluća</option>
                <option value="K35">
                  K35 - Akutno zapaljenje slepog creva
                </option>
                <option value="K70.3">
                  K70.3 - Ciroza jetre uzrokovana alkoholom
                </option>
                <option value="K71.0">
                  K71.0 - Toksička bolest jetre zbog zastoja žuči
                </option>
                <option value="N20.0">N20.0 - Kamen u bubregu</option>
              </select>
            </div>
          </>
        ) : (
          <></>
        )}
        <button onClick={handleSubmit} style={{ marginTop: "10px" }}>
          Kreiraj uput
        </button>
      </form>
    </div>
  );
}
export default RegistrationPatientPage;
