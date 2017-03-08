/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */

function getTakenBooks(){
    $('#loan').empty();

	$('#loan').append('<button style="margin: 4%" onclick="scan(&quot;loan&quot;)" class="btn waves-effect waves-light col s5">Prestamo</button>');
	$('#loan').append('<button style="margin: 4%" onclick="scan(&quot;return&quot;)" class="btn waves-effect waves-light col s5">Devolución</button>');
	$('#loan').append('<div id="taken" class="col s12"/>');

    $.ajax({
        url: HOST + URL_BOOK + "date/",
        type: 'GET',
        dataType: 'json',
        success: function (data) {


            var table = $('<table class="striped bordered"/>');

            var tr = $('<thead/>').append('<tr/>');
            tr.append('<th data-field="title">TÍTULO</th>');
            tr.append('<th data-field="reader">LECTOR</th>)');
            tr.append('<th data-field="date">FECHA</th>')

            table.append(tr);

            var tbody = $('<tbody/>');

            for (item of data) {
                var tRow = $("<tr/>");
                var name = item.idReaderFk.name + " " + item.idReaderFk.lastName;

                tRow.append('<td>' + item.title + '</td>');
                tRow.append('<td>' + name + '</td>');
                tRow.append('<td>' + dateConverter(item.loanDate) + '</td>');

                tbody.append(tRow);
            }

            table.append(tbody);

            $('#taken').append(table);

        },

        error: function () {
            $('#taken').html('Error en el servidor');
        }
    });
}

function scan(method){

     cordova.plugins.barcodeScanner.scan(function(result){
            if(method==="loan")
                loanBook(result.text);
            else if(method==="return"){
                isLoan(result.text);
            }
            else
                console.log("Nunca debería de entrar aquí");
        }, function(){
            Materialize.toast("Error al leer el código", 4000);
    });
}

function isLoan(result){
    $.ajax({
        url : HOST + URL_BOOK + "isbn/" + result,
        type: 'GET',
        dataType: 'json',
        success: function(data){
            if(data.loanDate != undefined){
                setBookForLoan(data);
            } else {
                Materialize.toast("El libro no se encuentra prestado", 4000);
            }

        },
        error: function(){
            Materialize.toast("El libro no está registrado en la BD", 4000);
        }
    });
}

function setBookForLoan(book){

    book.loanDate = undefined;
    book.idReaderFk = undefined;

    $('#taken').html(JSON.stringify(book));

    $ajax({
        headers:{
            "Accept" : "application/json",
            "Content-Type" : "application/json"
        },
        url : HOST + URL_BOOK + JSON.stringify(book.id),
        type : "PUT",
        data : JSON.stringify(book),
        dataType : "json",
        success : function(data){
            $("#taken").empty();
            getTakenBooks();
        },
        error : function(err){
            Materialize.toast(JSON.stringify(err), 4000);
        }
    });
}


function dateConverter(date) {
	var array = date.split('T');
	var date = array[0].split('-');
	return date[0] + "-" + date[1] + "-" + date[2];
}

