import React from "react";
import "./styles.css";
import {Link} from "react-router-dom";

const Statistika = (props) => {
  const { image, text, path } = props;
  return (

    <div className="flex items-center text-center frame">
        <Link to={path}>
      <div className="statistics ">
        <span className="icon">{image}</span>
        <p className="text">{text}</p>
      </div>
        </Link>

    </div>
  );
};
export default Statistika;
