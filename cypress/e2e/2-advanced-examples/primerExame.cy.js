/// <reference types="Cypress"/>
//Suite de Primer Examen
describe('Primer Examen',function(){
    before(function(){
        //Cargamos los valores del archivo example.json en un objeto de datos
        cy.fixture('carritoDeCompras').then(function(datos){
            this.datos=datos
        })
    })
    this.beforeEach(()=>{
        //Ingresar a la pagina de compra de articulos tecnologicos
        cy.visit("https://www.cyberpuerta.com")
    })
    
    it('Realizar compra de una computadora Apple',function(){
        //Cyberpuerta
        //Entramos al area de computadoras All in One
        cy.get('[href="/Computadoras/"]').click()
        cy.get('[href="/Computadoras/All-in-One/"]').click()

        //Filtramos productos en existencia de la marca Apple
        cy.wait(3000)
        cy.get('div[class^="cp-pf-cklist"').contains('label','APPLE').parent().find('input').check({force:true})
        cy.get('div[class^="cp-pf-cklist"').contains('label','En existencia').parent().find('input').check({force:true})
        
        //Test del Pruebas Avanzadas
        cy.get('.emproduct').as("contenedorDeProductos")
        cy.get("@contenedorDeProductos")
        .find('[id*=productList]')
        .each(($el1, index, $list) => {
            cy.get('@contenedorDeProductos').eq((index)).then(function($el1){
                let producto = $el1.text()
                cy.log(producto)            
                //Se toma el arreglo de los telefonos con un each
                cy.get(this.datos.PCS)
                .each(($el2,index1,$list1)=>{
                    //Se evalua si el telefono en cuestion es el correcto
                    if(producto.includes(this.datos.PCS[index1])){
                        cy.log('Se ha encontrado el elemento buscado '+this.datos.PCS[index1])
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
        })//Aqui termina lo de PruebasAvanzadas
        
        //Esto fue parte del examen
        /*//Verificamos que el producto sea Apple (Parte del examen)
        cy.get('#productList-2').should('contain.text','Apple').click()
        cy.get('.detailsInfo_right_title').should('contain.text','Apple')

        //Agregamos al carrito y vamos a este mismo
        cy.get('.basketButton').click()
        cy.get('.oxwidget_headerminibasket_tobasket').click()

        //Verificamos que solo tengamos un producto en el carrito
        cy.get('.basketboxcount').should('contain.text','1')*/
    })
})
Cypress.on('uncaught:exception',(err,runnable)=>{
    console.log("err :"+ err)
    console.log("runnable :"+ runnable)
    return false
})