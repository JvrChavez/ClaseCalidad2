/// <reference types="Cypress"/>

//Suite de casos de prueba avanzados
describe('Segundo conjunto de casos de pruebas avanzadas',function(){
    /*before(function(){
        //Cargamos los valores del archivo example.json en un objeto de datos
        cy.fixture('example').then(function(datos){
            this.datos=datos
            cy.fixture(this.datos.imagen).as('imagen')
        })
    })*/
    this.beforeEach(()=>{
        //ingresamos a la pagina de formulario
        cy.visit('https://www.gob.mx/curp/')
    })
    it('Calcular el tiempo entre paginas',()=>{
        //Cyberpuerta
        //Entramos al area de computadoras All in One
        /*cy.get('[href="/Computadoras/"]').click()        
        cy.get('[href="/Computadoras/All-in-One/"]').click()*/
        //wait for loading to finish

        // Wait until the iframe (Google reCAPTCHA) is totally loaded
        cy.wait(500);
        cy.get('[style="width: 304px; height: 78px;"] > div > iframe')
            .then($iframe => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body)
                .find('.recaptcha-checkbox-border')
                .should('be.visible')
                .click();
            });
      
            
    })
})