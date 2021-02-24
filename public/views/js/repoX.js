
function makePdf5() {

    window.open( `${url.apiReports}repZ/`+sessionStorage.getItem("token"), 
    "REPORTE Z", 
    "width=1000,height=1000");
}

function makePdf51() {
    window.open(`${url.apiReports}repXDia/`+sessionStorage.getItem("token"), 
    "REPORTE X", 
    "width=1000,height=1000");
}