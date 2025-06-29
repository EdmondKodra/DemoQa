describe('Testimi i butonave në demoqa.com', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false; // injoro gabimet e cross-origin
  });

  beforeEach(() => {
    cy.visit('https://demoqa.com/buttons');
  });

  it('Teston Double Click Button', () => {
    cy.get('#doubleClickBtn').dblclick();
    cy.get('#doubleClickMessage').should('contain', 'You have done a double click');
  });

  it('Teston Right Click Button', () => {
    cy.get('#rightClickBtn').rightclick();
    cy.get('#rightClickMessage').should('contain', 'You have done a right click');
  });

  it('Teston Dynamic Click Button (normal click)', () => {
  cy.get('div.mt-4 > button')
    .last()
    .scrollIntoView()
    .click({ force: true });

  cy.get('#dynamicClickMessage')
    .should('contain', 'You have done a dynamic click');
});

});