// var db = openDatabase("test", "1.0", "BD Prueba", 1024);  // Open SQLite Database
var sesion = null;

$(document).ready(function(){

	$("#loaderContainer").fadeOut("fast");
});


$("#usuario").keyup(function(){
	$("#alcahuete").fadeOut("fast");
});
$("#pass").keyup(function(){
	$("#alcahuete").fadeOut("fast");
});
$("#formulario").submit(function(event){
	event.preventDefault();
		verifyCredentials($("#usuario").val(),$("#pass").val(), addSesion);


});

var datosLogin = function  (nomus, passus) {
	this.j_username = nomus;
	this.j_password = passus;
};

function  loggedIn(){
		alert("entra aca");

		$("#marco").fadeOut("fast",function () {
			$("#menu").fadeIn("fast");
		});

		showSuccessMsg("Exito! tu usuario y password son validos");
};

function showSuccessMsg(msg){

			$("#alcahuete").text(msg);
		$("#alcahuete").removeClass("alert-info");
		$("#alcahuete").removeClass("alert-danger");
		$("#alcahuete").removeClass("collapse");
		$("#alcahuete").addClass("alert-success");
}

var mostrarError = function(data){
	setTimeout(function(){
		$("#loaderContainer").fadeOut("fast",function () {
			$("#formulario").fadeIn("fast");
				showErrMsg("Error! "+data);
		});


	},2000);
};

function showErrMsg(msg){
		$("#alcahuete").text(msg);
		$("#alcahuete").removeClass("alert-info");
		$("#alcahuete").removeClass("alert-success");
		$("#alcahuete").removeClass("collapse");
		$("#alcahuete").addClass("alert-danger");
}