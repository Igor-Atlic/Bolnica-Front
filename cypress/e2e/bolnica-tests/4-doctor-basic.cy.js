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

  it("Examination", () => {
    cy.get(".justify-content-around").click();
    cy.wait(3000);
    cy.get(".btn-primary").click();
    cy.wait(3000);
    cy.get(".form-group-custom:nth-child(7) > textarea").type("Glavne tegobe");
    cy.get(".form-group-custom:nth-child(8) > textarea").type("Bolest");
    cy.get(".form-group-custom:nth-child(9) > textarea").type("Licna");
    cy.get(".form-group-custom:nth-child(10) > textarea").type("Porodicna");
    cy.get(".form-group-custom:nth-child(11) > textarea").type("Milsijenje");
    cy.get(".form-group-custom:nth-child(13) > textarea").click();
    cy.get(".form-group-custom:nth-child(13) > textarea").type(
      "Objektivni nalaz"
    );
    cy.get(".form-group-custom:nth-child(16) > textarea").click();
    cy.get(".form-group-custom:nth-child(16) > textarea").type("{backspace}");
    cy.get(".form-group-custom:nth-child(16) > textarea").type("Teprija");
    cy.get(".form-group-custom:nth-child(17) > textarea").click();
    cy.get(".form-group-custom:nth-child(17) > textarea").type("Savet");
    cy.get(".examSubmit:nth-child(18)").click();
    cy.get(".btn-primary").eq(1).click();
  });

  it("Search patients", () => {
    cy.get(".nav-item:nth-child(2) > .nav-link > .familyFix").click();
    cy.get(".form-group-custom:nth-child(1) > .margin-right").click();
    cy.get(".form-group-custom:nth-child(1) > .margin-right").type("Pac");
    cy.get("button:nth-child(3)").click();
  });

  it("Create lab referral", () => {
    cy.get(".nav-item:nth-child(2) > .nav-link > .familyFix").click();
    cy.get("td").eq(0).click();
    cy.get(".btn-outline-primary").eq(1).click();
    cy.get(".form-group-custom:nth-child(3) > .form-select-custom").select(
      "LABORATORIJA"
    );
    cy.get(".form-group-custom:nth-child(4) > .form-select-custom").select("1");
    cy.get(".form-group-custom:nth-child(4) > .margin-left").click();
    cy.get(".form-group-custom:nth-child(4) > .margin-left").type("Komentar");
    cy.get("input[type='checkbox']").eq(0).click();
    cy.get("input[type='checkbox']").eq(5).click();
    cy.get("button:nth-child(8)").click();
    cy.get(".btn-primary:nth-child(1)").click();
  });

  it("Add new alergent", () => {
    cy.get(".nav-item:nth-child(2) > .nav-link > .familyFix").click();
    cy.get("td").eq(0).click();
    cy.get("form > .form-select-custom").select("Cefalosporin");
    cy.get("form:nth-child(1) > .small-button").click();
    cy.wait(500);
    cy.get(".btn-primary").eq(2).click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Add new vaccine", () => {
    cy.get(".nav-item:nth-child(2) > .nav-link > .familyFix").click();
    cy.get("td").eq(0).click();
    cy.get(".form-select-custom:nth-child(1)").select("INFLUVAC");
    cy.get(".form-group-custom:nth-child(2) > .margin-left").click();
    cy.get(".form-group-custom:nth-child(2) > .margin-left").type("2022-07-04");
    cy.get("form:nth-child(2) > .small-button").click();
    cy.wait(500);
    cy.get(".btn-primary").eq(2).click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Change patient medical data", () => {
    cy.get(".nav-item:nth-child(2) > .nav-link > .familyFix").click();
    cy.get("td").eq(0).click();
    cy.get(".small-button:nth-child(7)").click();
    cy.get(".patient-info-text:nth-child(1) > .form-select-custom").select("B");
    cy.get(".patient-info-text:nth-child(2) > .form-select-custom").select(
      "PLUS"
    );
    cy.get(".small-button:nth-child(9)").click();
    cy.wait(500);
    cy.get(".btn-primary").eq(2).click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Create stationary referral", () => {
    cy.get(".nav-item:nth-child(2) > .nav-link > .familyFix").click();
    cy.get("td").eq(0).click();
    cy.get(".btn-outline-primary").eq(1).click();
    cy.get(".form-group-custom:nth-child(3) > .form-select-custom").select(
      "STACIONAR"
    );
    cy.get(".margin-right").select("1");
    cy.get(".margin-left").click();
    cy.get(".margin-left").type("komentar");
    cy.get(".form-group-custom:nth-child(5) > .form-select-custom").select(
      "K70.3"
    );
    cy.get("button:nth-child(6)").click();
    cy.get(".btn-primary:nth-child(1)").click();
  });

  it("List appointments", () => {
    cy.get("ul").should("be.visible");
    cy.get("ul > li:nth-child(3)")
      .should("be.visible")
      .should("contain", "Zakazani pregledi")
      .click({ multiple: true });
    cy.url({ timeout: 10000 }).should("contain", "/appointments");
  });

  it("Logout", () => {
    cy.get("button").should("be.visible").last().click();
  });
});
