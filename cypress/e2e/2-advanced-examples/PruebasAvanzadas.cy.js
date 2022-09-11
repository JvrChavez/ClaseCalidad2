/// <reference types="Cypress"/>
//Suite de casos de pruebas avanzadas
describe('Tercer feature de acass avanzados',function(){
    this.beforeEach(()=>{
        //ingresar a la pagina de compra de articulos tecnologicos
        cy.visit("https://demo.opencart.com/index.php")
    })
    //Caso 7
    it('Realizar compra de celulares basadas en su titulo',function(){
        cy.get("#menu ul a:contains('Phones & PDAs')").click()
        cy.get("div[class='product-thumb']").as("contenedorDeProductos")
        cy.get("@contenedorDeProductos")
        cy.get('div[class="product-thumb"]:has(.description):contains(HTC Touch HD)')
        .each(($el, index, $list) => {
            cy.get('.has(.caption) h4 a').eq(index).find('.price').then(function($el1){
                let producto = $el1.text()
                cy.log(producto)

                if(producto.includes('HTC Touch HD')){
                    cy.log('Se ha encontrado el elemento buscado')
                    cy.get('@ContenedorDePruductos').eq(index).find('button[onclick^="cart.add"]').click()
                }
            })
        })
    })
})