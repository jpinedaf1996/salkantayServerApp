// FUNCIONES PARA VISUALIZAR PRODUCTOS
const getListTable3 = async () => {
    const response = await new GetInfoByFetch(`${url.apiReportesGenerales}ProdMasV`).request();

    document.getElementById('container-list-table3').innerHTML = " ";
    if (response.length === 0) {

        document.getElementById('container-list-table3').innerHTML = "<p class='text-white'> No hay mesas disponibles </p>";
    }
    document.getElementById('fechaOntable').innerHTML = "";
    document.getElementById('fechaOntable').innerHTML = response[0].Fecha;
    let totalFinal = 0;
    response.map((ProdMasV) => {

        totalFinal += ProdMasV.Total;

        const table = `
                 <tr >
                     <td style='text-align: center!important;'>${ProdMasV.Producto}</td>
                     <td>${ProdMasV.Cantidad}</td>
                     <td ><strong>$${parseFloat(ProdMasV.Total).toFixed(2)}</strong></td>
                 </tr>
             `;
        document.getElementById('container-list-table3').insertAdjacentHTML('beforeEnd', table);

    })

    document.getElementById('totalFinal').innerHTML = "$ "+ parseFloat(totalFinal).toFixed(2);
    //console.log();
};

async function filter() {
    let fecha1 = document.getElementById("fechaX1").value;
    let fecha2 = document.getElementById("fechaY1").value;

    if (fecha1 === "" && fecha2 === "") {

        return alertify.error("Seleccione un rango de fecha!");

    }

    const response = await new GetInfoByFetch(`${url.apiReportesGenerales}filtrarporfechas/${fecha1}/${fecha2}`).request();
    document.getElementById('container-list-table3').innerHTML = " ";
    if (response.length === 0) {

        document.getElementById('container-list-table3').innerHTML = "<p class='text-white'> No hay mesas disponibles </p>";
    }

    document.getElementById('fechaOntable').innerHTML = "";
    document.getElementById('fechaOntable').innerHTML = "DEL: "+ fecha1 + " AL: " + fecha2 ;

    let totalFinal = 0; 

    response.map((ProdMasV) => {

        totalFinal += ProdMasV.Total;

        const table = `
                 <tr >
                     <td style='text-align: center!important;'>${ProdMasV.Producto}</td>
                     <td>${ProdMasV.Cantidad}</td>
                     <td><strong>$${parseFloat(ProdMasV.Total).toFixed(2)}</strong></td>
                 </tr>
             `;
        document.getElementById('container-list-table3').insertAdjacentHTML('beforeEnd', table);

    });
    document.getElementById('totalFinal').innerHTML = "$ "+ parseFloat(totalFinal).toFixed(2);
}

function reload(params) {
    getListTable3();
}

function makePdf3() {
    let fecha1 = document.getElementById("fechaX1").value;
    let fecha2 = document.getElementById("fechaY1").value;

    window.open("http://localhost:3000/apiv0.1/reportes/repProductoMas/" + sessionStorage.getItem("token") + "/" + fecha1 + "/" + fecha2,
        "PRECUENTA",
        "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");

}

function makePdf31() {
    window.open("http://localhost:3000/apiv0.1/reportes/repProductoMasDia/" + sessionStorage.getItem("token"),
        "PRECUENTA",
        "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}