(function () {
"use strict";

var app = angular.module('ctu', ['ui.router']);

var skylink = new Skylink();
app.constant('skylink', skylink);

} ());