var app = {
	init: function () {
		var _this = this;
		this.resultField = $('#result');

		$('form').submit(function (e) {
			e.preventDefault();
			console.log(this);
			console.log(_this);

			_this.inputField = $('.search-name');
			_this.inputFieldValue = _this.inputField.val();

			_this.movieSearchBtn = $('#movie-search-btn');

			_this.tmdbAPI = 'http://api.themoviedb.org/3/search/movie?';
			_this.tmdbOptions = {
				api_key: '21a6a3f0f59f75c9e2ea92921f84ecf2',
				query: _this.inputFieldValue

			};
			console.log(_this.tmdbOptions);

			app.retrieveMovie();
		})
	},

	retrieveMovie: function () {
		$.getJSON(this.tmdbAPI, this.tmdbOptions, this.displayMovie);

	},
	
	displayMovie: function (data) {
		console.log(data);

		mData = data.results;

		var movieString = '<ul class="answers">';
		$.each(mData, function (i, movie) {
			if (movie.poster_path !== null) {
				movieString += '<li><img src="http://image.tmdb.org/t/p/w500' + movie.poster_path + '" class="image"> ';
				movieString += 'Title: ' + movie.original_title + '</li>';
			}
			// } else {
					movieString += '<li><img src="imgs/default.png" class="image">';
					movieString += 'Title: ' + movie.original_title + '</li>';
			// 	movieString += '<li><img src="imgs/default.png/" style="visibility: hidden"></li>';
			// }

			
		});
		movieString += '</ul>';

		$('#result').html(movieString);
	}
}

window.load = app.init();