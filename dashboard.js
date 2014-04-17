$(document).ready(function(){

	$("#listaAlu").click(function (event){
		showControlPanel();
	});

	$("#formResumenIngresos").submit(function( event ){
		event.preventDefault();


	});
});

function showControlPanel(){
		event.preventDefault();
			alert("entra");
		$("#homePan").fadeOut("fast");
		$("#ctrlListaAlu").fadeIn("slow");
		$("#visor").fadeIn("slow");

}


function getListaAlu(params){

		$.ajax ({
		type: "GET",
		url: "/jasperserver/rest_v2/reports",
		//contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: params,
		success: function (data, status, jqXHR) {
			darRespuesta(data.status);
		},
		error: function(xhrequest, ErrorText, thrownError) {
            mostrarError(thrownError + ": " + ErrorText);
        }

	});
}