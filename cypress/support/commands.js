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
Cypress.Commands.add("agregarArregloAlCarrito",(nombreDeProducto)=>{
    cy.get("div[class='product-thumb']").as("contenedorDeProductos")
        cy.get("@contenedorDeProductos")
        .find('.description')
        .each(($el, index, $list) => {
            cy.get('@contenedorDeProductos').eq(index).then(function($el1){
                let producto = $el1.text()
                cy.log(producto)
                //Se toma el arreglo de los telefonos con un each
                cy.get(nombreDeProducto)
                .each(($el2,index1,$list1)=>{
                    //Se evalua si el telefono en cuestion es el correcto
                    if(producto.includes(nombreDeProducto[index1])){
                        cy.log('Se ha encontrado el elemento buscado '+nombreDeProducto[index1])
                        cy.get('@contenedorDeProductos').eq(index).find('button[aria-label="Add to Cart"]').click()
                        cy.get('.alert').should('contain.text',nombreDeProducto[index1])
                    }                    
                })
            })
        })
})
Cypress.Commands.add("agregarArregloCarritoCyberpuerta",(arregloDeProductos)=>{
    cy.get('.emproduct').as("contenedorDeProductos")
        cy.get("@contenedorDeProductos")
        .find('[id*=productList]')
        .each(($el1, index, $list) => {
            cy.get('@contenedorDeProductos').eq((index)).then(function($el1){
                let producto = $el1.text()
                cy.log(producto)            
                //Se toma el arreglo de los telefonos con un each
                cy.get(arregloDeProductos)
                .each(($el2,index1,$list1)=>{
                    //Se evalua si el telefono en cuestion es el correcto
                    if(producto.includes(arregloDeProductos[index1])){
                        cy.log('Se ha encontrado el elemento buscado '+arregloDeProductos[index1])
                        cy.get('@contenedorDeProductos').eq(index).find('button[id*="toBasket_productList-"]').click()
                        cy.get('.bigtext').then(function($bigtext){
                            let cantidad=$bigtext.text()
                            if(cantidad.includes('2 artículos')){
                                cy.get('.oxwidget_headerminibasket_tobasket').click()
                                cy.get('.basketboxcount > span').should('contain.text','2')
                            }else{
                                cy.reload()
                            }
                        })                    
                    }                    
                })
            })
        })
})