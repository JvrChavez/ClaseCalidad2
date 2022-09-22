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
Cypress.Commands.add('pruebasDataDriven',(campos,imagen)=>{
    let claves=Object.keys(campos)
    cy.log(campos['nombre'])
    cy.get('#firstName').type(campos['nombre'])
        cy.get('#lastName').type(campos ['apellido'])
        cy.get('#userEmail').type(campos ['email'])
        cy.get('input[name="gender"][value='+campos ['sexo']+']').check({force:true}).should('be.checked')
        cy.get('#userNumber').type(campos ['telefono'])
        cy.get('#dateOfBirthInput').click()
        cy.get('.react-datepicker__month-select').should('be.visible').select(campos ['fechaDeNacimiento'][0])
        cy.get('.react-datepicker__year-select').should('be.visible').select(campos ['fechaDeNacimiento'][1])
        cy.get('.react-datepicker__day--0'+campos ['fechaDeNacimiento'][2]).should('be.visible').click()
        cy.get('#dateOfBirthInput')
            .should('contain.value',campos ['fechaDeNacimiento'][0].substring(0,3))
            .should('contain.value',campos ['fechaDeNacimiento'][1])
            .should('contain.value',campos ['fechaDeNacimiento'][2])
            cy.get('.subjects-auto-complete__value-container').type(campos ['materia'])
            cy.get('div[id^="react-select-"]').click()
            cy.get('.subjects-auto-complete__value-container').should('contain.text',campos ['materia'])
        cy.get('div[class^="custom-control"').contains('label',campos ['hobbies'][0]).parent().find('input').check({force:true})
        cy.get('div[class^="custom-control"').contains('label',campos ['hobbies'][1]).parent().find('input').check({force:true})
        cy.get('#uploadPicture').then(function($el){
            //Convertir la imagen en un string de base64
            const blob=Cypress.Blob.base64StringToBlob(imagen,'image/png')

            const file= new File([blob],campos ['imagen'],{type:'image/png'})
            const list=new DataTransfer()

            list.items.add(file)
            const myFileList=list.files

            $el[0].files=myFileList
            $el[0].dispatchEvent(new Event ('charge',{bubbles:true}))
        })
        cy.get('#currentAddress').type(campos ['direccion'])
        cy.get('div[class=" css-yk16xz-control"]').click({force:true})
        cy.get('div[class*=" css-26l3qy-menu"]').contains(campos ['estado']).click({force:true})
        cy.get('div[class=" css-yk16xz-control"]').click({force:true})
        cy.get('div[class=" css-26l3qy-menu"]').contains(campos ['ciudad']).click({force:true})
        cy.get('#submit').click({force:true})
        //Aserciones
        cy.get('#example-modal-sizes-title-lg').should('have.text','Thanks for submitting the form')
        cy.get('td:contains(Student Name)+td')
        .should('have.text',campos ['nombre']+" "+campos ['apellido'])
        cy.get('td:contains(Student Email)+td').should('have.text',campos ['email'])
        cy.get('td:contains(Gender)+td').should('have.text',campos ['sexo'])
        cy.get('td:contains(Mobile)+td').should('have.text',campos ['telefono'])
        cy.get('td:contains(Date of Birth)+td')
        .should('have.text',campos ['fechaDeNacimiento'][2]+" "+
        campos ['fechaDeNacimiento'][0]+","+campos ['fechaDeNacimiento'][1])
        cy.get('td:contains(Subjects)+td').should('have.text',campos ['materia'])
        cy.get('td:contains(Hobbies)+td').should('have.text',campos ['hobbies'][0]+", "+campos ['hobbies'][1])
        cy.get('td:contains(Address)+td').should('have.text',campos ['direccion'])
        cy.get('td:contains(State and City)+td').should('have.text',campos ['estado']+" "+campos ['ciudad'])
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