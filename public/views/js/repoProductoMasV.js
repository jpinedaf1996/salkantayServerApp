 // FUNCIONES PARA VISUALIZAR PRODUCTOS
 const getListTable3 = async () => {
    const response = await new GetInfoByFetch(`${url.products}ProdMasV`).request();
     
     document.getElementById('container-list-table3').innerHTML = " ";
     if (response.length === 0) {
 
         document.getElementById('container-list-table3').innerHTML = "<p class='text-white'> No hay mesas disponibles </p>";
     }
 
     response.map((ProdMasV) => {
         const table = `
                 <tr >
                     <td>${ProdMasV.Producto}</td>
                     <td>${ProdMasV.Cantidad}</td>
                     <td>$${ProdMasV.Total}</td>
                 </tr>
             `;
         document.getElementById('container-list-table3').insertAdjacentHTML('beforeEnd', table);
 
     })
 };


  function makePdf3() {
    let fecha1 = document.getElementById("fechaX1").value;
    let fecha2 = document.getElementById("fechaY1").value;
    
    window.open("http://localhost:3000/apiv0.1/reportes/repProductoMas/"+sessionStorage.getItem("token")+ "/" + fecha1 + "/" + fecha2, 
    "PRECUENTA", 
    "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");

}

function makePdf31() {
    window.open("http://localhost:3000/apiv0.1/reportes/repProductoMasDia/"+sessionStorage.getItem("token"), 
    "PRECUENTA", 
    "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}