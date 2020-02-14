var Marionette = require('backbone.marionette');
var PokemonItemView = require('../pokemon/pokemon');
var PokemonCompositeViewTemplate = require('./pokemoncollection.hbs')
var _ = require('underscore');
var PokemonCollection = require('../../collections/pokemons');
var PokemonItem = require('../../models/pokemons');



module.exports = Marionette.CompositeView.extend({
    tagName: "pokemoncolleciton",
    childViewContainer: ".tbody-hook",
    template:PokemonCompositeViewTemplate,
    initialize:function(){
        this.collection = new PokemonCollection();
        this.collection.fetch()
    },
    ui: {
        form: '#addNewPokemonForm',
        name: '#name',
        type1: '#type1',
        dexId: '#dexId',
        generation: '#generation',
        addButton: "#addButton"
    },
    events: {
        "click @ui.addButton" : "addPokemonItem"
    },
    onShow: function() {
    },
    check: function(e){
        console.log("wokring in here")
        e.preventDefault();
        return false;
    },
    modelEvents: {
        //"change": "contentAdded"
    },
    childView:PokemonItemView,
    getChildView: function(model) {
        return PokemonItemView;
    },
    childViewOptions: function(model, index) {
        return {
            childModel: model,
            childIndex: index
        }
    },
    addPokemonItem: function(e) {
        var self = this;

        if(!this.ui.dexId.val() || this.ui.dexId.val().length<0){
            this.ui.dexId.focus();
            return false;
        }

        if(!this.ui.name.val() || this.ui.name.val().length<0){
            this.ui.name.focus();
            return false;
        }
        if(!this.ui.type1.val() || this.ui.type1.val().length<0){
            this.ui.type1.focus();
            return false;
        }
        if(!this.ui.generation.val() || this.ui.generation.val().length<0){
            this.ui.generation.focus();
            return false;
        }
        
        var newPokemon = new PokemonItem({
            dexId: this.ui.dexId.val(),
            name: this.ui.name.val(),
            type1: this.ui.type1.val(),
            generation: this.ui.generation.val(),
        })

        newPokemon.save(null,{
            method: 'POST',
            url: 'https://tratotest.herokuapp.com/pokemon/',
            success: function(data){
                if(data.changed.data){
                    console.log(data.changed.data._id);
                    newPokemon.set("_id",data.changed.data._id)
                    self.collection.add(newPokemon);

                    self.ui.name.val('');
                    self.ui.type1.val('');
                    self.ui.generation.val('');
                    self.ui.dexId.val('');
                }
                else{
                    alert("invalid data");
                }
            }
        });

        

        
      },
});