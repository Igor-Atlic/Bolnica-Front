import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientsVisitsHistory } from "../../api";
import { getTableHeaders } from "../../commons/tableHeaders";
import { getPatientsVisits } from "../../redux/actions/patientsVisits";
import Table from "../Table/Table";

const Visits = (props) => {
  const { isTab3, lbp } = props;
  const dispatch = useDispatch();
  const patientsVisits = useSelector((state) => state.patientsVisits);

  let table;
  if (isTab3) {
    table = (
      <Table
        headers={getTableHeaders("patientsVisits")}
        tableContent={patientsVisits}
      />
    );
  } else
    table = (
      <p className="form-section-heading">
        Trenutno ne postoji istorija stanja
      </p>
    );
  return <div>{table}</div>;
};

export default Visits;
