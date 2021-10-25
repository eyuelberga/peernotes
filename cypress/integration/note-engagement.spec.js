import { sequentialTest } from '../utils';

describe('Check Note  Engagement functionality', () => {
  before(() => {
    cy.exec('yarn db:note:engagement:clean').its('code').should('eq', 0);
    cy.login('testuser1', 'P@ssword1');
  });
  afterEach(sequentialTest);
  it('should be able to un/like note', () => {
    // locate test note on search
    cy.get('input[role="search"]').first().clear().type('My Test Note {enter}');

    cy.get('body').should('include.text', 'Hello this is my test note');
    cy.get('div[role="article"]').first().click();
    cy.get('body').should('include.text', 'This is a test content');
    // should start unliked
    cy.get('svg[data-icon="thumbs-up"]')
      .last()
      .should('have.attr', 'data-prefix', 'far');
    cy.get('#NoteDisplay_Like').click();
    cy.get('#NoteDisplay_Like').should('not.be.disabled');
    // should now be solid icon
    cy.get('svg[data-icon="thumbs-up"]')
      .last()
      .should('have.attr', 'data-prefix', 'fas');
    // clicking the button again should unlike
    cy.get('#NoteDisplay_Like').click();
    cy.get('svg[data-icon="thumbs-up"]')
      .last()
      .should('have.attr', 'data-prefix', 'far');
  });
  it('should be able to un/bookmark note', () => {
    // start from previous test state
    // should not be bookmarked
    cy.get('svg[data-icon="bookmark"]')
      .last()
      .should('have.attr', 'data-prefix', 'far');
    cy.get('#NoteDisplay_Bookmark').click();
    cy.get('#NoteDisplay_Bookmark').should('not.be.disabled');
    // should now be solid
    cy.get('svg[data-icon="bookmark"]')
      .last()
      .should('have.attr', 'data-prefix', 'fas');
    // should also show up on reading-list page
    cy.sideNav('notes');
    cy.subNav('Reading List');
    cy.get('body').should('include.text', 'Hello this is my test note');
    cy.get('#NoteDisplay_Preview').click();
    cy.get('body').should('include.text', 'This is a test content');
    // should unbookmark
    cy.get('#NoteDisplay_Bookmark').click();
    cy.get('#NoteDisplay_Bookmark').should('not.be.disabled');
    // should now be regular
    cy.get('svg[data-icon="bookmark"]')
      .last()
      .should('have.attr', 'data-prefix', 'far');
  });
  it('student should be able to report note', () => {
    // start from prev test state
    cy.get('#NoteDisplay_Report').click();
    cy.get('#chakra-modal-NoteReport_Modal').should('exist');
    cy.get('#NoteReport_Type').select('COPYRIGHT');
    cy.get('#NoteReport_Description').type('This is my issue with this note');
    cy.get('#NoteReport_Submit').click();
    cy.get('#NoteReport_Submit').should('not.be.disabled');
    cy.get('#chakra-modal-NoteReport_Modal').should('not.exist');
  });
  it('pm should be able to reject a note report issue', () => {
    cy.login('testpm1', 'P@ssword1');
    cy.get('body').should('include.text', 'COPYRIGHT');
    cy.get('body').should('include.text', 'This is my issue with this note');
    cy.get('body').should('include.text', 'Hello this is my test note');
    cy.get('#NoteReportDisplay_Reject').click();
    cy.get('body').should('not.include.text', 'COPYRIGHT');
    cy.get('body').should(
      'not.include.text',
      'This is my issue with this note',
    );
    cy.get('body').should('not.include.text', 'Hello this is my test note');
  });
  it('pm should be able to accept a note report issue', () => {
    cy.exec('yarn db:note:resetreport').its('code').should('eq', 0);
    cy.reload();
    cy.get('body').should('include.text', 'COPYRIGHT');
    cy.get('body').should('include.text', 'This is my issue with this note');
    cy.get('body').should('include.text', 'Hello this is my test note');
    cy.get('#NoteReportDisplay_Accept').click();
    cy.get('body').should('not.include.text', 'COPYRIGHT');
    cy.get('body').should(
      'not.include.text',
      'This is my issue with this note',
    );
    cy.get('body').should('not.include.text', 'Hello this is my test note');
    cy.login('testuser1', 'P@ssword1');
    cy.get('input[role="search"]').first().clear().type('My Test Note {enter}');

    cy.get('body').should('not.include.text', 'Hello this is my test note');
  });
});
