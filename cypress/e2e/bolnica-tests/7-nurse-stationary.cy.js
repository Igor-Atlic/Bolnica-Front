/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();
const dayjs = require("dayjs");

describe("Nurse", () => {
  const lbp = "99999";

  beforeEach(() => {
    cy.loginAdmin(); //cy.loginNurse();
    cy.visit("http://localhost:3001/nurse");
  });

  it("Homepage information", () => {
    cy.get(".user-name").should("be.visible").should("contain", "Ana Reljic"); //localStorage.getItem('name'));
    cy.get(".user-title").should("be.visible").should("contain", "Med sestra"); //localStorage.getItem('title'));
    cy.get(".dropdown").click();
    cy.get(".dropdown-item").contains("Dr. Zaposleni").click();
    //...
  });

  it("Schedule, list and cancel an admission", () => {
    cy.get(".nav-item:nth-child(5) > .nav-link > .familyFix").click();
    cy.get(".form-select-custom").select(
      "237e9877-e79b-12d4-a765-321741963000"
    );
    cy.get(".margin-left").click();
    cy.get(".margin-left").type("2022-07-04");
    cy.get("textarea").click();
    cy.get("textarea").type("Napoemna");
    cy.get(".buttonForm").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
    cy.wait(500);
    cy.get(".searchCanceled").eq(0).click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Patient admission", () => {
    cy.get(".nav-item:nth-child(6) > .nav-link > .familyFix").click();
    cy.visit("http://localhost:3001/nurse/infirmary/admission-of-patient");
    cy.wait(500);
    cy.get(".inactive").click();
    cy.wait(500);
    cy.get(".form-select-custom").select(
      "237e9877-e79b-12d4-a765-321741963000"
    );
    cy.wait(500);
    cy.get(".buttonBlue").eq(0).click();
    cy.wait(500);
    cy.get(".buttonBlue").eq(1).click();
    cy.wait(500);
    cy.get("#dropdown-basic").click();
    cy.get(".dropdown-item").eq(0).click();
    cy.wait(500);
    cy.get(".margin-right").click();
    cy.wait(500);
    cy.get(".margin-right").type("Napooemna");
    cy.wait(500);
    cy.get("button:nth-child(2)").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Create new state", () => {
    cy.get(".nav-item:nth-child(7) > .nav-link > .familyFix").click();
    cy.get(".active").click();
    cy.get("tr").eq(1).click();
    cy.get(".disabled").eq(0).click();
    cy.get(
      ".form-group-custom:nth-child(1) > .margin-left:nth-child(1)"
    ).click();
    cy.get(".form-group-custom:nth-child(1) > .margin-left:nth-child(1)").type(
      "38"
    );
    cy.get(
      ".form-group-custom:nth-child(1) > .margin-left:nth-child(2)"
    ).click();
    cy.get(".form-group-custom:nth-child(1) > .margin-left:nth-child(2)").type(
      "120/80"
    );
    cy.get(
      ".form-group-custom:nth-child(2) > .margin-left:nth-child(1)"
    ).click();
    cy.get(".form-group-custom:nth-child(2) > .margin-left:nth-child(1)").type(
      "70"
    );
    cy.get(
      ".form-group-custom:nth-child(2) > .margin-left:nth-child(2)"
    ).click();
    cy.get(".form-group-custom:nth-child(2) > .margin-left:nth-child(2)").type(
      "Terapija"
    );
    cy.get(
      ".form-group-custom:nth-child(3) > .margin-left:nth-child(1)"
    ).click();
    cy.get(".form-group-custom:nth-child(3) > .margin-left:nth-child(1)").type(
      "{backspace}"
    );
    cy.get(".form-group-custom:nth-child(3) > .margin-left:nth-child(1)").type(
      "Opis tanja"
    );
    cy.get(
      ".form-group-custom:nth-child(3) > .margin-left:nth-child(2)"
    ).click();
    cy.get(".form-group-custom:nth-child(3) > .margin-left:nth-child(2)").type(
      "2022-07-04"
    );
    cy.get("button:nth-child(4)").click();

    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Create new visit and list visits", () => {
    cy.get(".nav-item:nth-child(7) > .nav-link > .familyFix").click();
    cy.get(".active").click();
    cy.get("tr").eq(1).click();
    cy.get(".disabled").eq(2).click();
    cy.get(".form-group-custom:nth-child(1) > .margin-left:nth-child(1)").type(
      "Markoo"
    );
    cy.get(
      ".form-group-custom:nth-child(1) > .margin-left:nth-child(2)"
    ).click();
    cy.get(".form-group-custom:nth-child(1) > .margin-left:nth-child(2)").type(
      "Markovic"
    );
    cy.get(
      ".form-group-custom:nth-child(2) > .margin-left:nth-child(1)"
    ).click();
    cy.get(".form-group-custom:nth-child(2) > .margin-left:nth-child(1)").type(
      "298347203942"
    );
    cy.get(
      ".form-group-custom:nth-child(2) > .margin-left:nth-child(2)"
    ).click();
    cy.get(".form-group-custom:nth-child(2) > .margin-left:nth-child(2)").type(
      "Napomena"
    );
    cy.get("button").eq(5).click();
    cy.wait(1500);
    cy.get(".btn-secondary").click();
  });
});
