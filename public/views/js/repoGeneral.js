 // FUNCIONES PARA VISUALIZAR ventas
 const getListTable5 = async () => {
    const response = await new GetInfoByFetch(`${url.products}VentasG`).request();
     
     document.getElementById('container-list-table5').innerHTML = " ";
     if (response.length === 0) {
 
         document.getElementById('container-list-table5').innerHTML = "<p class='text-white'> No hay informacion disponible </p>";
     }
 
     response.map((VentasG) => {
         const table = `
                 <tr >
                    <td>${VentasG.ordenId}</td>
                    <td>${VentasG.mesaId}</td>
                    <td>${VentasG.tipo_orden}</td>
                    <td>$${VentasG.tipo_pago}</td>
                    <td>${VentasG.descuento}</td>
                    <td>${VentasG.total}</td>
                    <td>$${VentasG.cambio}</td>
                    <td>${VentasG.fecha}</td>
                    <td>${VentasG.hora}</td>
                           
                 </tr>
             `;
         document.getElementById('container-list-table4').insertAdjacentHTML('beforeEnd', table);
 
     })
 };

 function makePdfGen1() {
    let fecha1 = document.getElementById("fechaG1").value;
    let fecha2 = document.getElementById("fechaG2").value;
    
    window.open("http://localhost:3000/apiv0.1/reportes/repVentaGen/"+sessionStorage.getItem("token")+ "/" + fecha1 + "/" + fecha2, 
    "PRECUENTA", 
    "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}

function makePdfGen2() {
    window.open("http://localhost:3000/apiv0.1/reportes/repVentaGenDia/"+sessionStorage.getItem("token"), 
    "PRECUENTA", 
    "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}