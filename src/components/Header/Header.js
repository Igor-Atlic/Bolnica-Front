import React from "react";
import "./styles.css";
import { FaCalendar } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/auth";

const Header = ({ avatarUrl, welcomeMsg, userName, userTitle, day, date }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="containerCustom">
      <div className="user-container">
        {/* <div className="avatar-container">
					<img
						className="user-avatar"
						src={avatarUrl}
						alt={userName}
					/>
				</div> */}
        <div className="name-container ">
          <p className="welcome-msg familyFix">{welcomeMsg}</p>
          <p className="user-name familyFix">{userName}</p>
          <p className="user-title familyFix">{userTitle}</p>
        </div>
      </div>
      <div className="date-container">
        <span className="calendar-icon">
          <FaCalendar />
        </span>
        <span className="date-span">{date}</span>
      </div>
      <div className="button-container" onClick={logoutUser}>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Header;
