require.config({
	paths: {
		'backbone': '../components/backbone/backbone',
		'lodash': '../components/lodash/dist/lodash',
		'jquery': '../components/jquery/dist/jquery',
		'text': '../components/requirejs-text/text',
		'ldsh': '../components/lodash-template-loader/loader'
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
	'movies/movies'
], function($, _, Backbone, Movies){
	// http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=rczqp5gzskevr2pnj2nj3b29

	$(function(){
		var movieCollection = new Movies.Collections.Movies();
		var movieCollectionView = new Movies.Views.MoviesView({collection: movieCollection});

		$('#main').append(movieCollectionView.render().el);

		movieCollection.fetch({dataType: 'jsonp'});
	});
});







