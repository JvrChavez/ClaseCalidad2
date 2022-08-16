///<reference types="Cypress"</>

//suite de casos
describe('Primer conjunto de casos de prueba', function(){
    beforeEach(()=>{
        cy.visit("http://automationpractice.com/index.php")
    })
    /*
    //caso de prueba 1
    it('ingresar a la pagina principal de atenea', function(){
        cy.get('#homefeatured .product-container').should('have.length',7)
        })
    */
    //caso de prueba 2
    /*it('Agregar el elemento tipo blouse al carrito de compras desde la página principal', function(){
        cy.get('#homefeatured .product-container').as('ProductosPopulares')
        cy.get('@ProductosPopulares')
        .find('.product-name')
        .each(($el, index, $list) => {
            cy.get('@ProductosPopulares').eq(index).find('.price').then(function($el1){
                let precio = $el1.text()
                cy.log(precio)

                if($el.attr('title') === 'Printed Dress' && precio.includes('26.00')){
                    cy.log('Se ha encontrado el elemento y precio buscado')
                    cy.get('@ProductosPopulares').eq(index).contains('Add to cart').click()
                }
            })
        })
        cy.get('h2 > .ajax_cart_product_txt')
        .should('contain.text', 'There is 1 item in your cart.')
        .should('be.visible')
        })*/
    //caso de prueba 3
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

        })
})