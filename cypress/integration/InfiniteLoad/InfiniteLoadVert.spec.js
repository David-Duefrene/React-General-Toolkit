describe('<InfiniteLoad /> vertical', () => {
    beforeEach(() => {
        cy.visit('InfiniteLoad/CustomButton');
    });

    it('should contain 3 h1 tags after initial load', () => {
        cy.get('#InfiniteLoad div')
            .should('have.length', 3);
    });

    it('should contain 6 h1 tags after scrolling', () => {
        cy.scrollTo('bottom')
            .get('#InfiniteLoad div')
            .should('have.length', 6);
    });
});
