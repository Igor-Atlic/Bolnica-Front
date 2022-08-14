/// <reference types="Cypress" />

import Chance from "chance";
const chance = new Chance();

describe("Login", () => {
  const email = chance.email();
  const pass = "123456";

  beforeEach(() => {
    cy.visit("http://localhost:3001/login");
  });

  it("should display all components", () => {
    cy.get("form").should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get("button").should("be.visible");
    cy.get("a").should("be.visible");
  });

  it("should login with valid credentials", () => {
    //as admin
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("superadmin"); //.type("{enter}");
    cy.get("button").click();
    cy.url({ timeout: 10000 }).should("contain", "/admin");
    cy.title().should("eq", "Bolnica");
    //cy.getCookie('token').should('exist');
  });

  it("should login with invalid credentials", () => {
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type("1234567");
    cy.get("button").click();
    cy.url().should("include", "/login");
  });

  it("should display and use forgot password link", () => {
    cy.get("a").contains("Zaboravljena lozinka?").should("be.visible");
    cy.get("a").should("have.attr", "href", "/forgot-password").click();
    cy.visit("http://localhost:3001/forgot-password");
    cy.get("form").should("be.visible");
    cy.get('input[name="email"]').should("be.visible").type(email);
    cy.get("button").should("be.visible").click();
  });

  //TODO error messages for invalid credentials ---------------------------------------------------------------

  //   it("should display error message", () => {
  //     cy.get("p.error").should("not.be.visible");
  //   });

  //   it("should display error message when email is empty", () => {
  //     cy.get("button").click();
  //     cy.get("p.error").should("be.visible");
  //   });

  //   it("should display error message when password is empty", () => {
  //     cy.get('input[name="email"]').type(email);
  //     cy.get("button").click();
  //     cy.get("p.error").should("be.visible");
  //   });

  //   it("should display error message when email is invalid", () => {
  //     cy.get('input[name="email"]').type("invalid");
  //     cy.get('input[name="password"]').type(pass);
  //     cy.get("button").click();
  //     cy.get("p.error").should("be.visible");
  //   });

  //   it("should display error message when password is invalid", () => {
  //     cy.get('input[name="email"]').type(email);
  //     cy.get('input[name="password"]').type("invalid");
  //     cy.get("button").click();
  //     cy.get("p.error").should("be.visible");
  //   });

  //   it("should display error message when email and password are invalid", () => {
  //     cy.get('input[name="email"]').type("invalid");
  //     cy.get('input[name="password"]').type("invalid");
  //     cy.get("button").click();
  //     cy.get("p.error").should("be.visible");
  //   });

  //   it("should display error message when email is not found", () => {
  //     cy.get('input[name="email"]').type("Not found");
  //     cy.get('input[name="password"]').type(pass);
  //     cy.get("button").click();
  //     cy.get("p.error").should("be.visible");
  //   });

  //   it("should display error message when password is incorrect", () => {
  //     cy.get('input[name="email"]').type(email);
  //     cy.get('input[name="password"]').type("incorrect");
  //     cy.get("button").click();
  //     cy.get("p.error").should("be.visible");
  //   });

  //   it("should display error message when email and password are incorrect", () => {
  //     cy.get('input[name="email"]').type("incorrect");
  //     cy.get('input[name="password"]').type("incorrect");
  //     cy.get("button").click();
  //     cy.get("p.error").should("be.visible");
  //   });
});
