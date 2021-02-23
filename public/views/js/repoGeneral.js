// FUNCIONES PARA VISUALIZAR ventas
const getListTable5 = async () => {
    const response = await new GetInfoByFetch(`${url.apiReportesGenerales}VentasG`).request();

    document.getElementById('container-list-general').innerHTML = " ";

    if (response.length === 0) {

        document.getElementById('container-list-general').innerHTML = "<p class='text-white'> No hay informacion disponible </p>";
    }

    response.map((VentasG) => {
        const table = `
                 <tr >
                    <td>${VentasG.ordenId}</td>
                    <td>${VentasG.tikectId}</td>
                    <td>${(VentasG.mesaId === null) ? 'LLEVAR' :  VentasG.mesaId }</td>
                    <td>${(VentasG.tipo_orden === 'M') ? 'MESA' : 'LLEVAR'}</td>
                    <td>${(VentasG.tipo_pago === 't') ? 'Tarjeta': 'Efectivo'}</td>
                    <td>${VentasG.descuento}</td>
                    <td style="font-size: 20px; text-align:right; "><span class="badge badge-success">$${VentasG.total}</span> </td>
                    <td style="font-size: 20px; text-align:right;" ><span class="badge badge-danger">$${VentasG.cambio}</span></td>
                    <td>${VentasG.fecha}</td>
                    <td>${VentasG.hora}</td>
                    <td class="text-center"><i class="fas text-success fa-print"></i></td>
                           
                 </tr>
             `;
        document.getElementById('container-list-general').insertAdjacentHTML('beforeEnd', table);

    })
};

async function filterSales() {
    let fecha1 = document.getElementById("fechaG1").value;
    let fecha2 = document.getElementById("fechaG2").value;

    if (fecha1 === "" && fecha2 === "") {

        return alertify.error("Seleccione un rango de fecha!");

    }
    
    const response = await new GetInfoByFetch(`${url.apiReportesGenerales}filtrarporfechasventas/${fecha1}/${fecha2}`).request();
    document.getElementById('container-list-table3').innerHTML = " ";
    if (response.length === 0) {

        document.getElementById('container-list-table3').innerHTML = "<p class='text-white'> No hay mesas disponibles </p>";
    }
    document.getElementById('container-list-general').innerHTML = " ";
    document.getElementById('fechaOntable').innerHTML = "";
    document.getElementById('fechaOntable').innerHTML = "DEL: "+ fecha1 + " AL: " + fecha2 ;

    let totalFinal = 0; 

    response.map((VentasG) => {
        const table = `
                 <tr >
                    <td>${VentasG.ordenId}</td>
                    <td>${VentasG.tikectId}</td>
                    <td>${(VentasG.mesaId === null) ? 'LLEVAR' :  VentasG.mesaId }</td>
                    <td>${(VentasG.tipo_orden === 'M') ? 'MESA' : 'LLEVAR'}</td>
                    <td>${(VentasG.tipo_pago === 't') ? 'Tarjeta': 'Efectivo'}</td>
                    <td>${VentasG.descuento}</td>
                    <td style="font-size: 20px; text-align:right; "><span class="badge badge-success">$${VentasG.total}</span> </td>
                    <td style="font-size: 20px; text-align:right;" ><span class="badge badge-danger">$${VentasG.cambio}</span></td>
                    <td>${VentasG.fecha}</td>
                    <td>${VentasG.hora}</td>
                    <td class="text-center"><i class="fas text-success fa-print"></i></td>
                           
                 </tr>
             `;
        document.getElementById('container-list-general').insertAdjacentHTML('beforeEnd', table);

    })

   // document.getElementById('totalFinal').innerHTML = "$ "+ parseFloat(totalFinal).toFixed(2);
}

function reload(params) {
    getListTable3();
}


function makePdfGen1() {
    let fecha1 = document.getElementById("fechaG1").value;
    let fecha2 = document.getElementById("fechaG2").value;

    window.open("http://localhost:3000/apiv0.1/reportes/repVentaGen/" + sessionStorage.getItem("token") + "/" + fecha1 + "/" + fecha2,
        "PRECUENTA",
        "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}

function makePdfGen2() {
    window.open("http://localhost:3000/apiv0.1/reportes/repVentaGenDia/" + sessionStorage.getItem("token"),
        "PRECUENTA",
        "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}