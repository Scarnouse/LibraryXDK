/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */

$(document).ready(function () {
   listTakenBooks();
});

var HOST = "http://35.163.178.255:80/";
var URL = "LibraryRESTGF/webresources/entity.book/";

function scan(){
     $("#btnQueryCode").click(function(){
        cordova.plugins.barcodeScanner.scan(function(result){
            queryBook(result)
        }, function(){
            $("#code").val("Error al leer el código");
        });
    });
}

function listTakenBooks(){
    $.ajax({
        url: HOST + URL,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {

            var table = $('<table/>');

            var tr = $('<thead/>').append('<tr/>');
            tr.append('<th data-field="title">TÍTULO</th>');
            tr.append('<th data-field="reader">LECTOR</th>)');
            tr.append('<th data-field="date">FECHA</th>')

            table.append(tr);

            var tbody = $('<tbody/>');

            for (item of data) {
                if(item.loanDate != undefined){
                    var tRow = $("<tr/>");
                    var name = item.idReaderFk.name + " " + item.idReaderFk.lastName;

                    tRow.append('<td>' + item.title + '</td>');
                    tRow.append('<td>' + name + '</td>');
                    tRow.append('<td>' + dateConverter(item.loanDate) + '</td>');

                    tbody.append(tRow);
                }

            }

            table.append(tbody);

            $('#taken').append(table);

        },

        error: function () {
            $('#taken').html('ERROR');
        }
    });

}

function dateConverter(date) {
	var array = date.split('T');
	var date = array[0].split('-');
	return date[2] + "/" + date[1] + "/" + date[0];
}

