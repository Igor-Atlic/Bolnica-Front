import React from "react";
import "./styles.css";

const Statistika = (props) => {
  const { image, text, number } = props;
  return (
    <div className="flex items-center text-center frame">
      <div className="statistics ">
        <span className="icon">{image}</span>
        {/*         <img className={`${image} icon`} alt="briefcase" />
         */}{" "}
        <p className="text">{text}</p>
        <p className="number">{number}</p>
      </div>
    </div>
  );
};
export default Statistika;
