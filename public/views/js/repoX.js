
 function makePdf5() {
    let fecha1 = document.getElementById("fechaNX1").value;
    let fecha2 = document.getElementById("fechaNX2").value;
    
    window.open("http://localhost:3000/apiv0.1/reportes/repX/"+sessionStorage.getItem("token")+ "/" + fecha1 + "/" + fecha2, 
    "PRECUENTA", 
    "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}

function makePdf51() {
    window.open("http://localhost:3000/apiv0.1/reportes/repX/"+sessionStorage.getItem("token"), 
    "PRECUENTA", 
    "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
}