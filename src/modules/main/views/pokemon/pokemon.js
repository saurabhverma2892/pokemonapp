var Marionette = require('backbone.marionette');
var PokemonItemViewTemplate = require('./pokemon.hbs');

module.exports = Marionette.ItemView.extend({

    template: PokemonItemViewTemplate,
    tagName: 'tr',
    className: 'pokemon-item',
    ui: {
        editButton:".edit-button",
        deleteButton:".delete-button",
        cancelButton:".cancel-button",
        saveButton:".save-button",
        name: '.name',
        type1: '.type1',
        generation: '.generation'
    },
    events: {
        "click @ui.editButton" : "edit",
        "click @ui.deleteButton" : "delete",
        "click @ui.cancelButton" : "cancelEdit",
        "click @ui.saveButton" : "saveEdit",
    },
    onShow: function() {

    },
    modelEvents: {
        'change': "modelChanged"
    },
    modelChanged: function() {
        console.log("model changed");
        this.render();
    },
    edit: function(e){
        this.$el.addClass('editing');
        this.ui.name.val(this.model.get("name"));
        this.ui.type1.val(this.model.get("type1"));
        this.ui.generation.val(this.model.get("generation"));
    },
    delete: function(e){
        this.model.destroy();
    },
    cancelEdit: function(e){
        this.$el.removeClass('editing');
    },
    saveEdit: function(e){

        this.model.set({
            "name":this.ui.name.val(),
            "type1":this.ui.type1.val(),
            "generation":this.ui.generation.val(),
        }).save();
        this.$el.removeClass('editing');
    }
});