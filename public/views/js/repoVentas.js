 // FUNCIONES PARA VISUALIZAR ventas
 const getListTable4 = async () => {
    const response = await new GetInfoByFetch(`${url.apiReportesGenerales}VentasD`).request();
     
     document.getElementById('container-list-table4').innerHTML = " ";
     if (response.length === 0) {
 
         document.getElementById('container-list-table4').innerHTML = "<p class='text-white'> No hay mesas disponibles </p>";
     }
 
     response.map((VentasD) => {
         const table = `
                 <tr >
                     <td>${VentasD.Producto}</td> Mesa
                     <td>${VentasD.Mesa}</td>
                     <td>${VentasD.Cantidad}</td>
                     <td>$${VentasD.Precio}</td>
                     <td>${VentasD.Fecha}</td>
                     <td>${VentasD.Hora}</td>
                           
                 </tr>
             `;
         document.getElementById('container-list-table4').insertAdjacentHTML('beforeEnd', table);
 
     })
 };

 function makePdf4() {
    let fecha1 = document.getElementById("fechaX2").value;
    let fecha2 = document.getElementById("fechaY2").value;
    
    window.open("http://localhost:3000/apiv0.1/reportes/repVentaDet/"+sessionStorage.getItem("token")+ "/" + fecha1 + "/" + fecha2, 
    "PRECUENTA", 
    "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}

function makePdf41() {
    window.open("http://localhost:3000/apiv0.1/reportes/repVentaDetDia/"+sessionStorage.getItem("token"), 
    "PRECUENTA", 
    "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}