/// <reference types="Cypress"/>
//Suite de casos de pruebas avanzadas
describe('Primer Examen',function(){
    this.beforeEach(()=>{
        //Ingresar a la pagina de compra de articulos tecnologicos
        cy.visit("https://www.cyberpuerta.com")
    })
    //Ingresar a tienda online
    it('Realizar compra de una computadora Apple',function(){
        
        //Cyberpuerta
        //Entramos al area de computadoras All in One
        cy.get('[href="/Computadoras/"]').click()
        cy.get('[href="/Computadoras/All-in-One/"]').click()

        //Filtramos productos en existencia de la marca Apple
        cy.get('div[class^="cp-pf-cklist"').contains('label','En existencia').parent().find('input').check({force:true})
        cy.get('div[class^="cp-pf-cklist"').contains('label','Apple').parent().find('input').check({force:true})

        //Verificamos que el producto sea Apple
        cy.get('#productList-2').should('contain.text','Apple').click()
        cy.get('.detailsInfo_right_title').should('contain.text','Apple')

        //Agregamos al carrito y vamos a este mismo
        cy.get('.basketButton').click()
        cy.get('.oxwidget_headerminibasket_tobasket').click()

        //Verificamos que solo tengamos un producto en el carrito
        cy.get('.basketboxcount').should('contain.text','1')



    })
})
Cypress.on('uncaught:exception',(err,runnable)=>{
    console.log("err :"+ err)
    console.log("runnable :"+ runnable)
    return false
})