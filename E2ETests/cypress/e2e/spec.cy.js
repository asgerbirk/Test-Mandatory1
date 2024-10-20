const BASE_URL = 'D:/Projects/TestManda/js_fake_info_frontend/index.html';


//cy.get('#txtNumberPersons') //For ID
//cy.get('input[value="Generate"]') //For value
//cy.get('.cprValue') //For class

beforeEach(() => {
  cy.visit(BASE_URL);
});

describe('CPR length test', () => {
  it('should verify CPR length is 10', () => {
    cy.get('#txtNumberPersons')
      .clear()
      .type('1');

    cy.get('input[value="Generate"]') 
      .click();

    cy.get('.cprValue')
      .invoke('text') 
      .should('have.length', 10); 
  });
});

describe('CPR gender consistency test', () => {
  it('should verify that the last digit of CPR is consistent with gender', () => {
    cy.get('#txtNumberPersons')
      .clear()
      .type('1');

    cy.get('input[value="Generate"]')
      .click();

    cy.get('.genderValue').invoke('text').then((gender) => {
      cy.get('.cprValue').invoke('text').then((cpr) => {
        const lastDigit = parseInt(cpr.slice(-1));
        if (gender === 'female') {
          expect(lastDigit % 2).to.equal(0);
        } else if (gender === 'male') {
          expect(lastDigit % 2).to.equal(1);
        }
      });
    });
  });
});


describe('Testing number of people', () => {
  it('should make sure the number of people is correct, lower and upper boundaries', () => {
    cy.get('#txtNumberPersons') 
      .clear()
      .type('99');
    cy.get('input[value="Generate"]') 
      .click();
    cy.get('article.personCard')
    .should('have.length', 99);

    cy.get('#txtNumberPersons') 
      .clear()
      .type('1');
    cy.get('input[value="Generate"]') 
      .click();
    cy.get('article.personCard')
    .should('have.length', 1);
  });
  it('Should test the upper boundary +1', () => {
    cy.get('#txtNumberPersons') 
    .clear()
    .type('101');
  cy.get('input[value="Generate"]') 
    .click();
    cy.get('#txtNumberPersons')
    .invoke('prop', 'validationMessage')
    .should('equal', 'Værdien skal være mindre end eller lig med 100.'); 
  });
  it('should test the lower boundary -1', () => {
    cy.get('#txtNumberPersons') 
    .clear()
    .type('0');
  cy.get('input[value="Generate"]') 
    .click();
    cy.get('#txtNumberPersons')
    .invoke('prop', 'validationMessage')
    .should('equal', 'Værdien skal være større end eller lig med 1.'); 
  });
});

describe('CPR structure test', () => {
  it('should verify that CPR has the correct structure', () => {
    cy.get('#txtNumberPersons')
      .clear()
      .type('1');

    cy.get('input[value="Generate"]')
      .click();

    cy.get('.cprValue')
      .invoke('text')
      .should('match', /^[0-9]{6}[0-9]{4}$/);
  });
});

describe('Phone number format test', () => {
  it('should verify that the phone number starts with a valid prefix and has correct length', () => {
    cy.get('#txtNumberPersons')
      .clear()
      .type('1');

    cy.get('input[value="Generate"]')
      .click();

    cy.get('.phoneNumberValue')
      .invoke('text')
      .should('match', /^(2|30|31|40|41|42|50|51|52|53|60|61|71|81|91|92|93|342|344|345|346|347|348|349|356|357|359|362|365|366|389|398|431|441|462|466|468|472|474|476|478|485|486|488|489|493|494|495|496|498|499)\d{6}$/);
  });
});

describe('Person name test', () => {
  it('should verify that the generated person\'s name exists in person-names.json', () => {
    cy.fixture('person-names.json').then((personNames) => {
      cy.get('#txtNumberPersons')
        .clear()
        .type('1');

      cy.get('input[value="Generate"]')
        .click();

      cy.get('.firstNameValue').invoke('text').then((firstName) => {
        cy.get('.lastNameValue').invoke('text').then((lastName) => {
          const exists = personNames.persons.some(
            (person) => person.firstName === firstName && person.lastName === lastName
          );
          expect(exists).to.be.true;
        });
      });
    });
  });
});
