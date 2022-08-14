export const getTableHeaders = (contentType) => {
  if (contentType === "employeePreview") {
    return [
      {
        key: "name",
        value: "Ime",
      },
      {
        key: "surname",
        value: "Prezime",
      },
      {
        key: "lbz",
        value: "LBZ",
      },
      {
        key: "dob",
        value: "Datum rodjenja",
      },
      {
        key: "contact",
        value: "Kontakt",
      },
      {
        key: "email",
        value: "Email",
      },
      {
        key: "title",
        value: "Titula",
      },
      {
        key: "profession",
        value: "Zanimanje",
      },
    ];
  } else if (contentType === "patientPreview") {
    return [
      {
        key: "ime",
        value: "Ime",
      },
      {
        key: "prezime",
        value: "Prezime",
      },
      {
        key: "datumRodjenja",
        value: "Datum rodjenja",
      },
      {
        key: "jmbg",
        value: "Jmbg",
      },
      {
        key: "kontaktTelefon",
        value: "Kontakt",
      },
      {
        key: "email",
        value: "Email",
      },
      {
        key: "lbp",
        value: "LBP",
      },
    ];
  } else if (contentType === "departmentPatients") {
    return [
      {
        key: "lbpPacijenta",
        value: "LBP",
      },
      {
        key: "ime",
        value: "Ime",
      },
      {
        key: "prezime",
        value: "Prezime",
      },
      {
        key: "jmbg",
        value: "JMBG",
      },
    ];
  } else if (contentType === "medicalReports") {
    return [
      {
        key: "datumVremeKreiranja",
        value: "Datum",
      },
      {
        key: "objektivniNalaz",
        value: "Objektivni nalaz",
      },
      {
        key: "dijagnoza",
        value: "Dijagnoza",
      },
      {
        key: "predlozenaTerapija",
        value: "Predlozena terapija",
      },
      {
        key: "savet",
        value: "Savet",
      },
    ];
  } else if (contentType === "patientsHistory") {
    return [
      {
        key: "stanjePacijenta",
        value: "ID",
      },
      {
        key: "lbpPacijenta",
        value: "LBP",
      },
      {
        key: "lbzPacijenta",
        value: "LBZ",
      },
      {
        key: "datumPregleda",
        value: "Datum",
      },
      {
        key: "temperatura",
        value: "Temperatura",
      },
      {
        key: "krvniPritisak",
        value: "Krvni pritisak",
      },
      {
        key: "puls",
        value: "Puls",
      },
      {
        key: "primenjeneTerapije",
        value: "Primenjene terapije",
      },
      {
        key: "opis",
        value: "Opis",
      },
    ];
  } else if (contentType === "patientsVisits") {
    return [
      {
        key: "datumVreme",
        value: "Datum",
      },
      {
        key: "imePosetioca",
        value: "Ime posetioca",
      },
      {
        key: "prezimePosetioca",
        value: "Prezime posetioca",
      },
      {
        key: "jmbgPosetioca",
        value: "JMBG",
      },
      {
        key: "napomena",
        value: "Napomena",
      },
    ];
  } else if (contentType === "examinationHistory") {
    return [
      {
        key: "datumPregleda",
        value: "Datum",
      },
      {
        key: "glavneTegobe",
        value: "Glavne tegobe",
      },
      {
        key: "objektivniNalaz",
        value: "Objektivni nalaz",
      },
    ];
  } else if (contentType === "dischargeLists") {
    return [
      {
        key: "analize",
        value: "Analize",
      },
      {
        key: "anamneza",
        value: "Anamneza",
      },
      {
        key: "prateceDijagnoze",
        value: "Preteće dijagnoze",
      },
      {
        key: "terapija",
        value: "Terapija",
      },
      {
        key: "tokBolesti",
        value: "Tok bolesti",
      },
      {
        key: "zakljucak",
        value: "Zaključak",
      },
    ];
  } else if (contentType === "patientStates") {
    return [
      {
        key: "datumVreme",
        value: "Datum",
      },
      {
        key: "temperatura",
        value: "Temperatura",
      },
      {
        key: "krvniPritisak",
        value: "Krvni pritisak",
      },
      {
        key: "puls",
        value: "Puls",
      },
      {
        key: "primenjeneTerapije",
        value: "Primenjene terapije",
      },
      {
        key: "opis",
        value: "Opis stanja",
      },
    ];
  } else if (contentType === "diseaseHistory") {
    return [
      {
        key: "dijagnoza",
        value: "Dijagndoza",
      },
      {
        key: "pocetak",
        value: "Pocetak",
      },
      {
        key: "zavrsetak",
        value: "Zavrsetak",
      },
      {
        key: "rezultatLecenja",
        value: "Rezultat lecenja",
      },
      {
        key: "tekuceStanje",
        value: "Tekuce stanje",
      },
      {
        key: "validanOd",
        value: "Validan od",
      },
      {
        key: "validanDo",
        value: "Validan do",
      },
    ];
  } else if (contentType === "labReportPreview") {
    return [
      {
        key: "laboratorijskiRadniNalogId",
        value: "ID izvestaja",
      },
      {
        key: "datumVremeKreiranja",
        value: "Datum kreiranja",
      },
      {
        key: "statusObrade",
        value: "Status obrade",
      },
      {
        key: "ime",
        value: "Ime",
      },
      {
        key: "prezime",
        value: "Prezime",
      },
    ];
  } else if (contentType === "patientAdmissions") {
    return [
      {
        key: "datumVremePrijema",
        value: "Datum prijema",
      },
      {
        key: "uputnaDijagnoza",
        value: "Uputna dijagnoza",
      },
      {
        key: "ime",
        value: "Ime",
      },
      {
        key: "prezime",
        value: "Prezime",
      },
      {
        key: "jmbg",
        value: "JMBG",
      },
      {
        key: "lbp",
        value: "lbp",
      },
    ];
  } else if (contentType === "scheduledVisits") {
    return [
      {
        key: "zakazanLaboratorijskiPregledId",
        value: "Id",
      },
      {
        key: "lbp",
        value: "LBP",
      },
      {
        key: "lbz",
        value: "LBZ",
      },
      {
        key: "odeljenjeId",
        value: "Id odeljenja",
      },
      {
        key: "zakazanDatum",
        value: "Datum pregleda",
      },
      {
        key: "statusPregleda",
        value: "Status pregleda",
      },
      {
        key: "napomena",
        value: "Napomena",
      },
    ];
  } else if (contentType === "referrals") {
    return [
      {
        key: "uputId",
        value: "Id uputa",
      },
      {
        key: "tip",
        value: "Tip",
      },
      {
        key: "datumVremeKreiranja",
        value: "Datum",
      },
      {
        key: "komentar",
        value: "Komentar",
      },
      {
        key: "name",
        value: "Ime",
      },
      {
        key: "surname",
        value: "Prezime",
      },
      {
        key: "izOdeljenjaNaziv",
        value: "Iz odeljenja",
      },
      {
        key: "zaOdeljenjeNaziv",
        value: "Za odeljenje",
      },
    ];
  } else if (contentType === "unrealizedLabReferrals") {
    return [
      {
        key: "tip",
        value: "Tip",
      },
      {
        key: "datumVremeKreiranja",
        value: "Datum",
      },
      {
        key: "komentar",
        value: "Komentar",
      },
      {
        key: "name",
        value: "Ime",
      },
      {
        key: "surname",
        value: "Prezime",
      },
      {
        key: "izOdeljenjaNaziv",
        value: "Iz odeljenja",
      },
      {
        key: "zaOdeljenjeNaziv",
        value: "Za odeljenje",
      },
      {
        key: "uputId",
        value: "Uput ID",
      },
    ];
  } else if (contentType === "referralsStationary") {
    return [
      {
        key: "tip",
        value: "Tip",
      },
      {
        key: "datumVremeKreiranja",
        value: "Datum",
      },
      {
        key: "komentar",
        value: "Komentar",
      },
      {
        key: "uputnaDijagnoza",
        value: "Dijagnoza",
      },
      {
        key: "name",
        value: "Ime",
      },
      {
        key: "surname",
        value: "Prezime",
      },
      {
        key: "izOdeljenjaNaziv",
        value: "Iz odeljenja",
      },
      {
        key: "zaOdeljenjeNaziv",
        value: "Za odeljenje",
      },
      {
        key: "uputId",
        value: "Uput ID",
      },
    ];
  } else if (contentType === "unrealizedReferrals") {
    return [
      {
        key: "id",
        value: "ID uputa",
      },
      {
        key: "lekar",
        value: "Ime i prezime lekara",
      },
      {
        key: "datumVreme",
        value: "Datum i vreme kreiranja uputa",
      },
      {
        key: "odeljenje",
        value: "Odeljenje",
      },
      {
        key: "dijagnoza",
        value: "Dijagnoza",
      },
      {
        key: "odabir",
        value: "Odabir uputa",
      },
    ];
  } else if (contentType === "labVisits") {
    return [
      {
        key: "id",
        value: "Id lab pregleda",
      },
      {
        key: "lbpPacijenta",
        value: "LBP",
      },
      {
        key: "lbzTehnicara",
        value: "LBZ",
      },
      {
        key: "napomena",
        value: "Napomena",
      },
      {
        key: "datumPregleda",
        value: "Datum",
      },
      {
        key: "statusPregledaZakazaniPacijenti",
        value: "Status pregleda",
      },
    ];
  } else if (contentType === "detailedResultPreview") {
    return [
      {
        key: "skracenica",
        value: "Naziv analize",
      },
      {
        key: "parametarId",
        value: "ID parametra",
      },
      {
        key: "nazivParametra",
        value: "Naziv parametra",
      },
      {
        key: "jedinicaMere",
        value: "Jedinica mere",
      },
      {
        key: "donjaGranica",
        value: "Donja granica",
      },
      {
        key: "gornjaGranica",
        value: "Gornja granica",
      },
      {
        key: "name",
        value: "Ime lekara",
      },
      {
        key: "surname",
        value: "Prezime lekara",
      },
    ];
  } else if (contentType === "issuingResults") {
    return [
      {
        key: "skracenica",
        value: "Naziv analize",
      },
      {
        key: "parametarId",
        value: "ID parametra",
      },
      {
        key: "nazivParametra",
        value: "Naziv parametra",
      },
      {
        key: "jedinicaMere",
        value: "Jedinica mere",
      },
      {
        key: "donjaGranica",
        value: "Donja granica",
      },
      {
        key: "gornjaGranica",
        value: "Gornja granica",
      },
      {
        key: "rezultat",
        value: "Rezultat",
      },
      {
        key: "name",
        value: "Ime lekara",
      },
      {
        key: "surname",
        value: "Prezime lekara",
      },
    ];
  } else if (contentType === "visitPreview") {
    return [
      {
        key: "idOdeljenja",
        value: "ID Odeljenja",
      },
      {
        key: "nazivOdeljenja",
        value: "Naziv odeljenja",
      },
      {
        key: "idSobe",
        value: "ID Sobe",
      },
      {
        key: "lbp",
        value: "LBP",
      },
      {
        key: "ime",
        value: "Ime",
      },
      {
        key: "prezime",
        value: "Prezime",
      },
      {
        key: "jmbg",
        value: "JMBG",
      },
    ];
  } else if (contentType === "patientsAdmissions") {
    return [
      {
        key: "id",
        value: "ID zakazanog termina",
      },
      {
        key: "lbpNumber",
        value: "LBP",
      },
      {
        key: "departmentId",
        value: "ID odeljenja",
      },
      {
        key: "datumVreme",
        value: "Datum i vreme prijema",
      },
      {
        key: "pacijent",
        value: "Ime i prezime pacijenta",
      },
      {
        key: "statusPrijemZakazaniPacijent",
        value: "Status termina",
      },
      {
        key: "komentarStacionar",
        value: "",
      },
    ];
  } else if (contentType === "admissions") {
    return [
      {
        key: "lbpPacijenta",
        value: "LBP",
      },
      {
        key: "zakazaniTerminPrijemaId",
        value: "ID prijema",
      },
      {
        key: "datumVremePrijema",
        value: "Datum",
      },
      {
        key: "statusTermina",
        value: "Status prijema",
      },
      {
        key: "napomena",
        value: "Napomena",
      },
      {
        key: "ime",
        value: "Ime pacijenta",
      },
      {
        key: "prezime",
        value: "Prezime pacijenta",
      },
      {
        key: "naziv",
        value: "Odeljenje",
      },
    ];
  } else if (contentType === "hospitalRoom") {
    return [
      {
        key: "id",
        value: "ID sobe",
      },
      {
        key: "departmentId",
        value: "ID odeljenja",
      },
      {
        key: "roomNumber",
        value: "Broj sobe",
      },
      {
        key: "roomName",
        value: "Naziv sobe",
      },
      {
        key: "capacity",
        value: "Kapacitet",
      },
      {
        key: "occupancy",
        value: "Popunjenost",
      },
      {
        key: "odaberiSobu",
        value: "",
      },
    ];
  }
  return [];
};
