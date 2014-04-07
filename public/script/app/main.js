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
	'ldsh!./templates/movies',
	'text!./templates/movieDetail.html'
], function($, _, Backbone, moviesTemplate, movieDetailTemplate){
	// http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=rczqp5gzskevr2pnj2nj3b29

	var MoviesView = Backbone.View.extend({

		template: moviesTemplate,

		events: {
			'click h1': 'makeBlue'
		},

		render: function(){
			this.$el.append(this.template);

			return this;
		},

		makeBlue: function(e){
			var target = $(e.currentTarget);
			this.$el.css('color', 'blue');
		}
	});

	var MovieDetails = Backbone.View.extend({
		template: movieDetailTemplate,

		initialize: function(opts){
			this.options = opts;
		},

		render: function(){
			this.$el.append(_.template(movieDetailTemplate, this.options.movie));
			return this;
		}
	});

	$(function(){
		var moviesView = new MoviesView()
		$('body').append(moviesView.render().el);
		$.ajax({
			url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=rczqp5gzskevr2pnj2nj3b29",
			dataType: 'jsonp'
		}).then(function(res){
			console.log(res);
			_.each(res.movies, function(movie){
				$('body').append(new MovieDetails({movie: movie}).render().el);
			});
		});
	});
});







