define([
	'jquery', 
	'lodash', 
	'backbone', 
	'ldsh!./templates/movies',
	'ldsh!./templates/movieDetail',
	'ldsh!./templates/movieModal'
], function($, _, Backbone, movieCollectionTemplate, movieDetailTemplate, movieModalTemplate){
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

		template: movieCollectionTemplate(),

		events: {
			'click h1': 'makeBlue'
		},

		initialize: function(){
			//this.collection.on('add', this.addMovie, this);
			//this.collection.off('add')
			this.listenTo(this.collection, 'add', this.addMovie);
			//this.stopListening();
		},

		render: function(){
			this.$el.append(this.template);

			return this;
		},

		makeBlue: function(e){
			var target = $(e.currentTarget);
			this.$el.css('color', 'blue');
		},

		addMovie: function(model){
			// model.set('title', 'my new title');
			this.$el.append(new Movies.Views.MovieDetails({model: model}).render().el);
		}
	});

	Movies.Views.MovieDetails = Backbone.View.extend({
		template: movieDetailTemplate,

		events: {
			'click': 'openModal'
		},

		initialize: function(opts){
		},

		render: function(){
			this.$el.append(this.template(this.model.toJSON()));
			return this;
		},

		openModal: function(e){
			e.preventDefault();
			$('body').append(new Movies.Views.MovieModal({model: this.model}).render().el);
		}
	});

	Movies.Views.MovieModal = Backbone.View.extend({
		template: movieModalTemplate,

		events: {
			'click': 'removeMe'
		},

		render: function(){
			this.$el.append(this.template(this.model.toJSON()));

			return this;
		},

		removeMe: function(e){
			e.preventDefault();
			this.remove();
		}
	})

	return Movies;
});