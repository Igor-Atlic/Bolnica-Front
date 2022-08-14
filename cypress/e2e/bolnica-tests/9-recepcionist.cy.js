/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();
const dayjs = require("dayjs");

describe("Recepcionist", () => {
  beforeEach(() => {
    cy.loginAdmin(); //cy.loginRecepcionist();
    cy.visit("http://localhost:3001/recepcionist");
  });

  it("Create new patient", () => {
    cy.get(".nav-item:nth-child(2) > .nav-link > .familyFix").click();
    cy.get(".form-group-custom:nth-child(3) > .margin-right").click();
    cy.get(".form-group-custom:nth-child(3) > .margin-right").type(
      "{backspace}"
    );
    cy.get(".form-group-custom:nth-child(3) > .margin-right").type(
      "Novipacijent"
    );
    cy.get(".form-group-custom:nth-child(3) > .margin-left").type(
      "Novipacijent"
    );
    cy.get(".form-group-custom:nth-child(4) > .margin-right").type("Markovic");
    cy.get(".form-group-custom:nth-child(4) > .margin-left").type(
      "{backspace}"
    );
    cy.get(".form-group-custom:nth-child(4) > .margin-left").type(
      "{backspace}"
    );
    cy.get(".form-group-custom:nth-child(4) > .margin-left").type(
      "1802394781029"
    );
    cy.get(
      ".form-group-custom:nth-child(5) > .margin-right:nth-child(1)"
    ).click();
    cy.get(".form-group-custom:nth-child(5) > .margin-right:nth-child(1)").type(
      "2022-07-01"
    );
    cy.get(
      ".form-group-custom:nth-child(5) > .margin-left:nth-child(2)"
    ).click();
    cy.get(".form-group-custom:nth-child(5) > .margin-left:nth-child(2)").type(
      "Beograd"
    );
    cy.get(".form-group-custom:nth-child(5) > .margin-left:nth-child(3)").type(
      "Makedonska"
    );
    cy.get(".form-group-custom:nth-child(6) > .margin-right:nth-child(1)").type(
      "Beograd"
    );
    cy.get(".form-group-custom:nth-child(6) > .margin-left:nth-child(2)").type(
      "SRB"
    );
    cy.get(".form-group-custom:nth-child(6) > .margin-left:nth-child(3)").type(
      "SRB"
    );
    cy.get(".form-group-custom:nth-child(7) > .margin-right").type(
      "0611149311"
    );
    cy.get(".form-group-custom:nth-child(7) > .margin-left").type(
      "{backspace}"
    );
    cy.get(".form-group-custom:nth-child(7) > .margin-left").type(
      "pacijent@gmail.com"
    );
    cy.get(".form-group-custom:nth-child(8) > .margin-right").type("Dalibor");
    cy.get(".form-group-custom:nth-child(8) > .margin-left").type(
      "175739857298"
    );
    cy.get(".form-select-custom:nth-child(1)").select("RAZVEDENI");
    cy.get(".form-select-custom:nth-child(2)").select("UDOVICA");
    cy.get(
      ".form-group-custom:nth-child(10) > .margin-right:nth-child(1)"
    ).click();
    cy.get(
      ".form-group-custom:nth-child(10) > .margin-right:nth-child(1)"
    ).type("2");
    cy.get(
      ".form-group-custom:nth-child(10) > .margin-left:nth-child(2)"
    ).click();
    cy.get(".form-group-custom:nth-child(10) > .margin-left:nth-child(2)").type(
      "Moler"
    );
    cy.get(".form-select-custom:nth-child(3)").select("VISE");
    cy.get("button:nth-child(13)").click();
    cy.get(".btn-secondary").click();
  });

  it("Edit patient", () => {
    cy.get(".buttonIconBlue").eq(1).click();
    cy.get(".form-group-custom:nth-child(3) > .margin-right").type(
      "{backspace}"
    );
    cy.get(".form-group-custom:nth-child(3) > .margin-right").type("NOVI");
    cy.get("button:nth-child(11)").click();
  });

  it("Search patients", () => {
    cy.get(".form-group-custom:nth-child(1) > .margin-right").click();
    cy.get(".form-group-custom:nth-child(1) > .margin-right").type("Pac");
    cy.get("button:nth-child(3)").click();
  });

  it("Delete patient", () => {
    cy.wait(500);
    cy.get("tr:nth-child(2) .buttonIcon > svg").click();
    cy.wait(500);
    cy.get(".btn-primary").click();
  });

  it("Schedule appointment", () => {
    cy.get(".nav-item:nth-child(3) > .nav-link > .familyFix").click();
    cy.get(
      ".Kalend__ButtonIcon__container:nth-child(3) > .Kalend__ButtonIcon > .Kalend__ButtonIcon__svg-normal > g > g > rect"
    ).click();
    cy.get(
      ".Kalend__CalendarDesktopNavigation__buttons > .Kalend__button"
    ).click();
    cy.get(".Kalend__HeaderCalendarTitle__container > .Kalend__text")
      .should("be.visible")
      .should("contain", dayjs().format("MMMM YYYY"));

    cy.get("#Kalend__timetable").click();
    cy.get(".dropdown2 > .form-select").select(
      "237e9877-e79b-12d4-a765-321741963000"
    );
    cy.get(".my-save-btn").click();
    cy.wait(500);
    cy.get(".btn-secondary").click();
    cy.wait(500);
  });

  it("Delete appointment", () => {
    cy.get(".nav-item:nth-child(3) > .nav-link > .familyFix").click();
    cy.get("#Kalend__timetable").click();
    cy.get(".Kalend__Event__summary").click();
    cy.get(".delete-btn").click();
  });

  it("List history of vists / Add new", () => {
    cy.get("ul").should("be.visible");
    cy.get("ul > li:nth-child(4)")
      .should("be.visible")
      .should("contain", "Poseta")
      .click({ multiple: true });
    cy.url({ timeout: 10000 }).should("contain", "/recepcionist/visits");
    cy.get(".form-group-custom:nth-child(4) > .margin-right")
      .click()
      .type("99999");
    cy.get(".form-custom > button").click();
    cy.get(
      "tr:nth-child(1) > td > .buttonIconBlue > svg > line:nth-child(3)"
    ).click();
    cy.get(".form-group-custom:nth-child(3) > .margin-right")
      .click()
      .type(chance.name());
    cy.get(".form-group-custom:nth-child(3) > .margin-left")
      .click()
      .type(chance.name());
    cy.get(".form-group-custom:nth-child(4) > .margin-right")
      .click()
      .type(chance.integer({ min: 1000000000000, max: 9999999999999 }));
    cy.get(".form-group-custom:nth-child(4) > .margin-left")
      .click()
      .type(chance.sentence({ words: 3 }));
    cy.get(".form-custom > button").click();
  });

  it("Profile update", () => {
    cy.get("ul").should("be.visible");
    cy.get("ul > li:nth-child(5)")
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
