const newOrden = () => $("#modalOrden").modal("show");
const modalPromo = () => {
    getPromociones();
    $("#modalPromo").modal("show");
};


$(() => {
    allProducts();
    getTableOrden();

});

let listProductsInOrden = null;

const drawTable = async (id_orden) => {
    try {
        const response = await new GetInfoByFetch(`${url.apiordendetalle}ordendetbyproducto/${id_orden}`).request();
        const content = document.getElementById("container-table-producto");
        const subtotal = document.getElementById("ct-subtotal");
        const totalapagarcontent = document.getElementById("ct-totalApagar");

        let descuento = 0;
        let subTotal = 0;

        content.innerHTML = " ";
        subtotal.innerHTML = " ";
        totalapagarcontent.innerHTML = " ";

        try {
            descuento = parseFloat(response[0].orden.descuento);
        } catch (error) {

        }

        response.forEach(productos => {

            subTotal = (parseFloat(subTotal) + parseFloat(productos.precio) * productos.unidades).toFixed(2);

            let detalleOrden = `<tr>
                                <td>${productos.nombrePoducto}  $${parseFloat(productos.precio)}</td>
                                <td>
                                <div onClick='remove(${productos.ordendetId},${productos.unidades})' class="btn btn-danger btn-sm float-left">-</div>
                                <span> ${productos.unidades} </span>
                                <div onClick='add(${productos.ordendetId},${productos.unidades})' class="btn btn-primary btn-sm float-right">+</div>
                                </td>
                                <td>
                                <strong>$${parseFloat(parseFloat(productos.precio) * productos.unidades).toFixed(2)}</strong>
                                </td>
                                <td><i onClick='deleteDatail(${productos.ordendetId})' class="fas fa-trash text-danger cursor"></i></td>
                        </tr>`;
            content.insertAdjacentHTML('beforeEnd', detalleOrden);
        });

        subtotal.innerHTML = `$${subTotal}`;
        document.getElementById("promoValor").innerHTML = `${descuento * 100}%`;
        totalapagarcontent.innerHTML = `$${parseFloat(subTotal - (subTotal * descuento)).toFixed(2)}`;

        return listProductsInOrden = response;
        //console.log(response);
    } catch (error) {

        alertify.error("El servidor no responde.");

    }

}

const deleteDatail = async (detalleId) => {

    alertify.confirm("<i class='fas fa-exclamation-circle text-danger'></i> Advertencia ", "¿Seguro decea borrar este prodcuto?.",
        async function () {
            try {

                await new GetInfoByFetch(
                    `${url.apiordendetalle}${detalleId}`,
                    'DELETE')
                    .request();

                drawTable(ordenId);

            } catch (error) {

                alertify.error("El servidor no responde. ERROR: " + error);

            }

        },
        function () {

        });

}
const remove = async (ordendetId) => {

    await new GetInfoByFetch(
        `${url.apiordendetalle}${ordendetId}`,
        'PUT',
        new URLSearchParams({
            'op': 'remove',
        })
    ).request();

    drawTable(ordenId)

}
const add = async (ordendetId) => {
    await new GetInfoByFetch(
        `${url.apiordendetalle}${ordendetId}`,
        'PUT',
        new URLSearchParams({
            'op': 'add',
        })
    ).request();

    drawTable(ordenId);
}

let beforElement = null; // Este elemento se actualiza con el elemento HTML seleccionado  
// para validar cual fue la ultima selecionada para que se pinte en pantalla 
// estp es pa poder quitar la clase selected-table del ultimo y agregarla a uno nuevo

let ordenId = 0; //Ninguna mesa a sido seleccionado 

const detailOrden = async (id_orden) => {

    let element = event.currentTarget; // Elemento HTML actulamento seleccionado
    ordenId = id_orden; //La mesa seleccionada se guarda ena variable global
    //alert(element.getAttribute("data-promo"));
    if (ordenId != 0) {
        drawTable(id_orden); // Se pinta la tabla en pantalla 
    }
    if (beforElement === null) {
        element.classList.add("selected-table");
        return beforElement = element;

    } else {
        beforElement.classList.remove("selected-table");
        element.classList.add("selected-table");
        return beforElement = element;
    }
}

