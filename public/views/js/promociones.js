const drawTablePromo = async () => {
    const content = document.getElementById("myTablePromo");
    content.innerHTML = " ";

    try {
        const response = await new GetInfoByFetch(url.apipromo).request();
        if (Object.keys(response).length < 1) {
            let promoList = 
                        ` <tr> 
                            <td colspan="5">Sin Promociones</td>  
                        </tr>`;
            content.insertAdjacentHTML('beforeEnd', promoList);
        }
        response.forEach(promo => {
            let promoList = ` 
                    <tr> 
                        <td>${promo.promoId}</td>
                        <td>${promo.desc}</td>
                          <td>${promo.valor * 100}%</td>
                        <td>${promo.estado == 1 ? '<span class="badge badge-primary">Activa</span>' : '<span class="badge badge-secondary">Inactiva</span>'}</td>
                        <td>
                            <i style="cursor: pointer;" onclick="editTablePromo(${promo.promoId})"  class="text-warning far fa-edit"></i>
                        </td>
                        <td>
                            <i style="cursor: pointer;" onclick="deleteTablePromo(${promo.promoId})" class="text-danger fas fa-trash"></i>
                        </td>  
                    </tr>
                    `;
            content.insertAdjacentHTML('beforeEnd', promoList);
        });
    } catch (error) {

        alertify.error("Error : "+ error +"<br> El servidor no responde." );

    }
}
document.querySelector("#promoForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    let data = new FormData(event.currentTarget);

    if (parseInt(data.get("idForEditPromo")) === 0) {
        editOsaveTablePromo(new URLSearchParams({
            'desc': data.get("desc"),
            'valor': data.get("valor"),
            'estado': data.get("estado"),
        }),
            method = 'POST',
            link = url.apipromo);

    } else {
        editOsaveTablePromo(new URLSearchParams({
            'desc': data.get("desc"),
            'valor': data.get("valor"),
            'estado': data.get("estado"),
        }),
            method = 'PUT',
            link = `${url.apipromo}${data.get('idForEditPromo')}`);
    }
    //$("#alert-edit-promo").html(" ");

});
const editOsaveTablePromo = async (data, method, link) => {
    try {
        let response = await new GetInfoByFetch(`${link}`, method, data).request();

        if (response.success) {

            $("#idForEditPromo").val(0);
            $("#alert-edit-promo").html(" ");

            document.querySelector("#promoForm").reset();
            alertify.success(response.success);

            drawTablePromo();

        }

    } catch (error) {
        alertify.error("Error al enviar el formulario <br>");
    }


}
const editTablePromo = async (promoId) => {
    document.querySelector("#promoForm").reset();

    const response = await new GetInfoByFetch(`${url.apipromo}findOne/${promoId}`).request();

    Object.entries(response).forEach(([key, value]) => {
        $(`#${key}`).val(`${value}`);

    });

    $("#alert-edit-promo").html(`
    <div class="alert alert-warning" role="alert">
        <h5 class="alert-heading w-100">
            Estado: Editando... 
            <span  style="cursor: pointer;" onclick="cancelEditPromo()" class="text-primary float-right">
            Cancelar edicion
            </span>
            </h5> 
        </div>
    `);

    $("#idForEditPromo").val(promoId); //input hiden en el formulario

}

const cancelEditPromo = () => {
    $("#alert-edit-promo").html(" ");
    $("#idForEditPromo").val(0);
    document.querySelector("#promoForm").reset();
}

const deleteTablePromo = (promoId) => {
    alertify.confirm("<i class='fas fa-exclamation-circle text-danger'></i> Advertencia ", "¿Decea borrar esta promocion?.",
        async function () {

            try {
                let response = await new GetInfoByFetch(`${url.apipromo}${promoId}`, 'DELETE').request();
                alertify.success(response.success);
                drawTablePromo();
            } catch (error) {
                alertify.error("Error al borrar la promocion<br>" + error);
            }

        },
        function () {
        });
}

