$(document).ready(function(){
	/*
	$("#visor").load(function(){
		hideLoadingBar();
	});
*/
	$("#listaAlu").click(function (event){
		showListaAlumnosControlPanel();
	});
	$("#listaDiario").click(function (event){
		showListaDiarioControlPanel();
	});
	$("#listaDeuda").click(function (event){
		showListaDeudaControlPanel();
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

	$("#formListaDeuda").submit(function( event ){
		event.preventDefault();
 		$("#loaderDiv").fadeIn("fast");
 		var params = {
 			year: $("#yearInput").val().toString()
 		};

 		getListaDeuda(params);
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

function showListaAlumnosControlPanel(){
		event.preventDefault();
		hideAllPanels(function(){
			$("#ctrlListaAlu").fadeIn("slow");
			$("#visor").fadeIn("slow");
		});

}

function showListaDiarioControlPanel(){
		event.preventDefault();
		hideAllPanels(function(){
			$("#ctrlListaDiario").fadeIn("slow");
			$("#visor").fadeIn("slow");
		});
}

function showListaDeudaControlPanel(){
		event.preventDefault();
		hideAllPanels(function(){
			$("#ctrlListaDeuda").fadeIn("slow");
			$("#visor").fadeIn("slow");
		});
}


function hideAllPanels(callback){
	$("#homePan").fadeOut("fast");
	$("#ctrlListaAlu").fadeOut("fast");
	$("#ctrlListaDiario").fadeOut("fast");
	$("#ctrlListaDeuda").fadeOut("fast");
	callback();
}

function hideLoadingBar(){
	$("#loaderDiv").fadeOut("fast");
}


function getListaAlu(params){

$.get("/jasperserver/rest_v2/reports/reports/ListaAlumnos/ListaAlumnos.html").done(function(data){
		//var url = "jasperserver/rest_v2/reports/reports/ListaAlumnos/Listado_de_Alumnos.pdf?fechaconsulta="+params.fechaconsulta+"&suc="+params.suc;
			$("#visor").attr("srcdoc",data);
			 		$("#loaderDiv").fadeOut("fast");
});


}

function getListaDeuda(params){

$.get("/jasperserver/rest_v2/reports/reports/DeudaLancaster/DeudaLancaster.html",params).done(function(data){
		//var url = "jasperserver/rest_v2/reports/reports/ListaAlumnos/Listado_de_Alumnos.pdf?fechaconsulta="+params.fechaconsulta+"&suc="+params.suc;
			$("#visor").attr("srcdoc",data);
			 		$("#loaderDiv").fadeOut("fast");
});


}