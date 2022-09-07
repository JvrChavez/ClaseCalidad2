/// <reference types="Cypress"/>

//Suite de casos de prueba avanzados
describe('Segundo conjunto de casos de pruebas avanzadas',function(){
    before(function(){
        //Cargamos los valores del archivo example.json en un objeto de datos
        cy.fixture('ejemplos').then(function(datos){
            this.datos=datos
        })
    })
    beforeEach(()=>{
        //ingresamos a la pagina de formulario
        cy.visit('https://www.facebook.com/')
    })

    it('Llenamos nuestro primer formulario utiizando data',function(){

        cy.get('.fcb > a').click()
        cy.get('[data-testid="open-registration-form-button"]').click()

        cy.get('input[name^="firstname"]').type(this.datos.nombre)
        cy.get('input[name^="lastname"]').type(this.datos.apellido)
        cy.get('input[name^="reg_email__"]').type(this.datos.email)
        cy.get('input[name^="reg_email_confirmation__"]').type(this.datos.email)
        cy.get('#password_step_input').type(this.datos.contra)

        cy.get('#day').should('be.visible').select(this.datos.fechaDeNacimiento[0])
        cy.get('#month').should('be.visible').select(this.datos.fechaDeNacimiento[1])
        cy.get('#year').should('be.visible').select(this.datos.fechaDeNacimiento[2])

        cy.get('input[name="sex"][value='+this.datos.sexo+']').check({force:true}).should('be.checked')
        
        cy.get('button[name="websubmit"]').click()
        
    })
})
Cypress.on('uncaught:exception',(err,runnable)=>{
    console.log("err :"+ err)
    console.log("runnable :"+ runnable)
    return false
})