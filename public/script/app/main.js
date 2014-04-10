require.config({
	paths: {
		'backbone': '../components/backbone/backbone',
		'lodash': '../components/lodash/dist/lodash',
		'jquery': '../components/jquery/dist/jquery',
		'text': '../components/requirejs-text/text',
		'ldsh': '../components/lodash-template-loader/loader',
		'localstorage': '../components/backbone.localstorage/backbone.localstorage'
	},
	map: {
		'*': {
			'underscore': 'lodash'
		}
	}
});

define([
	'jquery',
	'lodash', 
	'backbone',
	'util', 
	'movies/movies',
	'movieList/movieList',
], function($, _, Backbone, Util, Movies, MovieList){
	// http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=rczqp5gzskevr2pnj2nj3b29

	$(function(){
		var movieCollection = new Movies.Collections.Movies();
		var movieCollectionView = new Movies.Views.MoviesView({collection: movieCollection});

		$('#main').append(movieCollectionView.render().el);

		movieCollection.fetch({dataType: 'jsonp'});
	});
});







