///<reference types="Cypress"</>

//suite de casos
describe('Primer conjunto de casos de prueba', function(){
    beforeEach(()=>{
        cy.visit("https://www.cyberpuerta.mx/")
    })
    //caso de prueba 2
    it('Agregar el elemento tipo SSD al carrito de compras desde la página principal', function(){
        cy.get('#cp-start-daily-offers > :nth-child(3)').as('dailyoffers')
        cy.get('@dailyoffers')
        .find('.emproduct_title cpGaProdemstartpagenew-3')
        .each(($el, index, $list) => {
            cy.get('@dailyoffers').eq(index).find('.price').then(function($el1){
                let precio = $el1.text()
                cy.log(precio)

                if($el.attr('title') === 'SSD Western Digital WD Blue' && precio.includes('$2,199.00')){
                    cy.log('Se ha encontrado el elemento y precio')
                    cy.get('@dailyoffers').eq(index).contains('Add to cart').click()
                }
            })
        })
        cy.get('h2 > .ajax_cart_product_txt')
        .should('contain.text', 'There is 1 item in your cart.')
        .should('be.visible')
        })
    /*//caso de prueba 3
    it("Verificamos que el drop down de women, tenga los elemtentos necesarios", function(){

            //Flotamos sobre un elemento
            cy.get("#block_top_menu > ul > li:nth-child(1) > ul").invoke("attr","style","display:block")
            cy.get('a[title="Tops"]').should('be.visible')
            cy.get('a[title="T-shirts"]').should('be.visible')
            cy.get('a[title="Blouses"]').should('be.visible')
            cy.get('a[title="Dresses"]').should('be.visible')
            cy.get('a[title^="Casual"]').should('be.visible')
            cy.get('a[title^="Evening"]').should('be.visible')
            cy.get('a[title^="Summer"]').should('be.visible')

        })*/
})