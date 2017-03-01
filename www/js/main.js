/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */

/*$(document).ready(function () {
    getReaders();
});*/

function getReaders() {
    $.ajax({
        url: "http://192.168.1.35:8085/LibraryREST/webresources/com.iesvdc.acceso.entity.reader",
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {

            var table = $('<table/>');

            var tr = $('<thead/>').append('<tr/>');
            tr.append('<th data-field="dni">DNI</th>');
            tr.append('<th data-field="name">NOMBRE</th>');
            tr.append('<th data-field="last-name">APELLIDOS</th>)');
            tr.append('<th data-field="birthday">FECHA DE NACIMIENTO</th>');

            table.append(tr);

            var tbody = $('<tbody/>');

            for (item of data) {
                var tRow = $("<tr class='dropdown-button' href='#' data-activates='dropdown1' onclick='changeMenuUpdateValue("+ item.id + ")'></tr>");

                tRow.append('<td>' + item.dni + '</td>');
                tRow.append('<td>' + item.name + '</td>');
                tRow.append('<td>' + item.lastName + '</td>');
                tRow.append('<td>' + dateConverter(item.birthday) + '</td>');

                tbody.append(tRow);
            }

            table.append(tbody);

            $('#reader').append(table);

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
            $('#reader').html('ERROR');
        }
    });
}

function changeMenuUpdateValue(id) {
    $('#buttonUpdate').val(id);
}

function printFormCreateReader() {

    $('#reader').empty();
    printForm();

}

function printForm(reader) {

    var div = $('<div class = "row"></div>');
    var form = $('<form class = "col s12"></form>');
    var divDni = $('<div class = "input-field col s12"></div>');
    var i = $('<i class="material-icons prefix">web</i>');
    var dni = $('<input id="dni" type="text" class="validate">');
    var label = $('<label for="dni">DNI</label>');

    divDni.append(i);
    divDni.append(dni);
    divDni.append(label);


    var divName = $('<div class = "input-field col s12"></div>');
    i = $('<i class="material-icons prefix">person_pin</i>');
    var name = $('<input id="name" type="text" class="validate">');
    label = $('<label for="name">NOMBRE</label>');

    divName.append(i);
    divName.append(name);
    divName.append(label);


    var divLastName = $('<div class = "input-field col s12"></div>');
    i = $('<i class="material-icons prefix">person_pin</i>');
    var lastName = $('<input id="last_name" type="text" class="validate">');
    label = $('<label for="last_name">APELLIDO</label>');

    divLastName.append(i);
    divLastName.append(lastName);
    divLastName.append(label);

    var divBirthday = $('<div class = "input-field col s12"></div>');
    i = $('<i class="material-icons prefix">perm_contact_calendar</i>');
    var birthday = $('<input id="birthday" type="text" class="validate">');
    label = $('<label for="birthday">FECHA DE NACIMIENTO</label>');

    divBirthday.append(i);
    divBirthday.append(birthday);
    divBirthday.append(label);


    var cancel = $('<button style="margin: 2%" class="btn waves-effect waves-light col s4" name="action">Cancelar</button>');
    var submit = $('<button style="margin: 2%; float:right" class="btn waves-effect waves-light col s4" name="action">Enviar</button>');
    i = $('<i class="material-icons right">send</i>');

    submit.append(i);

    form.append(divDni)
    form.append(divName)
    form.append(divLastName)
    form.append(divBirthday)
    form.append(cancel);
    form.append(submit);

    div.append(form);


    $('#reader').append(div);

    if (reader !== undefined) {

		$('#dni').val(reader.dni);
        $('#name').val(reader.name);
        $('#last_name').val(reader.lastName);

		var date = dateConverter(reader.birthday)

        $('#birthday').val(date);

		$(document).ready(function() {
			Materialize.updateTextFields();
  		});

		$(submit).click(function() {
			putReader();
		});
    }
	else {
		$(submit).click(function() {
			postReader();
		});
	}
}

function printFormUpdateReader() {

    var idReader = $('#buttonUpdate').val();

    $.ajax({
        url: 'http://192.168.1.35:8085/LibraryREST/webresources/com.iesvdc.acceso.entity.reader/'+idReader,
        type: 'GET',
        dataType: 'JSON',
        success: function(data) {
            $('#reader').empty();
            printForm(data);
        },
        error: function(err) {

        }

    });

}

function dateConverter(date) {
	var array = date.split('T');
	var date = array[0].split('-');
	return date[2] + "/" + date[1] + "/" + date[0];
}

function postReader() {
	/*
	$.ajax({
		url; "",
		type: "POST",
		dataType: "JSON",
		success: function(data) {

		},
		error: function(err) {

		}
	});
	*/
}

function putReader() {
		/*
		$.ajax({
		url; "",
		type: "PUT",
		dataType: "JSON",
		success: function(data) {

		},
		error: function(err) {

		}
	});
	*/
}
