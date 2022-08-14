import React from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../redux/actions/auth";
import "./styles.css";

const HeaderNurse = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userName,
    userTitle,
    employees,
    getDoctorAppointments,
    selectedDoctor,
  } = props;

  const logoutUser = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="containerCustom">
      <div className="doctor-container">
        <Dropdown>
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-basic"
            className="dropdownToggle toggleButton"
          >
            Dr. {selectedDoctor.name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {employees.map((doctor) => {
              if (doctor.lbz !== selectedDoctor.lbz) {
                return (
                  <Dropdown.Item
                    key={doctor.lbz}
                    onClick={() => getDoctorAppointments(doctor.lbz)}
                  >
                    Dr. {doctor.name}
                  </Dropdown.Item>
                );
              }
              return <></>;
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="user-container">
        <div className="name-container">
          <p className="user-name">{userName}</p>
          <p className="user-title">{userTitle}</p>
        </div>
        <div className="button-container">
          <button onClick={logoutUser} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderNurse;
