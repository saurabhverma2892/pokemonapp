var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var HeaderView = require('./views/header/header');
var PokemonCollectionView = require('./views/pokemoncollection/pokemoncollection');

var Datas = require('../../../datas.json');

var pokemonCollection = require('./collections/pokemons');

module.exports = Marionette.Controller.extend({

    onStart: function() {
        this.options.regions.header.show(new HeaderView());
    },

    indexAction: function() {
    	this.showPokemonCollectionViewAction();
    },
    
    showPokemonCollectionViewAction: function() {
        var coll = new PokemonCollectionView();
        this.options.regions.mainContainer.show(coll);
    }

});