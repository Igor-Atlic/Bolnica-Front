/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();
const dayjs = require("dayjs");

describe("Doctor", () => {
  beforeEach(() => {
    cy.loginAdmin(); //cy.loginDoctor();
    cy.visit("http://localhost:3001/"); //-
  });

  afterEach(() => {
    //cy.pause();
  });

  it("Create new lab report", () => {
    cy.get(".nav-item:nth-child(4) > .nav-link").click();
    cy.get("tr").eq(1).click();
    cy.get(".form-group-custom:nth-child(5) > textarea").type("Nalaz");
    cy.get(".form-select-custom").select("J11");
    cy.get(".form-group-custom:nth-child(7) > textarea").click();
    cy.get(".form-group-custom:nth-child(7) > textarea").type("Terpaija");
    cy.get(".form-group-custom:nth-child(8) > textarea").click();
    cy.get(".form-group-custom:nth-child(8) > textarea").type("Savet");
    cy.get(".examSubmit").click();
    cy.wait(500);
    cy.get(".btn-primary").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Create stationary referral", () => {
    cy.get(".nav-item:nth-child(4) > .nav-link").click();
    cy.get("tr").eq(1).click();
    cy.get(".disabled").eq(3).click();
    cy.get(".form-group-custom:nth-child(5) > textarea").click();
    cy.get(".form-group-custom:nth-child(5) > textarea").type("Dijagnoza");
    cy.get(".form-group-custom:nth-child(6) > textarea").type("{backspace}");
    cy.get(".form-group-custom:nth-child(6) > textarea").type("{backspace}");
    cy.get(".form-group-custom:nth-child(6) > textarea").type("Anamneza");
    cy.get(".form-group-custom:nth-child(7) > textarea").type("Analize");
    cy.get(".form-group-custom:nth-child(8) > textarea").type("Tok bolesti");
    cy.get(".form-group-custom:nth-child(9) > textarea").type("Zakljucak");
    cy.get(".form-group-custom:nth-child(10) > textarea").type("Terapija");
    cy.get(".examSubmit").click();
    cy.wait(500);
    cy.get(".btn-primary").click();
    cy.wait(500);
  });

  it("Create lab referral", () => {
    cy.get(".nav-item:nth-child(4) > .nav-link").click();
    cy.get("tr").eq(1).click();
    cy.get(".disabled").eq(1).click();
    cy.get(".form-group-custom:nth-child(3) > .form-select-custom").select(
      "LABORATORIJA"
    );
    cy.get(".form-group-custom:nth-child(4) > .form-select-custom").select("1");
    cy.get(".form-group-custom:nth-child(4) > .margin-left").click();
    cy.get(".form-group-custom:nth-child(4) > .margin-left").type("Komentar");
    cy.get("input[type='checkbox']").eq(0).click();
    cy.get("input[type='checkbox']").eq(5).click();
    cy.get("button:nth-child(8)").click();
    cy.wait(500);
    cy.get(".btn-primary").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Create stationary referral", () => {
    cy.get(".nav-item:nth-child(4) > .nav-link").click();
    cy.get("tr").eq(1).click();
    cy.get(".disabled").eq(1).click();
    cy.get(".form-group-custom:nth-child(3) > .form-select-custom").select(
      "STACIONAR"
    );
    cy.get(".form-group-custom:nth-child(4) > .form-select-custom").select("1");
    cy.get(".margin-left:nth-child(2)").click();
    cy.get(".margin-left:nth-child(2)").type("asdf");
    cy.get(".form-group-custom:nth-child(5) > .form-select-custom").select(
      "I35.0"
    );

    cy.get("button:nth-child(6)").click();
    cy.wait(500);
    cy.get(".btn-primary").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });
});
