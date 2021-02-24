// FUNCIONES PARA VISUALIZAR ventas

PadLeft=(value, length) => (value.toString().length < length) ? PadLeft("0" + value, length) : value;
const getListTable5 = async () => {
    const response = await new GetInfoByFetch(`${url.apiReportesGenerales}VentasG`).request();

    document.getElementById('container-list-general').innerHTML = " ";

    if (response.length === 0) {

        document.getElementById('container-list-general').innerHTML = "<p class='text-white'> No hay informacion disponible </p>";
    }

    document.getElementById('fechaOntableVentas').innerHTML = "HOY: "+response[0].fecha;
    let totalFactura = 0; 
    let totalCambio = 0; 

    response.map((VentasG) => {
        totalFactura += VentasG.total; 
        totalCambio += VentasG.cambio;
        const table = `
                 <tr >
                    <td>${VentasG.ordenId}</td>
                    <td>${PadLeft(VentasG.tikectId,5)}</td>
                    <td>${(VentasG.mesaId === null) ? 'LLEVAR' :  VentasG.mesaId }</td>
                    <td>${(VentasG.tipo_orden === 'M') ? 'MESA' : 'LLEVAR'}</td>
                    <td>${(VentasG.tipo_pago === 't') ? 'Tarjeta': 'Efectivo'}</td>
                    <td>${VentasG.descuento}</td>
                    <td style="font-size: 20px; text-align:right; "><span class="badge badge-success">$${parseFloat(VentasG.total).toFixed(2)}</span> </td>
                    <td style="font-size: 20px; text-align:right;" ><span class="badge badge-danger">$${parseFloat(VentasG.cambio).toFixed(2)}</span></td>
                    <td>${VentasG.fecha}</td>
                    <td>${VentasG.hora}</td>
                    <td class="text-center"><i onclick="tikect(${VentasG.ordenId})" style="cursor:pointer" class="fas text-success fa-print"></i></td>
                           
                 </tr>
             `;
        document.getElementById('container-list-general').insertAdjacentHTML('beforeEnd', table);

    });
    document.getElementById('totalFactura').innerHTML = "$"+ totalFactura ;
    document.getElementById('totalCambio').innerHTML =  "$"+ totalCambio;
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

    document.getElementById('fechaOntableVentas').innerHTML = "";
    document.getElementById('fechaOntableVentas').innerHTML = "DEL: "+ fecha1 + " AL: " + fecha2 ;

    let totalFactura = 0; 
    let totalCambio = 0; 

    response.map((VentasG) => {

    totalFactura += VentasG.total; 
    totalCambio += VentasG.cambio;

        const table = `
                 <tr >
                    <td>${VentasG.ordenId}</td>
                    <td>${PadLeft(VentasG.tikectId,5)}</td>
                    <td>${(VentasG.mesaId === null) ? 'LLEVAR' :  VentasG.mesaId }</td>
                    <td>${(VentasG.tipo_orden === 'M') ? 'MESA' : 'LLEVAR'}</td>
                    <td>${(VentasG.tipo_pago === 't') ? 'Tarjeta': 'Efectivo'}</td>
                    <td>${VentasG.descuento}</td>
                    <td style="font-size: 20px; text-align:right; "><span class="badge badge-success">$${parseFloat(VentasG.total).toFixed(2)}</span> </td>
                    <td style="font-size: 20px; text-align:right;" ><span class="badge badge-danger">$${parseFloat(VentasG.cambio).toFixed(2)}</span></td>
                    <td>${VentasG.fecha}</td>
                    <td>${VentasG.hora}</td>
                    <td class="text-center"><i onclick="tikect(${VentasG.ordenId})" style="cursor:pointer" class="fas text-success fa-print"></i></td>
                           
                 </tr>
             `;
        document.getElementById('container-list-general').insertAdjacentHTML('beforeEnd', table);

    });
    document.getElementById('totalFactura').innerHTML = "$"+ totalFactura ;
    document.getElementById('totalCambio').innerHTML =  "$"+ totalCambio;

   // document.getElementById('totalFinal').innerHTML = "$ "+ parseFloat(totalFinal).toFixed(2);
}

function reloadSales(params) {
    getListTable5();
}

const tikect = (ordenId) => {
    //console.log(await )
    if (ordenId != 0) {

        window.open(IPV4+"/apiv0.1/reportes/ticket/" + sessionStorage.getItem("token") + "/" + ordenId,
            "PRECUENTA",
            "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
        //console.log(response.success);

    } else {
        alertify.error("Seleccione una orden.")
    }

    //
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