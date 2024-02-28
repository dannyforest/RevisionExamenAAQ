const generateSomeTasks = (count: number) => {
  for (let i = 0; i < count; i++) {
    cy.get('.new-todo').type(`${i}{enter}`);
  }
}

describe('template spec', () => {
  beforeEach(() => {
      cy.visit('https://todomvc.com/examples/vue/dist/#/');
  })

  describe('adding tasks', () => {
    it('should add a task', () => {
      cy.get('.new-todo').type('Learn Cypress{enter}');
      cy.get('.view > label').should('have.length', 1);
      cy.get('.view > label').should('have.text', 'Learn Cypress');
    })

    it('should add multiple task', () => {
      generateSomeTasks(10);
      cy.get('.view > label').should('have.length', 10);
    })
  })

  describe('removing tasks', () => {
    it('should remove a task', () => {
      generateSomeTasks(3);

      cy.get('.view > label').eq(0).trigger('mouseover');
      // TODO: There is a race condition here
      cy.get('.destroy').eq(0).click();

      cy.get('.view > label').should('have.length', 2);
    })
  })

  describe('complete tasks', () => {
    it('should toggle a task completed', () => {
      generateSomeTasks(3);

      cy.get(':nth-child(1) > .view > .toggle').check();

      cy.get('.todo-count').should('have.text', '2 items left ')
      cy.get('.completed > .view > .toggle').should('not.be.undefined')
      // cy.get('.completed > .view > label').should('have.css', 'text-decoration', 'line-through');

      const completedButton = cy.get('.filters > :nth-child(3) > a');
      completedButton.click();

      cy.get('.view > label').should('have.length', 1);
    })
  })

  describe('uncomplete task', () => {
    it('should uncomplete a task', () => {
      generateSomeTasks(3);

      cy.get(':nth-child(1) > .view > .toggle').check();

      const completedButton = cy.get('.filters > :nth-child(3) > a');
      completedButton.click();

      cy.get('.toggle').click();

      cy.get('.todo-count').should('have.text', '3 items left ')

      const allButton = cy.get('.filters > :nth-child(1) > a');
      allButton.click();

      cy.get('.view > label').should('have.length', 3);
    })
  })

  describe('clear completed tasks', () => {
    it.only('should remove all completed tasks', () => {
      generateSomeTasks(3);

      cy.get(':nth-child(1) > .view > .toggle').check();

      cy.get('.clear-completed').click();

      cy.get('.view > label').should('have.length', 2);
      cy.get('.todo-count').should('have.text', '2 items left ')
    })
  })

})