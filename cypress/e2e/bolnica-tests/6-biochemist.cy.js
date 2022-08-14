/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Biochemist", () => {
  const lbp = "99999";

  beforeEach(() => {
    cy.loginAdmin(); //cy.loginBiochemist();
    cy.visit("http://localhost:3001/biochemist");
  });

  it("Pick and insert results", () => {
    cy.get("tr").eq(2).click();
    cy.get("tr:nth-child(1) input").type("4");
    cy.get("tr:nth-child(1) svg").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
    cy.wait(500);
    cy.get("tr:nth-child(2) input").click();
    cy.get("tr:nth-child(2) input").type("30");
    cy.get("tr:nth-child(2) .buttonIconGreen").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
    cy.wait(500);
    cy.get("button:nth-child(3)").click();
    cy.wait(500);
    cy.get(".btn-primary").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Profile update", () => {
    cy.get("ul").should("be.visible");
    cy.get(".nav-item:nth-child(2) > .nav-link > .familyFix")
      .should("be.visible")
      .should("contain", "Profil")
      .click({ multiple: true });
    cy.get("h1").should("be.visible").should("contain", "Profil");
    cy.get("form").should("be.visible");
    cy.get(".buttonIconBlue").first().click({ multiple: true });
    cy.get('input[name="surname"]')
      .should("be.visible")
      .clear()
      .type(chance.word());
    cy.get("body > #root > div > .form-custom > button").click({
      multiple: true,
    });
  });

  it("Logout", () => {
    cy.get(".logout-btn").should("be.visible").last().click();
  });
});
