$(document).ready(function(){
	$("#cargaSesiones").submit(function(event){
		event.preventDefault();
		verifyCredentials($("#nomUs").val(),$("#passUs").val(),addSesion);
	});
});


function Sesion(f,h,s){
	this.fecha = f;
	this.hora = h;
	this.sucursal = s;	
};

function verifyCredentials(user,pwd, callback){
	$.post("/jasperserver/rest/login", { j_username: user, j_password: pwd }, function( data ){
		alert("datos server "+data);
	});
};


function addSesion(usuario,transac) {
	  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.

  var date  = new Date();

  	var sesion = new Sesion(date.toDateString(),date.toTimeString(),$("#listaSucs").val());
  	usuario.sesiones.push(sesion);
  	var objstore = transac.objectStore("usuarios");
 	 var req = objstore.put(usuario);

 	req.onsuccess = function (event) {
 			loggedIn();
 	};   		
 	req.onerror = function(event){
 		alert("Error en put request");
 	}

};


function getSesiones(nombreUsuario) {

	var usuarios = baseDatos.transaction("usuarios").objectStore("usuarios");
	var request = usuarios.get(nombreUsuario);
	request.onsuccess = function(event) {
  	    	recargarSesiones(event.target.result.sesiones);
	};
	request.onerror = function(event){
		alert("Error al getSesiones");
	}
};


function recargarSesiones(sesiones) {
	// Clear out sesiones table
	$("#listaSesiones tbody tr").remove();
	// Check to see if we have any results.
	if (!sesiones){
	return;
	}
 
	// Loop over the current list of girls and add them
	// to the visual list.
	for(var i=0;i < sesiones.length; i++){
		var fila = "<tr>"+"<td>"+sesiones[i].fecha+"</td>"+"<td>"+sesiones[i].hora+"</td>"
		+"<td>"+sesiones[i].sucursal+"</td>"+"</tr>";
		$("#listaSesiones").append(fila);

	};
};