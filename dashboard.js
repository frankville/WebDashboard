$(document).ready(function(){
	/*
	$("#visor").load(function(){
		hideLoadingBar();
	});
*/
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
		$("#myModal").modal("show");
		$.get("/jasperserver/logout.html?showPasswordChange=null", function(resp){
			$.cookie("jusername",null);
			loggedOut();//function from login.js
			$("#myModal").modal("hide");

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
	//var url = "jasperserver/rest_v2/reports/reports/ListaAlumnos/Listado_de_Alumnos.pdf?fechaconsulta="+params.fechaconsulta+"&suc="+params.suc;
		var url = "jasperserver/rest_v2/reports/reports/ListaAlumnos/Listado_Alumnos.pdf";

	$("#visor").attr("src","/ViewerJS/#../jasperserver/rest_v2/reports/reports/ListaAlumnos/Listado_Alumnos.pdf");

}