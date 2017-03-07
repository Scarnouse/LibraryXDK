/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */

function getBooks() {
    $.ajax({
        url: HOST_BOOK + URL_BOOK,
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            var table = $('<table class="striped bordered"/>');

            var tr = $('<thead/>').append('<tr/>');
            tr.append('<th data-field="isbn">ISBN</th>');
            tr.append('<th data-field="title">TÍTULO</th>');
            tr.append('<th data-field="author">AUTOR</th>)');

            table.append(tr);

            var tbody = $('<tbody/>');

            for (item of data) {
                var tRow = $("<tr class='dropdown-button' href='#' data-activates='dropdown2' onclick='changeMenuUpdateValue("+ item.id + ")'></tr>");

                tRow.append('<td>' + item.isbn + '</td>');
                tRow.append('<td>' + item.title + '</td>');
                tRow.append('<td>' + item.author + '</td>');

                tbody.append(tRow);
            }

            var ul = $('<ul id="dropdown2" class="dropdown-content dropdown-menu-center"></ul>');
            var create = $('<li><a onclick="printFormCreateBook()">Crear</a></li>');
            var edit = $('<li><a id="idBook" onclick="printFormUpdateBook()">Editar</a></li>');
            var divider = $('<li class="divider"></li>');
            var del = $('<li><a onclick="deleteBook()">Borrar</a></li>');

            ul.append(create);
            ul.append(edit);
            ul.append(divider);
            ul.append(del);

            tbody.append(ul);

            table.append(tbody);

            $('#book').append(table);

            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'center', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            	}
            );
        },

        error: function () {
            $('#book').html('Error en el servidor');
        }
    });
}

function changeMenuUpdateValue(id) {
    $('#idBook').val(id);
}

function printFormCreateBook() {
    $('#book').empty();
    printForm();

}

function printForm(book) {

    var div = $('<div class = "row"></div>');
    var form = $('<div class = "col s12"></div>');

    var divIsbn = $('<div class = "input-field col s12"></div>');
    var i = $('<i class="material-icons prefix">web</i>');
    var isbn = $('<input id="isbn" type="text" class="validate">');
    var label = $('<label for="isbn">ISBN</label>');

    divIsbn.append(i);
    divIsbn.append(isbn);
    divIsbn.append(label);


    var divTitle = $('<div class = "input-field col s12"></div>');
    i = $('<i class="material-icons prefix">mode_edit</i>');
    var title = $('<input id="title" type="text" class="validate">');
    label = $('<label for="title">TITULO</label>');

    divTitle.append(i);
    divTitle.append(title);
    divTitle.append(label);


    var divAuthor = $('<div class = "input-field col s12"></div>');
    i = $('<i class="material-icons prefix">person_pin</i>');
    var author = $('<input id="author" type="text" class="validate">');
    label = $('<label for="author">AUTOR</label>');

    divAuthor.append(i);
    divAuthor.append(author);
    divAuthor.append(label);

    var cancel = $('<button style="margin: 2%" class="btn waves-effect waves-light col s4">Cancelar</button>');
    var submit = $('<button style="margin: 2%; float:right" class="btn waves-effect waves-light col s4">Enviar</button>');
    i = $('<i class="material-icons right">send</i>');

    submit.append(i);

    form.append(divIsbn);
    form.append(divTitle);
    form.append(divAuthor);
    form.append(cancel);
    form.append(submit);

    div.append(form);

    $('#book').append(div);

    if (book !== undefined) {

		$('#isbn').val(book.isbn);
        $('#title').val(book.title);
        $('#author').val(book.author);

		$(document).ready(function() {
			Materialize.updateTextFields();
  		});

		$(submit).click(function() {
            book.author = $('#author').val();
            book.title = $('#title').val();
            book.isbn = $('#isbn').val();

			putBook(book);
		});
    }
	else {
		$(submit).click(function() {
			postBook();
		});
	}

    $(cancel).click(function(){
            $("#book").empty();
            getBooks();
    });

}

function printFormUpdateBook() {

    var idBook = $('#idBook').val();

    $.ajax({
        url: HOST_BOOK + URL_BOOK + idBook,
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $('#book').empty();
            printForm(data);
        },
        error: function(err) {
            $('#book').html(JSON.stringify(err));
        }

    });

}

function postBook() {

    var book = {
        "id" : null,
        "isbn" : $('#isbn').val(),
        "title" : $('#title').val(),
        "author" : $('#author').val(),
        "idReaderFk" : null,
        "loanDate" : null
    }

	$.ajax({
        headers :{
            "Accept" : 'application/json',
            "Content-Type" : "application/json"
        },
		url: HOST + URL,
		type: "POST",
        data : JSON.stringify(book),
		dataType: "JSON",
		success: function(data) {
            $("#book").empty();
            getBooks();
		},
		error: function(err) {
		  $('#book').html(JSON.stringify(err));
		}
	});
}

function putBook(book) {
    $.ajax({
        headers :{
            "Accept" : 'application/json',
            "Content-Type" : "application/json"
        },
		url: HOST_BOOK + URL_BOOK + book.id,
		type: "PUT",
        data : JSON.stringify(book),
		dataType: "JSON",
		success: function(data) {
		    $("#book").empty();
            getBooks();
		},
		error: function(err) {
		  $('#book').html(JSON.stringify(err));
		}
	});

}

function deleteBook(){

    var idBook = $('#idBook').val();

    $.ajax({
		url: HOST_BOOK + URL_BOOK + idBook,
		type: "DELETE",
		dataType: "JSON",
		success: function(data) {
		    $("#book").empty();
            getBooks();
		},
		error: function(err) {
		  $('#book').html(JSON.stringify(err));
		}
	});

}

