///<reference types="Cypress"</>

//suite de casos
describe('Verificamos los checkboxes', function(){
    beforeEach(()=>{
        cy.visit("https://mdbootstrap.com/docs/standard/forms/checkbox/")
    })
    //caso de prueba 2
    /*it('Agregar el cubo tipo 3x3 al carrito de compras desde la página principal', function(){
        cy.get('.js-product-table > :nth-child(1)').as('MasVendido')
        cy.get('@MasVendido')
        .find('.js-item-name item-name')
        .each(($el, index, $list) => {
            cy.get('@MasVendido').eq(index).find('.js-price-display item-price h6').then(function($el1){
                let precio = $el1.text()
                cy.log(precio)

                if($el.attr('title') === 'Cubo Rubik Yang 3x3 base negra' && precio.includes('$59.00')){
                    cy.log('Se ha encontrado el elemento y precio')
                    cy.get('@MasVendido').eq(index).contains('Agregar al carrito').click()
                }
            })
        })
        cy.get('h2 > .ajax_cart_product_txt')
        .should('contain.text', 'There is 1 item in your cart.')
        .should('be.visible')
        })*/
    //caso de prueba 3
    /*it("Verificamos que el drop down de ordenar por, tenga los elemtentos necesarios", function(){

            //Flotamos sobre un elemento
            cy.get('.hidden-phone > #sort')
            cy.get('a["Precio:"]').should('be.visible')
            cy.get('a["Precio:"]').should('be.visible')
            cy.get('a[title="A - Z"]').should('be.visible')
            cy.get('a[title="Dresses"]').should('be.visible')
            cy.get('a[title^="Casual"]').should('be.visible')
            cy.get('a[title^="Evening"]').should('be.visible')
            cy.get('a[title^="Summer"]').should('be.visible')

        })*/
    //Caso de prueba 4
    it("Verificar que los checkboxes esten funcionando e invertirlos",function(){
        cy.get('#flexCheckDefault').check({ force: true }).should("be.checked")
        cy.get('#flexCheckChecked').uncheck({ force: true }).should("not.be.checked")

        //cy.get('input[class="form-check-input"]:has(a[id="Default checkbox"]) input').check().should('be.checked')
        //cy.get('input[class="form-check-input"]:has(a[id="Checked checkbox"]) input').uncheck().should('not.be.checked')
        //cy.get('[type="checkbox"]').check() 
    })
})