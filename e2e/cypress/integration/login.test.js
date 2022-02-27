import { adminUser, disabledUser } from '../support/users';


describe('Login tests', function () {

  before(function () {
    cy.request('POST', `${Cypress.env('api_base')}/reset/full`);
  });

  beforeEach(function () {
    cy.visit(Cypress.env('web_base'));
  });

  it('Login form displays error with empty fields', function () {

    // focus & blur username
    cy.get('#login-username').focus().blur();
    cy.get('#LoginForm').contains('Username required');

    // focus & blur password
    cy.get('#login-password').focus().blur();
    cy.get('#LoginForm').contains('Password required');

  });

  it('Login form gives proper error with invalid credentials', function () {

    // Invalid username & password
    cy.get('#login-username').should('be.visible').type(adminUser.name);
    cy.get('#login-password').should('be.visible').type(adminUser.password);
    cy.get('#login-submit').should('be.visible').click();
    cy.get('#LoginFormError').contains('invalid username or password').should('have.css', 'color', 'rgb(255, 0, 0)');

    // clear form
    cy.get('[type="text"]').clear();
    cy.get('[type="password"]').clear();

    // Disabled account
    cy.get('#login-username').type(disabledUser.username);
    cy.get('#login-password').type(disabledUser.password);
    cy.get('#login-submit').click();
    cy.get('#LoginFormError').contains('account has been disabled');

    // click should remove the error-message
    cy.get('#LoginFormError').click();
    // https://stackoverflow.com/questions/65309568/cypress-check-for-an-empty-element
    cy.get('#LoginFormError').should((element) => {
      expect(element.text().trim()).equal('');
    });

  });

  it('Login succeeds with proper credentials', function() {

    // Login admin
    cy.get('#login-username').type(adminUser.username);
    cy.get('#login-password').type(adminUser.password);
    cy.get('#login-submit').click();

    // Content should contains admins name
    cy.get('#Content').contains(adminUser.name);

  });

});