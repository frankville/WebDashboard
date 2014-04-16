
$(document).ready(function () {
$("#usuario").keyup(function(){
	$("#alcahuete").fadeOut("fast");
});
$("#pass").keyup(function(){
	$("#alcahuete").fadeOut("fast");
});

$("#botonCargaUs").click(function(event){
	//	guardarUsuarios();
	event.preventDefault();
	var nvo = new Usuario($("#usuario").val(),$("#pass").val(),$("#correoe").val(), new Array());
	addNewUser(nvo);
});

});



var Usuario = function(usuario,password,correoElec,sesiones ){
	
	this.nombre = usuario;
	this.pass = password;
	this.email = correoElec;
	this.sesiones = sesiones;
};


var addNewUser = function(usuario) {
  	
  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  if(usuario.nombre != "") {
  	  	var transac = baseDatos.transaction(["usuarios"],"readwrite");
  		var usuariosDB = transac.objectStore("usuarios");

 	 	var request = usuariosDB.add(usuario);
 		transac.oncomplete = function (event) {
 			getUsuarios();
 			showSuccessMsg("Exito! usuario agregado");
 			clearUserForm();
 		};   		
 		transac.onerror = function(event){
 			showErrMsg("Error de IndexedDB al agregar un nuevo usuario");
 		}

 	}else {
 		showErrMsg("Tenés que proporcionar un usuario y una contraseña");
	 }


 };

var getUsuarios = function (){
	var array = new Array();

	var usuarios = baseDatos.transaction("usuarios").objectStore("usuarios");

usuarios.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
  	var newUser = new Usuario(cursor.key,cursor.value.pass, cursor.value.email, cursor.value.sesiones);
  	array.push(newUser);
    cursor.continue();
  }
  else {
     recargarUsuarios(array);
  }
};

usuarios.openCursor().onerror = function (event){
	alert("error en getusuarios!!");
}

};

function deleteUser(user){
var request = baseDatos.transaction(["usuarios"], "readwrite")
                .objectStore("usuarios")
                .delete(user);
request.onsuccess = function(event) {
};
};


var recargarUsuarios = function(usuarios ){
	$("#listaUsuarios tbody tr").remove();

	// Check to see if we have any results.
	if (!usuarios){
	return;
	}

	for(var i=0;i < usuarios.length; i++){
		var fila = "<tr>"+
		"<td class='nombre'>"+usuarios[i].nombre+
		"</td>"+"<td class='pass'>"+usuarios[i].pass+
		"</td>"+"<td class='email'>"+usuarios[i].email+"</td>"+
		"<td>"+"<button class='form-control'>x</button></td>"+
		"</tr>";
		$("#listaUsuarios").append(fila);

	};

	$('#listaUsuarios tbody tr').click(function(event){
			//getSesiones($(this).find(".nombre").text());
 });

	$('#listaUsuarios tbody tr :button').click(function(e){
 				deleteUser($(this).closest('tr').find(".nombre").text());
   				$(this).closest('tr').remove();
   				$('#listaSesiones tbody tr').remove();
	});
	};

	function clearUserForm(){
			$("#usuario").val("");
			$("#pass").val("");
			$("#correoe").val("");
			$("#alcahuete").fadeOut("fast");

	};

	function showErrMsg(msg){

		$("#alcahuete").text(msg);
		$("#alcahuete").removeClass("alert-info");
		$("#alcahuete").removeClass("alert-success");
		$("#alcahuete").addClass("alert-danger");
		$("#alcahuete").fadeIn("fast");
}

function showSuccessMsg(msg){

			$("#alcahuete").text(msg);
		$("#alcahuete").removeClass("alert-info");
		$("#alcahuete").removeClass("alert-danger");
		$("#alcahuete").removeClass("collapse");
		$("#alcahuete").addClass("alert-success");
		$("#alcahuete").fadeIn("fast");

}