import "./styles.css";
import LoginBolinca from "./LoginBolnica.jpg";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "../../../components/CustomModal/CustomModal";

const initialState = {
  email: "",
  password: "",
};

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const [modalError, setModalError] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form, navigate, toggleModalError));
  };

  const toggleModalError = () => setModalError(!modalError);

  return (
    <div>
      <CustomModal
        title="Greška"
        content="Uneti kredencijali su neispravni."
        toggleModal={toggleModalError}
        isOpen={modalError}
      />
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form action="#">
            <h1 className="form-heading">Prijava</h1>
            <br></br>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <br></br>
            <button onClick={handleSubmit}>Prijavi se</button>
            <Link to="/forgot-password" style={{ marginTop: "20px" }}>
              Zaboravljena lozinka?
            </Link>
          </form>
        </div>
      </div>
      <div className="image-container">
        <img className="image" src={LoginBolinca} alt="login"></img>
      </div>
    </div>
  );
}
export default LoginPage;
