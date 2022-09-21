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
        //Se agrega con un doble ciclo
        /*
        cy.get("#menu ul a:contains('Phones & PDAs')").click()
        cy.get("div[class='product-thumb']").as("contenedorDeProductos")
        cy.get("@contenedorDeProductos")
        .find('.description')
        .each(($el, index, $list) => {
            cy.get('@contenedorDeProductos').eq(index).then(function($el1){
                let producto = $el1.text()
                cy.log(producto)
                //Se toma el arreglo de los telefonos con un each
                cy.get(this.datos.telefonos)
                .each(($el2,index1,$list1)=>{
                    //Se evalua si el telefono en cuestion es el correcto
                    if(producto.includes(this.datos.telefonos[index1])){
                        cy.log('Se ha encontrado el elemento buscado '+this.datos.telefonos[index1])
                        cy.get('@contenedorDeProductos').eq(index).find('button[aria-label="Add to Cart"]').click()
                        cy.get('.alert').should('contain.text',this.datos.telefonos[index1])
                    }                    
                })
            })
        })*/

        //Se agrega con funciones de comandos uno por uno
        /*cy.get("#menu ul a:contains('Phones & PDAs')").click()
        cy.agregarElementosAlCarrito(this.datos.telefono1)
        cy.agregarElementosAlCarrito(this.datos.telefono2)
        cy.agregarElementosAlCarrito(this.datos.telefono3)*/

        //Se agrega con comandos de arreglos
        cy.get("#menu ul a:contains('Phones & PDAs')").click()
        cy.agregarArregloAlCarrito(this.datos.telefonos)
    })
})