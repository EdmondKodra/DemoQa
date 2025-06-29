Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // shmang error-in nga ad popups
});

describe('Testimi i Alerts te DemoQA', () => {

  it('Teston Alert - You clicked a button', () => {
    cy.visit('https://demoqa.com/alerts');
    
    // Stub per alert
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    cy.get('#alertButton').click();

    cy.get('@alertStub').should('have.been.calledOnceWith', 'You clicked a button');
  });

  it('Teston Confirm - Klikim OK', () => {
    cy.visit('https://demoqa.com/alerts');
    
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(true); // Klik OK
    });

    cy.get('#confirmButton').click();
    cy.get('#confirmResult').should('contain', 'You selected Ok');
  });

  it('Teston Confirm - Klikim Cancel', () => {
    cy.visit('https://demoqa.com/alerts');
    
    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(false); // Klik Cancel
    });

    cy.get('#confirmButton').click();
    cy.get('#confirmResult').should('contain', 'You selected Cancel');
  });

  it('Teston Prompt - Shtyp tekst dhe OK', () => {
    cy.visit('https://demoqa.com/alerts');

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Edmond'); // Vendos tekst
    });

    cy.get('#promtButton').click();
    cy.get('#promptResult').should('contain', 'Edmond');
  });

  it('Teston Alert me vonesë', () => {
    cy.visit('https://demoqa.com/alerts');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('delayedAlert');
    });

    cy.get('#timerAlertButton').click();
    cy.wait(6000); // Prit 6 sekonda që alert të shfaqet
    cy.get('@delayedAlert').should('have.been.calledWith', 'This alert appeared after 5 seconds');
  });

});