const saveProductToOrden = async (productoId, precio, product) => {

    if (parseInt(ordenId) === 0) {
        alertify.error("Seleccione una orden para agregar producto");
    }

    try {
        await new GetInfoByFetch(
            `${url.apiordendetalle}`,
            'POST',
            new URLSearchParams({
                'ordenId': ordenId,
                'precio': precio,
                'nombrePoducto': product,
                'productoId': productoId,
                'unidades': 1,
            })
        ).request();

        await drawTable(ordenId);

    } catch (error) {

        alertify.success(error)

    }


}

const searchByname = () => {
    const inputSearch = document.getElementById("searchByNames");
    filterItems(inputSearch.value)
}

const addToOrdenPending = async (id, estado) => {
    let response = await new GetInfoByFetch(`${url.apiordenes}/newOrden/${id}`, 'PUT', new URLSearchParams({
        'estado': estado
    })).request();
    if (response.success) {
        $("#modalTables").modal("hide");
        getTableOrden();
    }
}

const getTableOrden = async () => {

    try {
        let response = await new GetInfoByFetch(`${url.apiordenes}ordenbymesa`).request();
        let content = document.getElementById('orden-tables');

        content.innerHTML = " ";
        content.innerHTML = `<div class="pending-orders bg-info text-white">
                            LLEVAR
                        </div>`;

        response.map((tables) => {
            let table = `
                <div data-promo = "${tables.descuento}" onclick="detailOrden(${tables.ordenId});" class="pending-orders text-white">
                ${tables.mesa.num_mesa}
                </div>
            `;
            content.insertAdjacentHTML('beforeEnd', table);
        });

    } catch (error) {
        alertify.error(error + "<br>El servidor no responde")
    }

};
const selecTable = async () => {
    $("#modalOrden").modal("hide");
    $("#modalTables").modal("show");

    let response = await new GetInfoByFetch(`${url.apimesas}0`).request();
    let content = document.getElementById('selectTable');

    content.innerHTML = " ";
    response.map((tables) => {
        let table = `
            <div onclick="addToOrdenPending(${tables.mesaId},${tables.estado});" class="select-table col-sm-2 bg-primary border text-white">
                ${tables.num_mesa}
            </div>
            `;

        content.insertAdjacentHTML('beforeEnd', table);
    });

}

const productsByCategory = async () => {
    let response = await new GetInfoByFetch(url.apicategory).request();
    const ct = document.getElementById('container-productos');
    document.getElementById('container-list-product').innerHTML = " ";

    ct.innerHTML = " ";
    response.map((category) => {
        const categoria = `
            <div id="${category.categoriaId}" onclick="getProductsByCategory(${category.categoriaId})" class="animate__animated animate__bounce text-warning  col-sm-2 card-category border border-warning">
                <p class="text-category" >${category.categoria.toUpperCase()}</p>
                
            </div>`;

        ct.insertAdjacentHTML('beforeEnd', categoria);

    })
};

let selectedCat = null;

const getProductsByCategory = async (id) => {
    const content = document.getElementById('container-list-product');
    let response = await new GetInfoByFetch(`${url.products}productosBycategori/${id}`).request();
    //HACE EL FOCUS AL HACER CLICK A UNA TARGETA DE CATEGORIAS
    if (selectedCat === null) {
        $(`#${id}`).addClass("selected");
        selectedCat = id
    } else {
        $(`#${selectedCat}`).removeClass("selected")
        $(`#${id}`).addClass("selected")
        selectedCat = id
    }

    if (response.length > 0) {
        content.innerHTML = " ";
        drawProduct(response, content);
        //alertify.success("Producto agregado con exito!");
    } else {
        content.innerHTML = "SIN PRODUCTOS"
    }
}

const allProducts = async () => {
    const content = document.getElementById('container-productos');
    document.getElementById('container-list-product').innerHTML = " ";

    let response = await new GetInfoByFetch(`${url.products}`).request();

    if (response.length > 0) {
        content.innerHTML = " ";
        drawProduct(response, content);
        return listProducts = response;//alertify.success("Producto agregado con exito!");

    } else {
        content.innerHTML = "SIN PRODUCTOS"
    }

}

let listProducts = null;

