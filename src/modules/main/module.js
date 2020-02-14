// controller to the main view.
var Controller = require('./controller');
var Router = require('./router');
var Marionette = require('backbone.marionette');

//layout to the main view
var LayoutView = require('./views/layout/layout');

module.exports = Marionette.Module.extend({

    initialize: function(){

    },

    onStart: function(){

        var layoutView = new LayoutView();

        this.addInitializer(function(){
            this.app.addRegions({
                appContainer: '.app'
            });

            this.app.appContainer.show(layoutView);

            this.controller = new Controller({
                module: this,
                regions: this.app.appContainer.currentView
            });

            this.router = new Router({
                controller: this.controller
            });
        });


        this.addFinalizer(function(){
            this.controller.destroy();
        });

    }

});