//FUNCIONES PARA ADMINISTRAR LA TABLA DE CLIENTES 
    //AUTOS @GIOVANNY

    // const getListClientes = async () => {
    //     let response = await new GetInfoByFetch(url.urlCliente).request();
    //     return cliente
    // };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const drawTableUser = async () => {
        const content = document.getElementById("myTableUser");
        let response = await new GetInfoByFetch(url.apiuser).request();

        content.innerHTML = " ";
        response.forEach(users => {
            let userLists = ` <tr> 
                          <td>${users.usuario}</td>
                          <td>${users.tipo == 1 ? "Admin" : "Invitado"}</td>
                          <td>
                            <i style="cursor: pointer;" onclick="editTableUser(${users.usuarioId})"  class="text-warning far fa-edit"></i>
                        </td>
                        <td>
                            <i style="cursor: pointer;" onclick="deleteTableUser(${users.usuarioId})" class="text-danger fas fa-trash"></i>
                        </td>  
                      </tr>
                      `;
            content.insertAdjacentHTML('beforeEnd', userLists);
        });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    const deleteTableUser = (userId) => {
        alertify.confirm("<i class='fas fa-exclamation-circle text-danger'></i> Advertencia ", "¿Decea borrar este usuario?.",
            async function () {
                let response = await new GetInfoByFetch(`${url.apiuser}${userId}`, 'DELETE').request();
                alertify.success(response.success);

                drawTableUser();
            },
            function () {
            });
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    document.querySelector("#userForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        let data = new FormData(event.currentTarget);

        if (parseInt(data.get("idForEditUser")) === 0) {
            editOsaveTableUser(new URLSearchParams({
                'usuario': data.get("usuario"),
                'pass': data.get("pass"),
                'tipo': data.get("tipo"),
            }), method = 'POST', link = url.apiuser);

        } else {
            editOsaveTableUser(new URLSearchParams({
                'usuario': data.get("usuario"),
                'pass': data.get("pass"),
                'tipo': data.get("tipo"),
            }), method = 'PUT', link = `${url.apiuser}${data.get('idForEditUser')}`);
        }
        $("#alert-edit-user").html(" ");
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////////////// 

    const editOsaveTableUser = async (data, method, link) => {

        let response = await new GetInfoByFetch(`${link}`, method, data).request();

        if (response.ok === false) {
            alertify.alert("<i class='fas fa-exclamation-circle text-danger'></i> Error al enviar el formulario ",
                "Recomendaciones:<br>Tamaño maximo de la imagen 5Mb<br>Formato : jpeg jpg png o gif!");
        } else {
            drawTableUser();
            console.log(response.success)
            
            document.querySelector("#userForm").reset();

        }
    }
    ////////////////////////////////////Editar//////////////////////////////////////////////////////////////////////
    const editTableUser = async (userId) => {
        document.querySelector("#userForm").reset();

        const response = await new GetInfoByFetch(`${url.apiuser}findOne/${userId}`).request();

        $("#usuario").val(response.usuario); //input hiden en el formulario
        $("#pass").val(response.pass); //input hiden en el formulario
        $("#tipo").val(response.tipo);

        $("#idForEditUser").val(userId); //input hiden en el formulario

        $("#alert-edit-user").html(`<div class="alert alert-warning" role="alert">
              <h5 class="alert-heading w-100">
                Estado: Editando... 
                <span  style="cursor: pointer;" onclick="cancelEditUser()" class="text-primary float-right">
                  Canelar edicion
                  </span>
                </h5> 
            </div>
        `);
    }
    const cancelEditUser = () => {
        $("#alert-edit-user").html(" ");
        $("#idForEditUser").val(0);
        document.querySelector("#userForm").reset();
    }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////////////////////////////////