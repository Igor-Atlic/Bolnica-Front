import React, { useState } from "react";
import "./styles.css";
import { ImBin, ImPencil, ImFileText2, ImCheckmark } from "react-icons/im";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FiPlusSquare } from "react-icons/fi";
import { FaPrint } from "react-icons/fa";
const Table = (props) => {
  const {
    headers,
    tableContent,
    handleClick,
    tableType,
    handleEdit,
    handleRowClick,
    handleButtonCanceled,
    handlecreateLabReport,
    handleCancelVisit,
    handleCreateLabReportTab1,
    handleAcceptAdmission,
    handleCancelAdmission,
    handleChooseReferral,
    handleChooseRoom,
    onResultChange,
    printReport,
  } = props;

  const listHeaders = headers.map((header) => {
    if (
      header.key === "lbp" ||
      header.key === "lbpPacijenta" ||
      header.key === "lbz" ||
      header.key === "uputId" ||
      header.key === "obrisan"
    )
      return <></>;
    return (
      <th scope="col" key={header.key}>
        {header.value}
      </th>
    );
  });
  if (
    tableType === "employees" ||
    tableType === "detailedResultPreview" ||
    tableType === "admissionVisits" ||
    tableType === "admissionsFinish" ||
    tableType === "patients"
  ) {
    listHeaders.push(<th scope="col"></th>);
    listHeaders.push(<th scope="col"></th>);
  }
  if (
    tableType === "searchVisits" ||
    tableType === "unrealizedLabReferrals" ||
    tableType === "admissions" ||
    tableType === "referralsStationary" ||
    tableType === "referrals"
  ) {
    listHeaders.push(<th scope="col"></th>);
  }

  const handleButton = (key, entry) => {
    console.log(entry);
    const value = entry.filter((element) => element[0] === key);
    handleClick(value[0][1]);
  };

  const handleEditButton = (key, entry) => {
    const value = entry.filter((element) => element[0] === key);
    handleEdit(value[0][1]);
  };

  const handleSearchVisits = (key, entry) => {
    const value = entry.filter((element) => element[0] === key);
    handleEdit(value[0][1]);
  };

  const info = tableContent.map((content) => {
    const entry = Object.entries(content).filter((item, index) => {
      for (let i = 0; i < headers.length; i++) {
        if (headers[i].key === item[0]) {
          return item[1] ? item[1] : "/";
        }
      }
      return false;
    });
    return entry;
  });

  const listTable = info.map((entry) => (
    <tr key={entry} onClick={() => handleRowClick(entry)}>
      {entry.map((element) => {
        if (
          element[0] === "lbp" ||
          element[0] === "lbpPacijenta" ||
          element[0] === "lbz" ||
          element[0] === "uputId" ||
          element[0] === "obrisan"
        )
          return <></>;
        if (
          element[0] === "datumPregleda" ||
          element[0] === "zakazanDatum" ||
          element[0] === "datumVremeKreiranja" ||
          element[0] === "datumRodjenja" ||
          element[0] === "datumVremePrijema" ||
          element[0] === "datumVreme" ||
          element[0] === "dob"
        ) {
          return (
            <td key={element} style={{ padding: "25px 0px" }}>
              {new Date(element[1]).toLocaleDateString()}
            </td>
          );
        }
        // if (element[0] === "datumVreme") {
        //   return (
        //     <td key={element} style={{ padding: "25px 0px" }}>
        //       {new Date(element[1]).toLocaleDateString() +
        //         " " +
        //         new Date(element[1]).toLocaleTimeString()}
        //     </td>
        //   );
        // }

        if (element[0] === "status") {
          if (element[1] === "neobradjeno") {
            return (
              <td style={{ width: "5%" }}>
                <button
                  className="buttonIconBlue"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlecreateLabReport("lbz", entry);
                  }}
                >
                  <ImFileText2 />
                </button>
              </td>
            );
          } else {
            return <></>;
          }
        }

        if (element[0] === "odaberiSobu") {
          if (entry[5][1] < entry[4][1]) {
            return (
              <td style={{ width: "5%" }}>
                <button
                  className="buttonBlue"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChooseRoom("lbz", entry);
                  }}
                >
                  Odaberi sobu
                </button>
              </td>
            );
          } else {
            return <></>;
          }
        }

        if (element[0] === "komentarStacionar") {
          let zakazaniPacijent = false;
          if (entry[5][1] === "Zakazan") {
            zakazaniPacijent = true;
          }

          return (
            <td style={{ width: "5%" }}>
              {/*               <div className="d-flex flex-row justify-content-center buttons">
               */}{" "}
              <div className="d-flex">
                <button
                  className={` ${
                    zakazaniPacijent
                      ? "buttonPrihvati"
                      : "inactiveButtonPrihvati"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAcceptAdmission("lbz", entry);
                  }}
                >
                  Prihvati
                </button>
                <button
                  className={` ${
                    zakazaniPacijent ? "buttonOtkazi" : "inactiveButtonOtkazi"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelAdmission("lbz", entry);
                  }}
                >
                  Otkazi
                </button>
              </div>
            </td>
          );
        }

        if (element[0] === "statusPregledaZakazaniPacijenti") {
          let zakazano = false;
          if (entry[5][1] === "Zakazano") {
            zakazano = true;
          }
          return (
            <td style={{ width: "5%" }}>
              {/*               <div className="d-flex flex-row justify-content-center buttons">
               */}{" "}
              <div className="d-flex">
                <button
                  className={`buttonZakazano ${
                    zakazano ? "" : "inactiveButton"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Zakazano
                </button>
                <button
                  className={`buttonOtkazano ${
                    !zakazano
                      ? "buttonOtkazano disbledButton"
                      : "inactiveButton"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelVisit("lbz", entry);
                  }}
                >
                  Otkazano
                </button>
                <button
                  className={`buttonKreirajNalog ${
                    zakazano ? "" : "inactiveButton disbledButton"
                  }`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCreateLabReportTab1("lbz", entry);
                  }}
                >
                  Kreiraj radni nalog
                </button>
              </div>
            </td>
          );
        }
        return (
          <td key={element} style={{ padding: "25px 0px" }}>
            {element[1] !== "" && element[1] ? element[1] : "/"}
          </td>
        );
      })}
      {tableType === "patients" ? (
        <>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIconBlue"
              onClick={(e) => {
                e.stopPropagation();
                handleEditButton("lbp", entry);
              }}
            >
              <ImPencil />
            </button>
          </td>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIcon"
              onClick={(e) => {
                e.stopPropagation();
                handleButton("lbp", entry);
              }}
            >
              <ImBin />
            </button>
          </td>
        </>
      ) : tableType === "visits" ? (
        <>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIconBlue"
              onClick={(e) => {
                e.stopPropagation();
                handleEditButton("lbp", entry);
              }}
            >
              <FiPlusSquare />
            </button>
          </td>
        </>
      ) : tableType === "referralsStationary" ? (
        <>
          <td style={{ width: "5%" }}>
            <button
              className="buttonBlue"
              onClick={(e) => {
                e.stopPropagation();
                handleChooseReferral("lbz", entry);
              }}
            >
              Odaberi uput
            </button>
          </td>
        </>
      ) : tableType === "employees" ? (
        <>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIconBlue"
              onClick={(e) => {
                e.stopPropagation();
                handleEditButton("lbz", entry);
              }}
            >
              <ImPencil />
            </button>
          </td>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIcon"
              onClick={(e) => {
                e.stopPropagation();
                handleButton("lbz", entry);
              }}
            >
              <ImBin />
            </button>
          </td>
        </>
      ) : tableType === "admissionsFinish" ? (
        <>
          <td style={{ width: "5%" }}>
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAcceptAdmission(entry);
                }}
                disabled={
                  entry[3][1] === "OTKAZAN" || entry[3][1] === "REALIZOVAN"
                }
                style={
                  entry[3][1] === "OTKAZAN" || entry[3][1] === "REALIZOVAN"
                    ? { backgroundColor: "#cacccf", borderColor: "#cacccf" }
                    : {}
                }
              >
                Prijem
              </button>
            </>
          </td>
          <td style={{ width: "5%" }}>
            <>
              <button
                className={"searchCanceled"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonCanceled(entry);
                }}
                disabled={
                  entry[3][1] === "OTKAZAN" || entry[3][1] === "REALIZOVAN"
                }
                style={
                  entry[3][1] === "OTKAZAN" || entry[3][1] === "REALIZOVAN"
                    ? { backgroundColor: "#cacccf", borderColor: "#cacccf" }
                    : {}
                }
              >
                Otkazi
              </button>
            </>
          </td>
        </>
      ) : tableType === "admissions" ? (
        <>
          <td style={{ width: "5%" }}>
            <>
              <button
                className={"searchCanceled"}
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonCanceled(entry);
                }}
                disabled={
                  entry[3][1] === "OTKAZAN" || entry[3][1] === "REALIZOVAN"
                }
                style={
                  entry[3][1] === "OTKAZAN" || entry[3][1] === "REALIZOVAN"
                    ? { backgroundColor: "#cacccf", borderColor: "#cacccf" }
                    : {}
                }
              >
                Otkazi
              </button>
            </>
          </td>
        </>
      ) : tableType === "referrals" ? (
        <>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIcon"
              onClick={(e) => {
                e.stopPropagation();
                handleButton("uputId", entry);
              }}
            >
              <ImBin />
            </button>
          </td>
        </>
      ) : tableType === "detailedResultPreview" ? (
        <>
          <td style={{ width: "10%" }}>
            <input
              type="text"
              placeholder="Rezultat"
              onChange={(e) => {
                onResultChange(e, entry);
              }}
            />
          </td>
          <td style={{ width: "5%" }}>
            <button
              className="buttonIconGreen"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(entry);
              }}
            >
              <ImCheckmark />
            </button>
          </td>
        </>
      ) : tableType === "unrealizedLabReferrals" ? (
        <>
          <td style={{ width: "5%" }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick(entry);
              }}
            >
              Kreiraj
            </button>
          </td>
        </>
      ) : tableType === "searchVisits" ? (
        <td style={{ width: "5%" }}>
          <>
            <button
              className={"searchCanceled"}
              onClick={(e) => {
                e.stopPropagation();
                handleButtonCanceled(entry);
              }}
              disabled={
                entry[4][1] === "OTKAZANO" || entry[4][1] === "ZAVRSENO"
              }
              style={
                entry[4][1] === "OTKAZANO" || entry[4][1] === "ZAVRSENO"
                  ? { backgroundColor: "#cacccf", borderColor: "#cacccf" }
                  : {}
              }
            >
              Otkazi
            </button>
          </>
        </td>
      ) : tableType === "labReports" ? (
        <td style={{ width: "5%" }}>
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                printReport(entry);
              }}
            >
              <FaPrint />
            </button>
          </>
        </td>
      ) : tableType === "admissionVisits" ? (
        <>
          {" "}
          <td style={{ width: "5%" }}>
            <button
              className={"searchCanceled"}
              onClick={(e) => {
                e.stopPropagation();
                handleButtonCanceled(entry);
              }}
              disabled={
                entry[4][1] === "OTKAZANO" || entry[4][1] === "ZAVRSENO"
              }
              style={
                entry[4][1] === "OTKAZANO" || entry[4][1] === "ZAVRSENO"
                  ? { backgroundColor: "#cacccf", borderColor: "#cacccf" }
                  : {}
              }
            >
              Otkazi
            </button>
          </td>{" "}
          <td style={{ width: "5%" }}>
            <button
              className={""}
              onClick={(e) => {
                e.stopPropagation();
                handleCreateLabReportTab1(entry);
              }}
              disabled={
                entry[4][1] === "OTKAZANO" || entry[4][1] === "ZAVRSENO"
              }
              style={
                entry[4][1] === "OTKAZANO" || entry[4][1] === "ZAVRSENO"
                  ? { backgroundColor: "#cacccf", borderColor: "#cacccf" }
                  : {}
              }
            >
              Nalog
            </button>
          </td>
        </>
      ) : (
        <></>
      )}
    </tr>
  ));
  const numberOfItems = listTable.length;
  const numberPerPage = 5;
  const pageLimit = 1;
  const numberOfPages = Math.ceil(numberOfItems / numberPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const trimStart = (currentPage - 1) * numberPerPage;
  const trimEnd = trimStart + numberPerPage;

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }
  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <div>
      <div className="responsivnes">
        <table className=" myTable table table-hover table-bordered">
          <thead className="header">
            <tr>{listHeaders}</tr>
          </thead>
          <tbody className="familyFix">
            {listTable.slice(trimStart, trimEnd)}
          </tbody>
        </table>
        <div>
          <nav className="myPagination" aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  onClick={goToPreviousPage}
                  className={`prev myPagButton ${
                    currentPage === 1 ? "disabled" : null
                  }`}
                >
                  <GrFormPrevious />
                </button>
              </li>
              <li className="page-item">
                {getPaginationGroup().map((item, index) => (
                  <button
                    key={index}
                    onClick={changePage}
                    className={`paginationItem myPagButton ${
                      currentPage === item ? "active" : null
                    }`}
                  >
                    <span>{item}</span>
                  </button>
                ))}
              </li>
              <li className="page-item">
                <button
                  onClick={goToNextPage}
                  className={`next myPagButton ${
                    currentPage === numberOfPages ? "disabled" : null
                  }`}
                >
                  <GrFormNext />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Table;
