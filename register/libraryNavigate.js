"use strict";
var $ = function(id) { return document.getElementById(id); };

var navigate = {
    showForm: function() {
        $("registrationForm").setAttribute("class","show");
        $("registrationResult").setAttribute("class","hide");
    },
    showResults: function() {
        $("registrationForm").setAttribute("class","hide");
        $("registrationResult").setAttribute("class","show");
    }
};
