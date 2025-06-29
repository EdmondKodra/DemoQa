Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Testimi i formës me validime të ndryshme në DemoQA', () => {

  it('Email bosh - duhet të shfaqë mesazh gabimi', () => {
    cy.visit('https://demoqa.com/automation-practice-form');

    cy.get('#firstName').type('Edmond');
    cy.get('#lastName').type('Kodra');
    cy.get('input[name="gender"][value="Male"]').check({ force: true });
    cy.get('#userNumber').type('1234567890');
    cy.get('#submit').click();

    cy.get('#userEmail:invalid').should('exist');
  });

  it('Emër me shumë hapësira ', () => {
    cy.visit('https://demoqa.com/automation-practice-form');

    cy.get('#firstName').type('Ed   mo   nd');
    cy.get('#lastName').type('Kodra');
    cy.get('#userEmail').type('edmond@test.com');
    cy.get('input[name="gender"][value="Male"]').check({ force: true });
    cy.get('#userNumber').type('1234567890');
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select('2000');
    cy.get('.react-datepicker__month-select').select('January');
    cy.get('.react-datepicker__day--015').click();
    cy.get('#subjectsInput').type('Maths{enter}');
    cy.get('label[for="hobbies-checkbox-1"]').click();
    cy.get('#uploadPicture').selectFile('cypress/fixtures/test.jpg');
    cy.get('#currentAddress').type('Rruga Test, Prishtinë');
    cy.get('#state').click();
    cy.contains('div', 'NCR').click();
    cy.get('#city').click();
    cy.contains('div', 'Delhi').click();
    cy.get('#submit').click();

    cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form');
    cy.get('#closeLargeModal').click({ force: true });
    cy.get('#firstName:invalid').should('exist');
  });

  it('Fusha blank - nuk duhet të lejojë dorëzim të formës', () => {
    cy.visit('https://demoqa.com/automation-practice-form');
    cy.get('#submit').click();
    cy.get('#firstName:invalid').should('exist');
    cy.get('#userEmail:invalid').should('exist');
    cy.get('#userNumber:invalid').should('exist');
  });

  it('Emër me karaktere dhe numra ', () => {
    cy.visit('https://demoqa.com/automation-practice-form');
    cy.get('#firstName').type('E23$@!dm');
    cy.get('#lastName').type('Kodra');
    cy.get('#userEmail').type('edmond@test.com');
    cy.get('input[name="gender"][value="Male"]').check({ force: true });
    cy.get('#userNumber').type('1234567890');
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select('2000');
    cy.get('.react-datepicker__month-select').select('January');
    cy.get('.react-datepicker__day--015').click();
    cy.get('#subjectsInput').type('Maths{enter}');
    cy.get('label[for="hobbies-checkbox-1"]').click();
    cy.get('#uploadPicture').selectFile('cypress/fixtures/test.jpg');
    cy.get('#currentAddress').type('Rruga Test, Prishtinë');
    cy.get('#state').click();
    cy.contains('div', 'NCR').click();
    cy.get('#city').click();
    cy.contains('div', 'Delhi').click();
    cy.get('#submit').click();

    cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form');
    cy.get('#closeLargeModal').click({ force: true });
    cy.get('#firstName:invalid').should('exist');
  });

  it('Testimi i fushës Subjects me karaktere jo të vlefshme', () => {
    cy.visit('https://demoqa.com/automation-practice-form');
    cy.get('#subjectsInput').type('@#$%{enter}');
    cy.get('.subjects-auto-complete__multi-value__label').should('not.exist');
    cy.get('#subjectsInput:invalid').should('exist');
  });

});
