// main file for making and starting marionette app
var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

var MainModule = require('./modules/main/module');

// app bootstrap
var App = new Marionette.Application();

App.module('main', MainModule);
App.on("start",function(){
    console.log("pokemon app started");
})
App.start();
Backbone.history.start();


module.exports = App;
