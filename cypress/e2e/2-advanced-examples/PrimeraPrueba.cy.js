///<reference types="Cypress"</>

//const { has } = require("cypress/types/lodash")

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
    it('Agregar el elemento tipo blouse al carrito de compras desde la página principal', function(){
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
        })
    //caso de prueba 3
        /*it("Verificamos que el drop down de women, tenga los elemtentos necesarios", function(){

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
    //Caso de prueba 4
    /*it("Verificar que los checkboxes esten funcionando",function(){
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-casual_dresses"]) input').check().should('be.checked')
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-evening_dresses"]) input').should('not.be.checked')
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-summer_dresses"]) input').should('not.be.checked')
    })*/

    //Caso de prueba 5
    /*it('Verificar que los dropdowns de arreglo esten funcionando',function(){
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('#selectProductSort').select('In stock').should('have.value','quantity:desc')
    })*/
    
    //Caso de prueba 6
    /*it('Crear una compra desde cero',function(){
        cy.get('#search_query_top').type('Blouse');
        cy.get('#searchbox > .btn').click()

        if (cy.get('.right-block > h5 > .product-name').should('contain.text','Blouse')) {
            cy.log('Se valido que el articulo sea Blouse')
            cy.get('.ajax_add_to_cart_button > span').click()

            cy.get('.button-container > .button-medium > span').click()
            cy.log('Entramos al carrito')

            if(cy.get('.cart_description > .product-name > a').should('contain.text','Blouse') &&
            cy.get('#product_price_2_7_0 > .price').should('contain.text','$27.00')){
                cy.log('Verificamos el articulo y precio del carrito')
                cy.get('.cart_navigation > .button > span').click()
                cy.log('Proseguimos despues de verificar articulo y precio')

                cy.get('#email').type('chavezj1941@gmail.com')
                cy.get('#passwd').type('123456')
                cy.get('#SubmitLogin > span').click()
                cy.log('Hacemos log in')

                cy.get('.cart_navigation > .button > span').click()
                cy.log('Confirmamos nuestra direccion')

                cy.get('#cgv').check().should('be.checked')
                cy.get('.cart_navigation > .button > span').click()
                cy.log('Hacemos check en terminos y condiciones')

                cy.get('.bankwire').click()
                cy.log('Seleccionamos metodo de pago')

                cy.get('#cart_navigation > .button > span').click()
                cy.log('Confirmamos la orden')

                cy.get('.cheque-indent > .dark').should('contain.text','complete')
                cy.log('Verificamos el texto de orden completada')   
            }
        }
        
    })*/
})
