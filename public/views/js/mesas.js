 // FUNCIONES PARA ADMINISTRAR LA TABLA DE MESAS 
 const getListTable = async () => {
    let response = await new GetInfoByFetch(url.apimesas).request();
    document.getElementById('container-list-table').innerHTML = " ";
    if (response.length === 0) {

        document.getElementById('container-list-table').innerHTML = "<p class='text-white'> No hay mesas disponibles </p>";
    }

    response.map((mesa) => {
        const table = `
                <tr >
                    <td>${mesa.num_mesa}</td>
                    <td>${mesa.descripcion ? mesa.descripcion : "Sin descripcion"}</td>
                    <td>${mesa.estado == 1 ? "Mesa ocupada" : "Mesa libre"}</td>
                    <td>
                        <i style="cursor: pointer;" onclick="editTable(${mesa.mesaId})"  class="text-warning far fa-edit"></i>
                    </td>
                    <td>
                        <i style="cursor: pointer;" onclick="DeleteTable(${mesa.mesaId})" class="text-danger fas fa-trash"></i>
                    </td>       
                </tr>
            `;
        document.getElementById('container-list-table').insertAdjacentHTML('beforeEnd', table);

    })
};
const DeleteTable = (tableId) => {
    alertify.confirm("<i class='fas fa-exclamation-circle text-danger'></i> Advertencia ", "¿Decea borrar esta mesa?.",
        async function () {
            let response = await new GetInfoByFetch(`${url.apimesas}${tableId}`, 'DELETE').request();
            alertify.success(response.success);
            getListTable();
        },
        function () { });
}
document.querySelector("#formTable").addEventListener("submit", async (event) => {
    event.preventDefault();

    let data = new FormData(event.currentTarget);

    if (parseInt(data.get("idforedit")) === 0) {
        editOsaveTable(new URLSearchParams({
            'num_mesa': data.get("num_mesa"),
            'descripcion': data.get("descripcion")
        }), method = 'POST', link = url.apimesas);

    } else {
        editOsaveTable(new URLSearchParams({
            'num_mesa': data.get("num_mesa"),
            'descripcion': data.get("descripcion")
        }), method = 'PUT', link = `${url.apimesas}${data.get('idforedit')}`);
    }
});

const editOsaveTable = async (data, method, link) => {

    let response = await new GetInfoByFetch(`${link}`, method, data).request();

    if (response.ok === false) {
        alertify.alert("<i class='fas fa-exclamation-circle text-danger'></i> Error al enviar el formulario ",
            "Error al enviar el formulario!");
    } else {
        getListTable();
        alertify.success(response.success);
        document.querySelector("#formTable").reset();
        $("#idforedit").val(0);
        $("#alert-edit-mesa").html(" ");
    }
}

const editTable = async (tableId) => {
    document.querySelector("#formTable").reset();

    const response = await new GetInfoByFetch(`${url.apimesas}findOne/${tableId}`).request();

    Object.entries(response).forEach(([key, value]) => {
        $(`#${key}`).val(`${value}`);

    });
    $("#idforedit").val(tableId); //input hiden en el formulario

    $("#alert-edit-mesa").html(`<div class="alert alert-warning" role="alert">
          <h5 class="alert-heading w-100">
            Estado: Editando... 
            <span  style="cursor: pointer;" onclick="cancelEditMesa()" class="text-primary float-right">
              Canelar edicion
              </span>
            </h5> 
        </div>
    `);
}
const cancelEditMesa = () => {
    $("#alert-edit-mesa").html(" ");
    $("#idforedit").val(0);
    document.querySelector("#formTable").reset();
}