/// <reference types="cypress" />

import { sequentialTest } from '../utils';

describe('Check Student On Boarding functionality', () => {
  before(() => {
    cy.exec('yarn db:activation:clean').its('code').should('eq', 0);
  });
  afterEach(sequentialTest);

  it('student should be able to submit the getting started form', () => {
    cy.login('testuser3', 'P@ssword1');
    cy.get('body').should('include.text', 'Get Started');
    cy.get('#fullname').type('Test User 3');
    cy.get('#gradeLevel').select('Grade 10');
    cy.get('#school').click();
    cy.get('#chakra-modal-SchoolSelector_Modal').should('exist');
    cy.get('#SchoolFetch_Query').type('Abyot');
    cy.get('div[role="listitem"]').first().click();
    cy.get('#chakra-modal-SchoolSelector_Modal').should('not.exist');
    [1, 3, 4, 6, 7, 8].forEach((i) => {
      cy.get(`:nth-child(${i}) > .chakra-checkbox__control`).click();
    });
    cy.contains('button', 'Save').click();
    cy.get('body').should('include.text', 'Latest Notes for you');
  });
});
