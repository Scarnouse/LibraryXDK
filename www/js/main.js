/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */

var HOST_READER = "http://35.163.178.255:80/";
var URL_READER = "LibraryRESTGF/webresources/entity.reader/";

var HOST_BOOK = "http://35.163.178.255:80/";
var URL_BOOK = "LibraryRESTGF/webresources/entity.book/";

$(document).ready(function () {
    getReaders();
    getBooks();
    getTakenBooks();
});

