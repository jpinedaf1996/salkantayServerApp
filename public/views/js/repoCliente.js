 // FUNCIONES PARA VISUALIZAR CLIENTES
 const getListTable = async () => {
    let response = await new GetInfoByFetch(url.apiclientes).request();

    document.getElementById('container-list-table').innerHTML = " ";
    if (response.length === 0) {

        document.getElementById('container-list-table').innerHTML = "<p class='text-white'> No hay clientes </p>";
    }

    response.map((clientes) => {
        const table = `
                <tr >
                    <td>#${clientes.clienteId}</td>
                    <td>${clientes.nombre}</td>
                    <td>${clientes.telefono}</td>
                    <td>${clientes.nit}</td>
                </tr>
            `;
        document.getElementById('container-list-table').insertAdjacentHTML('beforeEnd', table);

    })
};

function makePdf(){
    var printMe = document.getElementById('ClienteContent');
    var wme = window.open("","", "width:700,height:900");
    wme.document.write(printMe.outerHTML);
    wme.document.close();
    //wme.focus();
    wme.print();
    //wme.close();
  }

function retornarFecha()
{
  var fecha
  fecha=new Date();
  var cadena=fecha.getDate()+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear();
  return cadena;
}

function retornarHora()
{
  var fecha
  fecha=new Date();
  var cadena=fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds();
  return cadena;
}

// document.write('La fecha de hoy es:'+retornarFecha());
// document.write('<br>');
// document.write('La hora es:'+retornarHora());