const filterItems = query => {
    /***
     * FUNCVION PARA HACER BUSQUEDA DE PRODUCTOS 
     * EN ITMEPO REAL EN LA BASE DE DATOS 
     * * */
    const ct = document.getElementById('container-productos');
    document.getElementById('container-list-product').innerHTML = " ";

    ct.innerHTML = " ";

    return listProducts.filter((productos) =>
        productos.producto.toLowerCase().indexOf(query.toLowerCase()) > -1
    ).map(productos => {
        const products = `
            <div onClick='saveProductToOrden(${productos.productoId},${productos.precio},${JSON.stringify(productos.producto + '(' + productos.desc + ')')});' id="productCard" class="card product text-dark animate__animated animate__bounce" style="width: 11rem;">
                <img   class="card-img-top" height="125px" src="http://localhost:3000/previews/${productos.imagen}" alt="Card image cap">
                <div  class="card-body"  >
                    <p class="card-text">
                    <strong>${productos.producto.toUpperCase()}</strong><br>
                    (${productos.desc})
                    </p>
                    <p class="card-text"><span class="badge badge-text-size badge-info">$${productos.precio}</span></p>
                </div>
            </div>               
                `;
        ct.insertAdjacentHTML('beforeEnd', products);
    })
}
const drawProduct = (data, ct) => {

    data.map((productos) => {
        const products = `
            <div onClick='saveProductToOrden(${productos.productoId},${productos.precio},${JSON.stringify(productos.producto + '(' + productos.desc + ')')});' id="productCard" class="card product text-dark animate__animated animate__bounce" style="width: 11rem;">
                <img   class="card-img-top" height="125px" src="http://localhost:3000/previews/${productos.imagen}" alt="Card image cap">
                <div  class="card-body"  >
                    <p class="card-text">
                    <strong>${productos.producto.toUpperCase()}</strong><br>
                    (${productos.desc})
                    </p>
                    <p class="card-text"><span class="badge badge-text-size badge-info">$${productos.precio}</span></p>
                </div>
            </div>               
            `;
        ct.insertAdjacentHTML('beforeEnd', products);

    });

}
///////////////////////////////////////////PROMOCIONES//////////////////////////////////////////////
const getPromociones = async () => {
    const ct = document.getElementById("cont-promo");
    let response = await new GetInfoByFetch(url.apipromo).request();
    ct.innerHTML = " ";
    response.forEach((promo) => {
        const promoList = `
                <div onclick="addPromoInORden(${promo.valor});" class="card-promociones">
                    ${promo.desc} - ${promo.valor * 100}%
                </div>                
            `;
        ct.insertAdjacentHTML('beforeEnd', promoList);

    });
}

const addPromoInORden = async (valorPromo) => {
    if (ordenId != 0) {
        let response = await new GetInfoByFetch(`${url.apiordenes}/descuento/${ordenId}`,
            'PUT',
            new URLSearchParams({ 'descuento': valorPromo })).request();

        $("#modalPromo").modal("hide");
        drawTable(ordenId)
    } else {
        $("#modalPromo").modal("hide");
        alertify.error("Seleccione una orden.");
    }
}
///////////////////////////////////////////CANCELAR ORDEN//////////////////////////////////////////////

const cancelOrden = async () => {
    //console.log(ordenId);
    if (ordenId != 0) {

        const content = document.getElementById("container-table-producto");

        alertify.confirm("<i class='fas fa-exclamation-circle text-danger'></i> Advertencia ", "¿Decea cancelar esta orden?.",
            async function () {
                try {
                    const response = await new GetInfoByFetch(`${url.apiordenes}/cancelorden/${ordenId}`, 'PUT', new URLSearchParams({
                        'estado': '2'
                    })).request();

                    if (response.success) {
                        getTableOrden();
                        content.innerHTML = " ";
                        alertify.success(`${response.success}`);

                        ordenId = 0;
                    }
                } catch (error) {

                    alertify.error("El servidor no responde. ERROR: " + error);

                }

            },
            function () {

            });
        //console.log(response.success);

    }

}
///////////////////////////////////////////PRE CUENTA//////////////////////////////////////////////

const preBill = async () => {
    //console.log(await )

    window.open("http://localhost:3000/apiv0.1/reportes/precuenta/"+sessionStorage.getItem("token"), 
    "PRECUENTA", 
    "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no,top=0");
    //
}