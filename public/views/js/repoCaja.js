// FUNCIONES PARA VISUALIZAR CAJA
function retornarFecha()
{
  var fecha
  fecha=new Date();
  var cadena=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
  return cadena;
}

const getListTable6 = async () => {
    const response11 = await new GetInfoByFetch(`${url.apiReportesGenerales}RCajaG`).request();
    const response12 = await new GetInfoByFetch(`${url.apiReportesGenerales}RCajaE`).request();
    const response13 = await new GetInfoByFetch(`${url.apiReportesGenerales}RCajaT`).request();

    document.getElementById('container-list-table6').innerHTML = " ";
    if (response11.length === 0) {

        document.getElementById('container-list-table6').innerHTML = "<p class='text-white'> No hay datos disponibles </p>";
    }

    

    document.getElementById('fechaOntableC').innerHTML = "";
    document.getElementById('fechaOntableC').innerHTML =  retornarFecha();  
    
    response12.map((RCajaE) => { 
        totalE1 = RCajaE.ventasEE;
        totalTE1 = RCajaE.TicketTE;
    });

    response13.map((RCajaT) => { 
        totalT1 = RCajaT.ventasTT; 
        totalTV1 = RCajaT.TicketTT;
    });

    response11.map((RCajaG) => {

        const table1 = `
        <tr >
            
            <tr>
                <td>Ventas en efectivo: </td>
                <td>$${totalE1}</td>
            </tr>
            <tr>
                <td>N# de ventas efectivo: </td>
                <td>#${totalTE1}</td>
            </tr>
            <tr>
                <td>Ventas con tarjeta: </td>
                <td>$${totalT1}</td>
            </tr>
            <tr>
                <td>N# de ventas con tarjeta: </td>
                <td>#${totalTV1}</td>
            </tr>
            <tr>
                <td>N# total de ventas: </td>
                <td>#${RCajaG.TicketTG}</td>
            </tr>
            <tr>
            <td>Ventas Totales: </td>
                <td>$${RCajaG.TotalConG}</td>
            </tr>
            
         </tr>
             `;
        document.getElementById('container-list-table6').insertAdjacentHTML('beforeEnd', table1);

    })

    
    //console.log();
};


function reloadC(params) {
    getListTable6();
}


async function filterC() {//EDitar
    let fecha1 = document.getElementById("fechaC1").value;
    let fecha2 = document.getElementById("fechaC2").value;

    if (fecha1 === "" && fecha2 === "") {

        return alertify.error("Seleccione un rango de fecha!");

    }

    const response = await new GetInfoByFetch(`${url.apiReportesGenerales}filtrarporfechasCajaG/${fecha1}/${fecha2}`).request();
    const response1 = await new GetInfoByFetch(`${url.apiReportesGenerales}filtrarporfechasCajaE/${fecha1}/${fecha2}`).request();
    const response2 = await new GetInfoByFetch(`${url.apiReportesGenerales}filtrarporfechasCajaT/${fecha1}/${fecha2}`).request();
    
    document.getElementById('container-list-table6').innerHTML = " ";
    if (response.length === 0) {

        document.getElementById('container-list-table6').innerHTML = "<p class='text-white'> No hay datos disponibles </p>";
    }

    document.getElementById('fechaOntableC').innerHTML = "";
    document.getElementById('fechaOntableC').innerHTML = "DEL: "+ fecha1 + " AL: " + fecha2 ; 

    
    response1.map((filtrarporfechasCajaE) => { 
        totalE = filtrarporfechasCajaE.ventasE;
        totalTE = filtrarporfechasCajaE.TicketTE;
    });

    response2.map((filtrarporfechasCajaT) => { 
        totalT = filtrarporfechasCajaT.ventasT; 
        totalTV = filtrarporfechasCajaT.TicketTT;
    });

    response.map((filtrarporfechasCajaG) => {  
        

        const table = `
                 <tr >
                 

                    <tr>
                        <td>ITEMS</td>
                        <td>TOTALES</td>
                    </tr>

                    <tr>
                        <td>Ventas en efectivo: </td>
                        <td>$${totalE}</td>
                    </tr>
                    <tr>
                        <td>N# de ventas efectivo: </td>
                        <td>#${totalTE}</td>
                    </tr>
                    <tr>
                        <td>Ventas con tarjeta: </td>
                        <td>$${totalT}</td>
                    </tr>
                    <tr>
                        <td>N# de ventas con tarjeta: </td>
                        <td>#${totalTV}</td>
                    </tr>
                    <tr>
                        <td>N# total de ventas: </td>
                        <td>#${filtrarporfechasCajaG.TicketT}</td>
                    </tr>
                    <tr>
                    <td>Ventas Totales: </td>
                        <td>$${filtrarporfechasCajaG.TotalCon}</td>
                    </tr>
                    
                 </tr>
             `;
        document.getElementById('container-list-table6').insertAdjacentHTML('beforeEnd', table);

    });
   
}


/*
function makePdfCaja1() {
    let fecha1 = document.getElementById("fechaC1").value;
    let fecha2 = document.getElementById("fechaC2").value;

    window.open("http://localhost:3000/apiv0.1/reportes/repProductoMas/" + sessionStorage.getItem("token") + "/" + fecha1 + "/" + fecha2,
        "PRECUENTA",
        "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");

}    
function makePdfCaja2() {
    window.open("http://localhost:3000/apiv0.1/reportes/repProductoMasDia/" + sessionStorage.getItem("token"),
        "PRECUENTA",
        "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}  

function makePdfCaja12(print1) {
    var printContents = document.getElementById(print1).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}  
*/


function makePdfCaja1(print1) { //Funcion que imprime el div correspondiente para reporte
    var divContents = document.getElementById("print1").innerHTML; 
    var a = window.open("", "MsgWindow", "width=1000,height=1000"); 
    a.document.write('<html>'); 
    a.document.write('<body > <h1>Reporte de caja<br>'); 
    a.document.write(divContents); 
    a.document.write('</body></html>'); 
    a.document.close(); 
    a.print(); 
} 