/// <reference types="Cypress"/>
//Suite de casos de pruebas avanzadas
describe('Tercer feature de acass avanzados',function(){
    this.beforeEach(()=>{
        //ingresar a la pagina de compra de articulos tecnologicos
        cy.visit("https://www.cyberpuerta.com")
    })
    //Ingresar a tienda online
    it('Realizar compra de celular iPhone13',function(){
        /*Telcel
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a > img').click()
        cy.get('.chosen-single').type("sonora")
        cy.get('.active-result').should('contain.text','Sonora').click()
        cy.get('#entrarPerfilador').click({force:true})*/
        
        //Cyberpuerta
        cy.get('[href="/Computadoras/"]').click()
        cy.get('[href="/Computadoras/All-in-One/"]').click()
        cy.get(':nth-child(1) > .cp-pf-cklist > ul > :nth-child(1) > label > span').click()
        cy.get(':nth-child(4) > .cp-pf-cklist > ul > :nth-child(1) > label > span').click()
        cy.get('.emdropdownicon').click()
        //cy.get('div[class^="emdropdownitems"]').contains('label','Menor precio').click()



    })
})
Cypress.on('uncaught:exception',(err,runnable)=>{
    console.log("err :"+ err)
    console.log("runnable :"+ runnable)
    return false
})