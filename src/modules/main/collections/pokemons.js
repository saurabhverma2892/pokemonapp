var Backbone = require('backbone');
var pokemonModel = require('../models/pokemons');

module.exports = Backbone.Collection.extend({
	model: pokemonModel,
	url:"https://tratotest.herokuapp.com/pokemon",
	parse: function(response) {
        
        var self = this;
		response.data.forEach(function(item){
			var member = new self.model();
			member.set('_id', item._id);
			member.set('dexId', item.dexId);
			member.set('name', item.name);
			member.set('type1', item.type1);
			member.set('generation', item.generation);
			member.set('__v', item.__v);
            self.push(member);
		})
        return this.models;
    }
});