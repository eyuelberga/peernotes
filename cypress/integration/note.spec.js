/// <reference types="cypress" />

import { sequentialTest } from '../utils';

describe('Check Note Management functionality', () => {
  before(() => {
    cy.exec('yarn db:note:clean').its('code').should('eq', 0);
    cy.login('testuser1', 'P@ssword1');
  });
  afterEach(sequentialTest);

  it('should create a draft note', () => {
    const noteTitle = 'This is a test draft note';
    cy.sideNav('notes');
    cy.subNav('Create Note');
    cy.get('#NoteEditor_Title').type(noteTitle);
    cy.get('#NoteEditor_Description').type('This is a description');
    cy.get('#TopicSelector_Open').click();
    cy.get('#TopicFetch_Grade').select('9');
    cy.get('#TopicFetch_Subject').select('BIOLOGY');
    cy.get('#TopicFetch_Skeleton').should('not.exist');
    cy.get('#TopicFetch_Topic')
      .last()
      .select('e8a85f98-8e85-4627-ae82-b533c97ddc87\tBiology and technology');
    cy.get('#TopicFetch_Select').click();
    cy.get('div.ProseMirror').type('This is a test content');
    cy.get('#NoteEditor_Draft').click();
    cy.get('#NoteEditor_Draft').should('not.be.disabled');
    cy.sideNav('notes');
    cy.get('#NoteList').should('include.text', noteTitle);
  });
  it('should show content on  detail preview', () => {
    cy.sideNav('notes');
    cy.get('#NoteDisplay_Preview').click();
    cy.get('body').should('include.text', 'This is a test content');
  });
  it('should be able to update note data', () => {
    cy.sideNav('notes');
    cy.get('#NoteDisplay_Edit').click();
    cy.get('#NoteEditor_Title').clear();
    cy.get('#NoteEditor_Title').type('This is an updated Note');
    cy.get('#NoteEditor_Description').clear();
    cy.get('#NoteEditor_Description').type('This is an updated description');
    cy.get('div.ProseMirror').type('This is an updated  content');
    cy.get('#NoteEditor_Draft').click();
    cy.get('#NoteEditor_Draft').should('not.be.disabled');
    cy.sideNav('notes');
    cy.get('#NoteList').should('include.text', 'updated');
  });
  it('should be able to publish note', () => {
    cy.sideNav('notes');
    cy.get('#NoteDisplay_Edit').click();
    cy.get('#NoteEditor_Publish').click();
    cy.get('#NoteEditor_Publish').should('not.be.disabled');
    cy.sideNav('notes');
    cy.get('#NoteList').should('include.text', 'No Notes Found');
    cy.contains('button[role="tab"]', 'Published').click();
    cy.get('#NoteList').should('include.text', 'updated');
  });

  it('should be able to find published note on search', () => {
    cy.get('input[role="search"]')
      .first()
      .clear()
      .type('This is an updated Note {enter}');
    cy.get('body').should('include.text', 'This is an updated description');
  });

  it('should be able to delete note', () => {
    cy.sideNav('notes');
    cy.contains('button[role="tab"]', 'Published').click();
    cy.get('#NoteDisplay_Remove').click();
    cy.get('#NoteList').should('include.text', 'No Notes Found');
  });
  it('deleted note should not show up on search', () => {
    cy.wait(5000);
    cy.get('input[role="search"]')
      .first()
      .clear()
      .type('This is an updated {enter}');

    cy.get('body').should('not.include.text', 'This is an updated description');
  });
});
