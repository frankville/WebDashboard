$(document).ready(function(){


	$("#listaAlu").click(function (event){
		showControlPanel();
	});

	$("#formResumenIngresos").submit(function( event ){
		event.preventDefault();


	});

	$("#formListaAlu").submit(function( event ){
		event.preventDefault();
 		$("#loaderDiv").fadeIn("fast");
 		var params = {
 			fechaconsulta: $("#fechaInput").val().toString(),
 			suc : "1"
 		};

 		getListaAlu(params);
	});

	$("#dologout").click(function(event){
		event.preventDefault();
		$.get("/logout", function(resp){
			loggedOut();//function from login.js

		});
	});
});

function showControlPanel(){
		event.preventDefault();
		$("#homePan").fadeOut("fast");
		$("#ctrlListaAlu").fadeIn("slow");
		$("#visor").fadeIn("slow");
}

function hideLoadingBar(){
	$("#loaderDiv").fadeOut("fast");
}


function getListaAlu(params){
/*
$.get("/jasperserver/rest_v2/reports/reports/ListaAlumnos/Listado_de_Alumnos.pdf",params,function( data ){
	var url = "jasperserver/rest_v2/reports/reports/ListaAlumnos/Listado_de_Alumnos.pdf?fechaconsulta="+params.fechaconsulta+"&suc="+params.suc;
		console.log(url);
			$("#visor").attr("src","/Viewer.js/../"+url);
			 		$("#loaderDiv").fadeOut("fast");


});
*/
	var url = "jasperserver/rest_v2/reports/reports/ListaAlumnos/Listado_de_Alumnos.pdf?fechaconsulta="+params.fechaconsulta+"&suc="+params.suc;
	$("#visor").attr("src","/Viewer.js/../"+url);


}