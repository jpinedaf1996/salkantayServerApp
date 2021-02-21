const mesaId = parseInt(document.getElementById('mesaid').value);

var socket = io.connect( IPV4 , { 'forceNew': true });

socket.on('get-socketId',function (data) {
    //alert(data.id);
    localStorage.setItem('socket', data.id);
});

socket.on('orden-created',function (data) {
    //console.log(data);
    getTotal();
    localStorage.setItem('ordenId', data.orden);
    localStorage.setItem('mesaId', data.mesaId);

});
socket.on('orden-canceled',function (data) {
    //console.log(data);
    localStorage.removeItem( 'ordenId' );
    localStorage.removeItem( 'mesaId' );
    getTotal();
    alertify.alert('Avertencia',data)

});
socket.on('error-table',function (data) {

    //console.log(data);

    //window.location.replace(IPV4 + "/menu/" + localStorage.getItem('mesaId'));
    //alertify.alert(data);

});

socket.on('finished-to-client',function (data) {

    getTotal();
    localStorage.clear();
    alertify.alert(data.data);

});

$(() => {

    if( localStorage.getItem('mesaId') === null ){
      socket.emit('open-orden', {
          data: mesaId,
          ordenId: localStorage.getItem('ordenId'),
          socket: localStorage.getItem('socket')
      });
    }else {

      socket.emit('open-orden', {
          data: localStorage.getItem('mesaId'),
          ordenId: localStorage.getItem('ordenId'),
          socket: localStorage.getItem('socket')
      });

    }

});
