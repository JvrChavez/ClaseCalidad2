/// <reference types="Cypress"/>
//Suite de Primer Examen
describe('Primer Examen',function(){
    this.beforeEach(()=>{
        //Ingresar a la pagina de compra de articulos tecnologicos
        cy.visit("https://www.cyberpuerta.com")
    })
    
    it('Realizar compra de una computadora Apple',function(){
        //Cyberpuerta
        //Entramos al area de computadoras All in One
        cy.get('[href="/Computadoras/"]').click()
        cy.get('[href="/Computadoras/All-in-One/"]').click()

        //Filtramos productos en existencia de la marca Apple
        cy.wait(3000)
        cy.get('div[class^="cp-pf-cklist"').contains('label','APPLE').parent().find('input').check({force:true})
        cy.get('div[class^="cp-pf-cklist"').contains('label','En existencia').parent().find('input').check({force:true})
        
        cy.get('.emproduct')
        cy.get('.emproduct').as("contenedorDeProductos")
        cy.get("@contenedorDeProductos")
        cy.get('div[class="emproduct_right"]')
        .each(($el, index, $list) => {
            cy.get('a[class^="emproduct_right_title"]').eq(index).then(function($el1){
                let producto = $el1.text()
                cy.log(producto)

                if(producto.includes(this.datos.PC1)){
                    cy.log('Se ha encontrado el elemento buscado '+this.datos.telefono1)
                    cy.get('@contenedorDeProductos').eq(index)/*.find('button[onclick^="cart.add"]')*/.click()
                }
                if(producto.includes(this.datos.PC2)){
                    cy.log('Se ha encontrado el elemento buscado'+this.datos.telefono2)
                    cy.get('@contenedorDeProductos').eq(index)/*.find('button[onclick^="cart.add"]')*/.click()
                }

            })
        })

        /*//Verificamos que el producto sea Apple
        cy.get('#productList-2').should('contain.text','Apple').click()
        cy.get('.detailsInfo_right_title').should('contain.text','Apple')

        //Agregamos al carrito y vamos a este mismo
        cy.get('.basketButton').click()
        cy.get('.oxwidget_headerminibasket_tobasket').click()

        //Verificamos que solo tengamos un producto en el carrito
        cy.get('.basketboxcount').should('contain.text','1')*/
    })
})
Cypress.on('uncaught:exception',(err,runnable)=>{
    console.log("err :"+ err)
    console.log("runnable :"+ runnable)
    return false
})