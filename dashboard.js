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
});

function showControlPanel(){
		event.preventDefault();
		$("#homePan").fadeOut("fast");
		$("#ctrlListaAlu").fadeIn("slow");
		$("#visor").fadeIn("slow");
}


function getListaAlu(params){

$.get("/jasperserver/rest_v2/reports/reports/ListaAlumnos/Listado_de_Alumnos.pdf",params,function( data ){

		console.log(data);
			PDFJS.getDocument(data).then(function(pdf) {
  // Using promise to fetch the page
  pdf.getPage(1).then(function(page) {
    var scale = 1.5;
    var viewport = page.getViewport(scale);

    //
    // Prepare canvas using PDF page dimensions
    //
    var canvas = document.getElementById('visor');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    //
    // Render PDF page into canvas context
    //
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    page.render(renderContext);
  });
});

			 		$("#loaderDiv").fadeOut("fast");


});
/*
		$.ajax ({
		type: "GET",
		url: "/jasperserver/rest_v2/reports/reports/ListaAlumnos/Listado_de_Alumnos.pdf",
		//contentType: "application/json; charset=utf-8",
		dataType: "xml",
		data: params,
		success: function (data, status, jqXHR) {
			alert("exito! "+data);
			//darRespuesta(data.status);
		},
		error: function(xhrequest, ErrorText, thrownError) {
            mostrarError(thrownError + ": " + ErrorText);
        }

	}).done(function(){
		 		$("#loaderDiv").fadeOut("fast");

	});
*/
}