import {
  FaHome,
  FaUserNurse,
  FaUser,
  FaPlusCircle,
  FaUserInjured,
  FaClipboardList,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { BiCalendarPlus } from "react-icons/bi";
import { MdCalendarToday, MdPersonSearch } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";

export const getSidebarLinks = (role, activeId) => {
  if (role === "admin") {
    return [
      {
        id: 1,
        text: "Pocetna",
        path: "/admin",
        icon: <FaHome />,
        isActive: activeId === 1 ? true : false,
      },
      {
        id: 2,
        text: "Zaposleni",
        path: "/admin/employee-preview",
        icon: <FaUserNurse />,
        isActive: activeId === 2 ? true : false,
      },
      {
        id: 3,
        text: "Nov zaposleni",
        path: "/admin/register-employee",
        icon: <FaPlusCircle />,
        dividerAfter: true,
        isActive: activeId === 3 ? true : false,
      },
      {
        id: 4,
        text: "Profil",
        path: "/profile",
        icon: <FaUser />,
        isActive: activeId === 4 ? true : false,
      },
    ];
  } else if (role === "nurse") {
    return [
      {
        id: 1,
        text: "Početna",
        path: "/nurse",
        icon: <FaHome />,
        isActive: activeId === 1 ? true : false,
      },
      {
        id: 2,
        text: "Pacijenti",
        path: "/nurse/patient-preview",
        icon: <FaUserInjured />,
        isActive: activeId === 2 ? true : false,
      },
      {
        id: 3,
        text: "Zakazivanje",
        path: "/nurse/schedule-appointment",
        icon: <BiCalendarPlus />,
        isActive: activeId === 3 ? true : false,
      },
      {
        id: 4,
        text: "Nov pacijent",
        path: "/nurse/register-patient",
        icon: <FaPlusCircle />,
        isActive: activeId === 4 ? true : false,
        dividerAfter: true,
      },
      {
        id: 5,
        text: "Zakazivanje prijema",
        path: "/nurse/infirmary/schedule-admission",
        icon: <FaBriefcaseMedical />,
        isActive: activeId === 5 ? true : false,
      },
      {
        id: 6,
        text: "Prijem pacijenata",
        path: "/nurse/infirmary/admission-of-patient",
        icon: <FaUserInjured />,
        isActive: activeId === 6 ? true : false,
      },
      {
        id: 7,
        text: "Pacijenti odeljenja",
        path: "/nurse/infirmary/patients-department",
        icon: <MdPersonSearch />,
        dividerAfter: true,
        isActive: activeId === 7 ? true : false,
      },
      {
        id: 8,
        text: "Profil",
        path: "/profile",
        icon: <FaUser />,
        isActive: activeId === 8 ? true : false,
      },
    ];
  } else if (role === "biochemist") {
    return [
      {
        id: 1,
        text: "Početna",
        path: "/biochemist",
        icon: <FaHome />,
        dividerAfter: true,
        isActive: activeId === 1 ? true : false,
      },
      {
        id: 2,
        text: "Profil",
        path: "/profile",
        icon: <FaUser />,
        isActive: activeId === 2 ? true : false,
      },
    ];
  } else if (role === "technician") {
    return [
      {
        id: 1,
        text: "Početna",
        path: "/technician",
        icon: <FaHome />,
        isActive: activeId === 1 ? true : false,
      },
      {
        id: 3,
        text: "Zakazivanje posete",
        path: "/technician/visits",
        icon: <FaPlusCircle />,
        isActive: activeId === 3 ? true : false,
      },
      {
        id: 2,
        text: "Prijem pacijenata",
        path: "/technician/patient-admission",
        icon: <FaUserInjured />,
        isActive: activeId === 2 ? true : false,
      },
      {
        id: 4,
        text: "Izdavanje rezultata",
        path: "/technician/issuing-results",
        icon: <GiNotebook />,
        dividerAfter: true,
        isActive: activeId === 4 ? true : false,
      },
      {
        id: 5,
        text: "Profil",
        path: "/profile",
        icon: <FaUser />,
        isActive: activeId === 5 ? true : false,
      },
    ];
  } else if (role === "technician") {
    return [
      {
        id: 1,
        text: "Početna",
        path: "/technician",
        icon: <FaHome />,
        isActive: activeId === 1 ? true : false,
      },
      {
        id: 2,
        text: "Prijem pacijenata",
        path: "/technician/patient-admission",
        icon: <FaUserInjured />,
        isActive: activeId === 2 ? true : false,
      },
      {
        id: 3,
        text: "Zakazivanje posete",
        path: "/technician/visits",
        icon: <BiCalendarPlus />,
        isActive: activeId === 3 ? true : false,
      },
      {
        id: 4,
        text: "Izdavanje rezultata",
        path: "/technician/issuing-results",
        icon: <FaClipboardList />,
        dividerAfter: true,
        isActive: activeId === 4 ? true : false,
      },
      {
        id: 5,
        text: "Profil",
        path: "/profile",
        icon: <FaUser />,
        isActive: activeId === 5 ? true : false,
      },
    ];
  } else if (role === "recepcionist") {
    return [
      {
        id: 1,
        text: "Početna",
        path: "/recepcionist",
        icon: <FaHome />,
        isActive: activeId === 1 ? true : false,
      },
      {
        id: 2,
        text: "Dodavanje pacijenta",
        path: "/recepcionist/add-patient",
        icon: <FaUserInjured />,
        isActive: activeId === 2 ? true : false,
      },
      {
        id: 3,
        text: "Zakazivanje pregleda",
        path: "/recepcionist/add-appointment",
        icon: <BiCalendarPlus />,
        isActive: activeId === 3 ? true : false,
      },
      {
        id: 5,
        text: "Poseta",
        path: "/recepcionist/visits",
        icon: <FaHome />,
        dividerAfter: true,
        isActive: activeId === 5 ? true : false,
      },
      {
        id: 6,
        text: "Profil",
        path: "/profile",
        icon: <FaUser />,
        isActive: activeId === 6 ? true : false,
      },
    ];
  } else {
    return [
      {
        id: 1,
        text: "Početna",
        path: "/",
        icon: <FaHome />,
        isActive: activeId === 1 ? true : false,
      },
      {
        id: 2,
        text: "Pacijenti",
        path: "/patient-preview",
        icon: <FaUserInjured />,
        isActive: activeId === 2 ? true : false,
      },
      {
        id: 3,
        text: "Zakazani pregledi",
        path: "/appointments",
        icon: <MdCalendarToday />,
        isActive: activeId === 3 ? true : false,
        dividerAfter: true,
      },
      {
        id: 6,
        text: "Pacijenti (stacionar)",
        path: "/stationary",
        icon: <FaUserInjured />,
        isActive: activeId === 6 ? true : false,
        dividerAfter: true,
      },
      {
        id: 4,
        text: "Profil",
        path: "/profile",
        icon: <FaUser />,
        isActive: activeId === 4 ? true : false,
      },
    ];
  }
};
