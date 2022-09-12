/// <reference types="Cypress"/>
//Suite de casos de pruebas avanzadas
describe('Tercer feature de acass avanzados',function(){
    this.beforeEach(()=>{
        //ingresar a la pagina de compra de articulos tecnologicos
        cy.visit("https://www.telcel.com/")
    })
    //Ingresar a tienda online
    it('Realizar compra de celular iPhone13',function(){
        //cy.get('.estado > .dropdown-menu > .dropdown-content > :nth-child(1) > a').click({force:true})
        cy.get(':nth-child(3) > .black-mobile').click({force:true})
        cy.get('tbody > :nth-child(1) > :nth-child(1) > a > img').click()
        cy.get('.chosen-single').type("sonora")
        cy.get('#entrarPerfilador').click({force:true})
        //cy.get('div[class="chosen-drop"').contains('label',this.datos.hobbies[0]).parent().find('input').check({force:true})


    })
})
Cypress.on('uncaught:exception',(err,runnable)=>{
    console.log("err :"+ err)
    console.log("runnable :"+ runnable)
    return false
})