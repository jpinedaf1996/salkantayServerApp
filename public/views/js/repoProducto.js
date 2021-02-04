// FUNCIONES PARA VISUALIZAR PRODUCTOS


const getListTable2 = async () => {
    //let response = await new GetInfoByFetch(url.products).request();
    const response = await new GetInfoByFetch(`${url.products}ProdXCat`).request();

    document.getElementById('container-list-table2').innerHTML = " ";
    if (response.length === 0) {

        document.getElementById('container-list-table2').innerHTML = "<p class='text-white'> No hay mesas disponibles </p>";
    }

    response.map((productos) => {
        const table = `
                 <tr >
                     <td>${productos.producto}</td>
                     <td>$${productos.precio}</td>
                     <td>${productos.Categoria}</td>
                     <td>${productos.estado == 1 ? "Inactivo" : "Activo"}</td>
                           
                 </tr>
             `;
        document.getElementById('container-list-table2').insertAdjacentHTML('beforeEnd', table);

    })
};

function makePdf1() {
    window.open("http://localhost:3000/apiv0.1/reportes/repProducto/"+sessionStorage.getItem("token"), 
    "PRECUENTA", 
    "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");

}