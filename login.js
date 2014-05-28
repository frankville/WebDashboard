// var db = openDatabase("test", "1.0", "BD Prueba", 1024);  // Open SQLite Database
var sesion = null;

$(document).ready(function(){
		$.get("/isLogged", function(currUser){
		if(currUser != ""){
			loggedIn(currUser);
			clearLoginForm();
		}else{
					loggedOut();//function from login.js
		}
	});

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
		var creds = new Object();
		creds.username = $("#usuario").val();
		creds.password = $("#pass").val();

		$.post("/login", creds, function(usern){
			console.log("wep! "+usern);
			loggedIn(usern);
			clearLoginForm();
		});

});

var datosLogin = function  (nomus, passus) {
	this.j_username = nomus;
	this.j_password = passus;
};

function  loggedIn(username){
	console.log("curr user! "+username);
		$("#marco").fadeOut("fast",function () {
			$("#menu").fadeIn("fast");
			$("#navbarUsuario").fadeIn("fast");
		});
		$("#currUser").text(username);
		showSuccessMsg("Exito! tu usuario y password son validos");
};

function  loggedOut(){
		$("#marco").fadeIn("fast",function () {
			$("#menu").fadeOut("fast");
			$("#navbarUsuario").fadeOut("fast");
			$("#nomUsuario").text("");
		});
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

	function clearLoginForm(){
			$("#usuario").val("");
			$("#pass").val("");
			$("#alcahuete").fadeOut("fast");
			$("#currUser").val("");
	};