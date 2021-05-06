const IPV4 = 'https://www.coffecode.herokuapp.com';
const url = {
     apiuser: IPV4 + '/apiv0.1/users/',
     products: IPV4 + '/apiv0.1/products/',
     apicategory: IPV4 + '/apiv0.1/category/',
     apimesas: IPV4 + '/apiv0.1/mesas/',
     apiordenes: IPV4 + '/apiv0.1/orden/',
     apiordendetalle: IPV4 + '/apiv0.1/ordendet/',
     apiclientes: IPV4 + '/apiv0.1/cliente',
     apiInfo: IPV4 + '/apiv0.1/info/',
     apipromo: IPV4 + '/apiv0.1/promociones/',
     apiMenu: IPV4 + '/apiv0.1/menu/',
     apiReports: IPV4 + '/apiv0.1/reportes/',
     apiReportesGenerales: IPV4 + '/apiv0.1/reportesgenerales/'
}

function GetInfoByFetch(url, method = 'GET', body) {
     this.url = url;
     this.params = {
          method,
          headers: {
               'token': sessionStorage.getItem("token"),
          },
          body: body

     };
     this.request = async () => {
          let result = await fetch(this.url, this.params);
          return result.json();
     };

};

const closeSesion = () => {
     window.location.href = "index";
     sessionStorage.setItem('token', 0);
}
const redirect = (id) => {
     switch (id) {
          case 'reportes':
               window.location.href = IPV4 + `/coffecode/admin/${id}`;
               break;
          case 'ordenes':
               window.location.href = IPV4 + `/coffecode/admin/${id}`;
               break;
          case 'productos':
               window.location.href = IPV4 + `/coffecode/admin/${id}`;
               break;
          case 'clientes':
               window.location.href = IPV4 + `/coffecode/admin/${id}`;
               break;
          case 'ventas':
               window.location.href = IPV4 + `/coffecode/admin/${id}`;
               break;
          case 'config':
               window.location.href = IPV4 + `/coffecode/admin/${id}`;
               break;
          case 'info':
               window.location.href = IPV4 + `/coffecode/admin/${id}`;
               break;
          default:
               window.location.href = IPV4 + "/coffecode/admin/index";
               break;
     }
}

const validarToken = async () => {
     const response = await fetch(url.apiuser + 'validarToken', {
          method: 'GET',
          headers: {
               'Content-Type': 'application/json',
               'token': sessionStorage.getItem("token")
          }
     });
     return response.json();
}

const btnMenu = document.getElementById("btnMenu");

if (btnMenu) {
     btnMenu.onclick = () => {
          const sideBar = document.getElementById("sideBar");
          const contentPage = document.getElementById("contentPage");
          const sideBarHasClass = sideBar.classList.contains('d-none');

          if (sideBarHasClass) {
               sideBar.classList.remove("d-none");
               sideBar.classList.add("col-md-2");
               contentPage.classList.remove('col-md-12');
               contentPage.classList.add('col-md-10');

          } else {
               sideBar.classList.remove("col-md-2");
               sideBar.classList.add("d-none");
               contentPage.classList.add('col-md-12');
               contentPage.classList.remove('col-md-10');

          }

     };

}
