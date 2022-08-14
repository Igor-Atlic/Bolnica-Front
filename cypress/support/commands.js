// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//ADMIN
Cypress.Commands.add("loginAdmin", () => {
  cy.visit("http://localhost:3001/login");
  cy.get('input[name="email"]').type("test@gmail.com");
  cy.get('input[name="password"]').type("superadmin"); //.type("{enter}");
  cy.get("button").click();
  cy.url({ timeout: 10000 }).should("contain", "/admin");
});

Cypress.Commands.add("loginAdminBetter", () => {
  //TBD
  cy.request({
    method: "POST",
    url: "http://localhost:9092/bolnica-user-service/api/login",
    body: {
      email: "test@gmail.com",
      password: "superadmin",
    },
  }).then((response) => {
    localStorage.setItem("token", response.body.token);
  });
});

//DOCTOR

//NURSE

//...
