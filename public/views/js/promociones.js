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
                    <tr >
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
                        <td>

                            <i style="cursor: pointer;" onclick="openListCategory(${promo.promoId})" class="text-secondary fas fa-cog"></i>
                        </td>
                    </tr>
                    `;
            content.insertAdjacentHTML('beforeEnd', promoList);
        });
    } catch (error) {

        alertify.error("Error : "+ error +"<br> El servidor no responde." );

    }
}
let $promoId;

const  openListCategory  = async (promoId) => {

    $promoId = promoId;

    const response = await new GetInfoByFetch(url.apicategory).request();
    const content = document.getElementById("categorias");

    content.innerHTML="";

    response.forEach(categorias => {
        let cate = `
                      <div class="col-md-12 form-group">
                        <a onclick="addDiscountToProduct(${categorias.categoriaId})"  href="#">${categorias.categoria}</a>
                      </div>
                  `;
        content.insertAdjacentHTML('beforeEnd', cate);
    });

    $("#myModal").modal('show');


}
const  addDiscountToProduct  = async (promoId) => {
    const response = await new GetInfoByFetch(url.products+"productosBycategori/"+promoId).request();
    const content = document.getElementById("categorias");

    content.innerHTML="";

    response.forEach(productos => {
        let products = `
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" value="${productos.productoId}"  id="checks${productos.productoId}">
                  <label class="form-check-label" for="checks${productos.productoId}">${productos.producto}</label>
                </div>

                  `;
        content.insertAdjacentHTML('beforeEnd', products);
    });
    console.log(response);


}

function getCheckBoxChecked() {
    let form = document.querySelector("#formWithCheck");
    let listResult = [];

    for (var i = 0; i < form.length; i++) {
        if (form[i].checked) {
            listResult.push(form[i].value);
        }
    }
    return listResult;
}


document.querySelector("#formWithCheck").addEventListener("submit", async (event) => {
    event.preventDefault();

    let response = await new GetInfoByFetch(`${url.apipromo}/descuentoporproducto/` + $promoId, 'PUT', new URLSearchParams({
        'data': getCheckBoxChecked()
    })).request();

    if(response.error){
      alertify.error(response.error);
    }else {
      alertify.success(response.success);
    }
    //console.log(response.error);

});

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
