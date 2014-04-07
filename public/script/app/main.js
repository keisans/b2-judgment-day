require.config({
	paths: {
		'backbone': '../components/backbone/backbone',
		'lodash': '../components/lodash/dist/lodash',
		'jquery': '../components/jquery/dist/jquery'
	},
	map: {
		'*': {
			'underscore': 'lodash'
		}
	}
});

define(['jquery', 'lodash', 'backbone'], function($, _, Backbone){
	// http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=rczqp5gzskevr2pnj2nj3b29
});