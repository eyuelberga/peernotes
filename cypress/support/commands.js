import fileupload from 'cypress-file-upload';

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  cy.get('#logout')
    .click({ force: true })
    .then(() => {
      cy.get('.chakra-button').last().click();
      cy.get('#username').clear();
      cy.get('#username').type(username);
      cy.get('#password').clear();
      cy.get('#password').type(password);
      cy.get('.c6d7d2ace > .cd1df0865').click();
    });
});

Cypress.Commands.add('subNav', (name) => {
  cy.get('button[role="combobox"]').first().click({ force: true });
  cy.contains('button[role="menuitem"]', name).click({ force: true });
});

Cypress.Commands.add('sideNav', (name) => {
  const SideNavigation = (nav) => {
    const name = nav.toUpperCase();
    switch (name) {
      case 'NOTES':
        return `[href="/app/notes/manage"] > .chakra-linkbox > .chakra-stack > .chakra-linkbox__overlay`;
      case 'SESSIONS':
        return `[href="/app/sessions/feed"] > .chakra-linkbox > .chakra-stack > .chakra-linkbox__overlay`;
      case 'CONNECTIONS':
        return `[href="/app/connections/manage"] > .chakra-linkbox > .chakra-stack > .chakra-linkbox__overlay`;
      case 'PROFILE':
        return `[href="/app/me/profile"] > .chakra-linkbox > .chakra-stack > .chakra-linkbox__overlay`;
      default:
        return `[href="/app/feed"] > .chakra-linkbox > .chakra-stack > .chakra-linkbox__overlay`;
    }
  };

  cy.get(SideNavigation(name)).click({ force: true });
});

Cypress.Commands.add('getIframeBody', (selector) => {
  return cy
    .get(selector || 'iframe')
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
});

// support/commands.js
const COMMAND_DELAY = 500;

for (const command of [
  'get',
  'visit',
  'click',
  'trigger',
  'type',
  'clear',
  'reload',
  'contains',
]) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    const origVal = originalFn(...args);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
}
