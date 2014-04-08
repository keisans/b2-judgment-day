define([
	'jquery', 
	'lodash', 
	'backbone', 
	'text!./templates/movies.html',
	'text!./templates/movieDetail.html'
], function($, _, Backbone, movieCollectionTemplate, movieDetailTemplate){
	var Movies = {
		Models: {},
		Collections: {},
		Views: {}
	};

	Movies.Models.Movie = Backbone.Model.extend({});

	Movies.Collections.Movies = Backbone.Collection.extend({
		model: Movies.Models.Movie,
		url: "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?page_limit=16&page=1&country=us&apikey=rczqp5gzskevr2pnj2nj3b29",

		parse: function(res){
			return res.movies;
		}
	});

	Movies.Views.MoviesView = Backbone.View.extend({

		template: movieCollectionTemplate,

		events: {
			'click h1': 'makeBlue'
		},

		initialize: function(){
			this.collection.on('add', this.render, this);
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

	Movies.Views.MovieDetails = Backbone.View.extend({
		template: movieDetailTemplate,

		initialize: function(opts){
			this.options = opts;
		},

		render: function(){
			this.$el.append(_.template(movieDetailTemplate, this.options.movie));
			return this;
		}
	});

	return Movies;
});