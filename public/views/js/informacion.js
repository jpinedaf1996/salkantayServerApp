// FUNCIONES PARA ADMINISTRAR LA TABLA INFORMACION
    const getListInfo = async () => {
        const content = document.getElementById("container-list-info");
        content.innerHTML = " ";

        try {
            const response = await new GetInfoByFetch(url.apiInfo).request();
            if (Object.keys(response).length < 1) {
                let List =
                            `<tr>
                                <td class="text-align:center" colspan="9">Sin Informacion</td>
                            </tr>`;
                content.insertAdjacentHTML('beforeEnd', List);
            }
            response.forEach(info => {
                let List = `
                <tr >
                <td>${info.empresa}</td>
                <td>${info.direccion}</td>
                <td>${info.telefono}</td>
                <td>${info.nit}</td>
                <td>${info.nrc}</td>
                <td>${info.giro}</td>
                <td>${info.sucursal}</td>
                <td>
                  <i style="cursor: pointer;" onclick="editInfo(${info.infoId})" class="text-warning fas fa-edit"></i>
                </td>
                <td>
                  <i style="cursor: pointer;" onclick="deleteInfo(${info.infoId})" class="text-danger fas fa-trash"></i>
                </td>

            </tr>`;
                content.insertAdjacentHTML('beforeEnd', List);
            });
        } catch (error) {

            alertify.error("Error : "+ error +"<br> El servidor no responde." );

        }
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////

    const deleteInfo = (infoId) => {

        alertify.confirm("<i class='fas fa-exclamation-circle text-danger'></i> Advertencia ", "¿Decea borrar la informacion del negocio ?.",
          async function () {
            let response = await new GetInfoByFetch(`${url.apiInfo}${infoId}`, 'DELETE').request();
            alertify.success(response.success);

            getListInfo();
          },
          function () {
          });

      }
/////////////////////////////////////////////////////////////////////////////////////////////////////////

  document.querySelector("#InfoForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);

    if (parseInt(data.get("idforeditInfo")) === 0) {
      editOsaveInfo(
        new URLSearchParams({
          'empresa': data.get("empresa"),
          'direccion': data.get("direccion"),
          'telefono': data.get("telefono"),
          'nit': data.get("nit"),
          'nrc': data.get("nrc"),
          'giro': data.get("giro"),
          'sucursal': data.get("sucursal")
        }),
        method = 'POST',
        link = `${url.apiInfo}`);

    } else {
      editOsaveInfo(
        new URLSearchParams({
          'empresa': data.get("empresa"),
          'direccion': data.get("direccion"),
          'telefono': data.get("telefono"),
          'nit': data.get("nit"),
          'nrc': data.get("nrc"),
          'giro': data.get("giro"),
          'sucursal': data.get("sucursal")
        }),
        method = 'PUT',
        link = `${url.apiInfo}${data.get('idforeditInfo')}`
      );}

  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const editOsaveInfo = async (data, method, link) => {

    let response = await new GetInfoByFetch(`${link}`, method, data).request();

    if (response.error) {
      alertify.error(response.error);
      document.querySelector("#InfoForm").reset();

    } else {
      getListInfo();
      alertify.success(response.success)
      $("#idforedit").val(0);
      $("#alert-edit-info").html(" ");
      document.querySelector("#InfoForm").reset();

    }
  }
  ////////////////////////////////////Editar//////////////////////////////////////////////////////////////////////
  const editInfo = async (infoId) => {
    document.querySelector("#InfoForm").reset();

    const response = await new GetInfoByFetch(`${url.apiInfo}findOne/${infoId}`).request();


    Object.entries(response).forEach(([key, value]) => {
      $(`#${key}`).val(`${value}`);

    });

    $("#idforeditInfo").val(infoId);

    $("#alert-edit-info").html(`<div class="alert alert-warning" role="alert">
              <h5 class="alert-heading w-100">
                Estado: Editando...
                <span  style="cursor: pointer;" onclick="cancelEdit()" class="text-primary float-right">
                  Canelar edicion
                  </span>
                </h5>
            </div>
        `);
  }
  const cancelEdit = () => {
    $("#alert-edit-info").html(" ");
    $("#idforedit").val(0);
    document.querySelector("#InfoForm").reset();
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////
