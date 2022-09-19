/// <reference types="Cypress"/>
//Suite de casos de pruebas avanzadas
describe('Tercer feature de acass avanzados',function(){
    before(function(){
        //Cargamos los valores del archivo example.json en un objeto de datos
        cy.fixture('carritoDeCompras').then(function(datos){
            this.datos=datos
        })
    })
    this.beforeEach(()=>{
        //ingresar a la pagina de compra de articulos tecnologicos
        cy.visit("https://demo.opencart.com/index.php")
    })
    //Caso 7
    it('Realizar compra de celulares basadas en su titulo',function(){
        cy.get("#menu ul a:contains('Phones & PDAs')").click()
        cy.get("div[class='product-thumb']").as("contenedorDeProductos")
        cy.get("@contenedorDeProductos")
        .find('.description')
        .each(($el, index, $list) => {
            cy.get('@contenedorDeProductos').eq(index).then(function($el1){
                let producto = $el1.text()
                cy.log(producto)

                if(producto.includes(this.datos.telefono1)){
                    cy.log('Se ha encontrado el elemento buscado '+this.datos.telefono1)
                    cy.get('@contenedorDeProductos').eq(index).find('button[aria-label="Add to Cart"]').click()
                    cy.get('.alert').should('contain.text',this.datos.telefono1)
                }
                if(producto.includes(this.datos.telefono2)){
                    cy.log('Se ha encontrado el elemento buscado '+this.datos.telefono2)
                    cy.get('@contenedorDeProductos').eq(index).find('button[aria-label="Add to Cart"]').click()
                    cy.get('.alert').should('contain.text',this.datos.telefono2)
                }
                if(producto.includes(this.datos.telefono3)){
                    cy.log('Se ha encontrado el elemento buscado '+this.datos.telefono3)
                    cy.get('@contenedorDeProductos').eq(index).find('button[aria-label="Add to Cart"]').click()
                    cy.get('.alert').should('contain.text',this.datos.telefono3)
                }

            })
        })
    })
})