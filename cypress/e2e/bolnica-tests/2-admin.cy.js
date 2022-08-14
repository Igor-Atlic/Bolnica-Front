/// <reference types="Cypress" />

const dayjs = require("dayjs");

describe("Admin", () => {
  beforeEach(() => {
    cy.loginAdmin();
  });

  afterEach(() => {
    //cy.pause();
  });

  it("Homepage information", () => {
    cy.get(".welcome-msg")
      .should("be.visible")
      .should("contain", "Dobro jutro");
    cy.get(".user-name").should("be.visible").should("contain", "Dr. Paun"); //localStorage.getItem('name'));
    cy.get(".user-title").should("be.visible").should("contain", "Kardiolog"); //localStorage.getItem('title'));
    cy.get(".date-span")
      .should("be.visible")
      .should("contain", dayjs().format("D MMMM, YYYY"));
  });

  it("Create new employee", () => {
    cy.get(".nav-item:nth-child(3) > .nav-link > .familyFix").click();
    cy.get(".form-group-custom:nth-child(3) > .margin-right").click();
    cy.get(".form-group-custom:nth-child(3) > .margin-right").type(
      "{backspace}"
    );
    cy.get(".form-group-custom:nth-child(3) > .margin-right").type(
      "{backspace}"
    );
    cy.get(".form-group-custom:nth-child(3) > .margin-right").type("Zaposleni");
    cy.get(".form-group-custom:nth-child(3) > .margin-left").type("Zaposleni");
    cy.get(".form-group-custom:nth-child(4) > .margin-right").type("zaposleni");
    cy.get(".form-group-custom:nth-child(4) > .margin-left").type(
      "zaposleniEmail@gmail.com"
    );
    cy.get(
      ".form-group-custom:nth-child(5) > .margin-right:nth-child(1)"
    ).click();
    cy.get(".form-group-custom:nth-child(5) > .margin-right:nth-child(1)").type(
      "2022-07-04"
    );
    cy.get(".form-group-custom:nth-child(5) > .margin-left:nth-child(2)").type(
      "Paunova"
    );
    cy.get(".form-group-custom:nth-child(5) > .margin-left:nth-child(3)").type(
      "Beograd"
    );
    cy.get(".form-group-custom:nth-child(6) > .margin-right").type(
      "0691160311"
    );
    cy.get(".form-group-custom:nth-child(6) > .margin-left").type(
      "1803999710084"
    );
    cy.get(".form-select-custom:nth-child(1)").select("Mag. farm.");
    cy.get(".form-select-custom:nth-child(2)").select("Spec. endrokrinolog");
    cy.get(".form-select-custom:nth-child(3)").select("1");
    cy.get("button:nth-child(14)").click();
  });

  it("Edit employee", () => {
    cy.get(".nav-item:nth-child(2) > .nav-link > .familyFix").click();
    cy.get(".buttonIconBlue").last().click();
    cy.get(".form-group-custom:nth-child(3) > .margin-right").type(
      "Zaposlenia"
    );
    cy.get("button:nth-child(10)").click();
    cy.get(".btn-secondary").click();
  });

  it("Search employees", () => {
    cy.get(".nav-item:nth-child(2) > .nav-link").click();
    cy.get(".form-group-custom:nth-child(1) > .margin-right").click();
    cy.get(".form-group-custom:nth-child(1) > .margin-right").type("admin");
    cy.get("button:nth-child(4)").click();
  });

  it("Edit profile", () => {
    cy.get(".nav-item:nth-child(4) > .nav-link").click();
    cy.get(".form-section-heading:nth-child(2) > .buttonIconBlue").click();
    cy.get(".form-group-custom:nth-child(3) > .margin-right").click();
    cy.get(".form-group-custom:nth-child(3) > .margin-right").type("admina");
    cy.get("button:nth-child(3)").click();
    cy.get(".btn-secondary").click();
  });

  it("Logout", () => {
    cy.get("button").should("be.visible").last().click();
  });
});
