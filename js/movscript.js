var app = {
	init: function () {
		var _this = this;
		this.resultField = $('#result'); //defining and assigning resultField

		$('form').submit(function (e) {
			e.preventDefault(); //preventing default action

			_this.inputField = $('.search-name');
			_this.inputFieldValue = _this.inputField.val();

			_this.movieSearchBtn = $('#movie-search-btn');

			// API URL and PARAMETERS //
			//------------------
			_this.tmdbAPI = 'http://api.themoviedb.org/3/search/movie?';
			_this.tmdbOptions = {
				api_key: '21a6a3f0f59f75c9e2ea92921f84ecf2',
				query: _this.inputFieldValue

			};

			app.retrieveMovie();
		})
	},

	retrieveMovie: function () {
		$.getJSON(this.tmdbAPI, this.tmdbOptions, this.displayMovie);

	},
	
	displayMovie: function (data) { //response embedded in data
		mData = data.results;

		var movieString = '<p class="searchResults">Search Results: </p>';
		movieString += '<ul class="answers">';
		$.each(mData, function (i, movie) { //loop through each item in array
			if (movie.poster_path !== null) { //if item has a picture

				//create a list tag, appending picture and the title
				movieString += '<li class="movie_title"><img src="http://image.tmdb.org/t/p/w500' + movie.poster_path + '" class="image"> ';
				movieString += '<span class="image_text">' + movie.original_title + '</span></li>';
			} else {

				//create a list tag, appending a default image and the title
				movieString += '<li><img src="imgs/default.png" class="image">';
				movieString += movie.original_title + '</li>';
			}
			
		});
		movieString += '</ul>';

		$('#result').html(movieString); //insert into result div
	}
}

window.load = app.init();