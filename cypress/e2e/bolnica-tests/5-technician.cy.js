/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="Cypress" />

import { wait } from "@testing-library/user-event/dist/utils";
import Chance from "chance";
const chance = new Chance();
const dayjs = require("dayjs");

describe("Technician", () => {
  const lbp = "99999";

  beforeEach(() => {
    cy.loginAdmin(); //cy.loginTechnician();
    cy.visit("http://localhost:3001/technician");
  });

  it("Schedule, list and cancel visit", () => {
    cy.get(".nav-item:nth-child(2) > .nav-link > .familyFix").click();
    cy.get(".form-select-custom").select(
      "237e9877-e79b-12d4-a765-321741963000"
    );
    cy.get(".margin-right:nth-child(2)").click();
    cy.get(".margin-right:nth-child(2)").type("2022-07-04");
    cy.get("textarea").click();
    cy.get("textarea").type("Napoemna");
    cy.get(".buttonForm:nth-child(2)").click();
    cy.wait(500);
    cy.get(".btn-primary").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
    cy.wait(500);
    cy.get(".searchCanceled").eq(0).click();
    cy.wait(500);
    cy.get(".btn-primary").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Create work order", () => {
    cy.get(".nav-item:nth-child(3) > .nav-link > .familyFix").click();
    cy.get(".inactive").click();
    cy.get(".form-select-custom").select(
      "237e9877-e79b-12d4-a765-321741963000"
    );
    cy.get("td > button").eq(0).click();
    cy.wait(500);
    cy.get(".btn-primary").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
  });

  it("Profile update", () => {
    cy.get("ul").should("be.visible");
    cy.get("ul > li:nth-child(5)")
      .should("be.visible")
      .should("contain", "Profil")
      .click({ multiple: true });
    cy.get("h1").should("be.visible").should("contain", "Profil");
    cy.get("form").should("be.visible");
    cy.get(".buttonIconBlue").click({ multiple: true });
    cy.get('input[name="surname"]')
      .should("be.visible")
      .clear()
      .type(chance.word());
    cy.get("body > #root > div > .form-custom > button").click({
      multiple: true,
    });
  });

  it("Logout", () => {
    cy.get("button").should("be.visible").last().click();
  });
});
