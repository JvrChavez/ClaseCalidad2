// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("agregarElementosAlCarrito",(nombreDeProducto)=>{
    cy.get("div[class='product-thumb']").as("contenedorDeProductos")
    cy.get("@contenedorDeProductos")
    .find('.description')
    .each(($el, index, $list) => {
        cy.get('@contenedorDeProductos').eq(index).then(function($el1){
            let producto = $el1.text()
            cy.log(producto)
            //Se toma el arreglo de los telefonos con un each
            if(producto.includes(nombreDeProducto)){
                cy.log('Se ha encontrado el elemento buscado '+nombreDeProducto)
                cy.get('@contenedorDeProductos').eq(index).find('button[aria-label="Add to Cart"]').click()
                cy.get('.alert').should('contain.text',nombreDeProducto)
            }  
        })
    })
})