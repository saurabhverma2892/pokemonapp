var Marionette = require('backbone.marionette');
var HeaderTemplate = require('./header.hbs');
var $ = require('jquery');

module.exports = Marionette.ItemView.extend({

    template: HeaderTemplate,
    tagName: 'header',
    events: {
    },
    onShow: function() {

    },
    menuNavigateToRoute: function(evt) {

    }
});