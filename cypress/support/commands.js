// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("agregarElementosAlCarrito",(nombreDeProducto)=>{
    cy.get("div[class='product-thumb']").as("contenedorDeProductos")
    cy.get("@contenedorDeProductos")
    .find('.description')
    .each(($el, index, $list) => {
        cy.get('@contenedorDeProductos').eq(index).then(function($el1){
            let producto = $el1.text()
            cy.log(producto)
            //Se toma el arreglo de los telefonos con un each
            if(producto.includes(nombreDeProducto)){
                cy.log('Se ha encontrado el elemento buscado '+nombreDeProducto)
                cy.get('@contenedorDeProductos').eq(index).find('button[aria-label="Add to Cart"]').click()
                cy.get('.alert').should('contain.text',nombreDeProducto)
            }  
        })
    })
})
Cypress.Commands.add("agregarArregloAlCarrito",(nombreDeProducto)=>{
    cy.get("div[class='product-thumb']").as("contenedorDeProductos")
        cy.get("@contenedorDeProductos")
        .find('.description')
        .each(($el, index, $list) => {
            cy.get('@contenedorDeProductos').eq(index).then(function($el1){
                let producto = $el1.text()
                cy.log(producto)
                //Se toma el arreglo de los telefonos con un each
                cy.get(nombreDeProducto)
                .each(($el2,index1,$list1)=>{
                    //Se evalua si el telefono en cuestion es el correcto
                    if(producto.includes(nombreDeProducto[index1])){
                        cy.log('Se ha encontrado el elemento buscado '+nombreDeProducto[index1])
                        cy.get('@contenedorDeProductos').eq(index).find('button[aria-label="Add to Cart"]').click()
                        cy.get('.alert').should('contain.text',nombreDeProducto[index1])
                    }                    
                })
            })
        })
})
Cypress.Commands.add('pruebasDataDriven',(nombre,apellido,email,sexo,numero)=>{
    cy.get('#firstName').type(nombre)
    cy.get('#lastName').type(apellido)
    cy.get('#userEmail').type(email)
    cy.get('input[name="gender"][value='+sexo+']').check({force:true}).should('be.checked')
        cy.get('#userNumber').type(numero)
    cy.get('#submit').click({force:true})
    cy.get('#example-modal-sizes-title-lg').should('have.text','Thanks for submitting the form')
        cy.get('td:contains(Student Name)+td')
        .should('have.text',nombre+" "+apellido)
        cy.get('td:contains(Student Email)+td').should('have.text',email)
        cy.get('td:contains(Gender)+td').should('have.text',this.datos.sexo)
        cy.get('td:contains(Mobile)+td').should('have.text',this.datos.telefono)
})
Cypress.Commands.add('compraDesdeCeroPrimeraPrueba',(articulo,precio)=>{
    cy.get('#search_query_top').type(articulo);
        cy.get('#searchbox > .btn').click()

        if (cy.get('.right-block > h5 > .product-name').should('contain.text',articulo)) {
            cy.wait(4000)
            cy.log('Se valido que el articulo sea '+articulo)
            cy.get('.ajax_add_to_cart_button > span').click()

            cy.get('.button-container > .button-medium > span').click()
            cy.log('Entramos al carrito')

            if(cy.get('.cart_description > .product-name > a').should('contain.text',articulo) &&
            cy.get('#product_price_2_7_0 > .price').should('contain.text',precio)){
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
})
Cypress.Commands.add("agregarArregloCarritoCyberpuerta",(arregloDeProductos)=>{
    cy.get('.emproduct').as("contenedorDeProductos")
        cy.get("@contenedorDeProductos")
        .find('[id*=productList]')
        .each(($el1, index, $list) => {
            cy.get('@contenedorDeProductos').eq((index)).then(function($el1){
                let producto = $el1.text()
                cy.log(producto)            
                //Se toma el arreglo de los telefonos con un each
                cy.get(arregloDeProductos)
                .each(($el2,index1,$list1)=>{
                    //Se evalua si el telefono en cuestion es el correcto
                    if(producto.includes(arregloDeProductos[index1])){
                        cy.log('Se ha encontrado el elemento buscado '+arregloDeProductos[index1])
                        cy.get('@contenedorDeProductos').eq(index).find('button[id*="toBasket_productList-"]').click()
                        cy.get('.bigtext').then(function($bigtext){
                            let cantidad=$bigtext.text()
                            if(cantidad.includes('2 artículos')){
                                cy.get('.oxwidget_headerminibasket_tobasket').click()
                                cy.get('.basketboxcount > span').should('contain.text','2')
                            }else{
                                cy.reload()
                            }
                        })                    
                    }                    
                })
            })
        })
})