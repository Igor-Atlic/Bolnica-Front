import React from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../redux/actions/auth";
import {useNavigate} from "react-router";

const HeaderRight = (props) => {
  const { userName, userTitle } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(logout(navigate));
    };
  return (
    <div className="user-container">
      <div className="name-container">
        <p className="user-name familyFix">{userName}</p>
        <p className="user-title familyFix">{userTitle}</p>
      </div>
      <div className="button-container">
        <button className="logout-btn" onClick={logoutUser}>Logout</button>
      </div>
    </div>
  );
};

export default HeaderRight;
