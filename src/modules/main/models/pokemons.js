var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
	defaults: {
		_id: "",
		dexId: "",
		name: "",
		type1: "",
		generation: "",
		__v:0
	},
	idAttribute: 'dexId',
	urlRoot:"https://tratotest.herokuapp.com/pokemon"

});