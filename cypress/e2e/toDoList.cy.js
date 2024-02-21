describe('To-Do List', () => {
  it('displays to-do list component', () => {
    cy.visit("/")
    cy.get('[data-test="todo-container"]')
      .within(() => {
        cy.get('[data-test="todo-newtask-name-input"]').should("contain", "Enter new Task Title")
        
      })
    
  })
})