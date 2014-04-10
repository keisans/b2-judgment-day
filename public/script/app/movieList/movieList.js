define([
	'jquery', 
	'lodash', 
	'backbone', 
	'util', 
	'ldsh!./templates/movieList',
	'localstorage'
], function($, _, Backbone, Util, movieListTemplate){
	var MovieList = {
		Models: {},
		Collections: {},
		Views: {}
	}

	return MovieList;
});