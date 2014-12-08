var app = {
	init: function () {
		// this.movieInput = $('#movie-name').val();
		// console.log("initFn: this.movieInput= "+ this.movieInput);
		this.movieSearchBtn = $('#search-btn');
		console.log("initFn: this.movieSearchBtn= "+ this.movieSearchBtn);
		this.movieResult = $('#result');
		console.log("initFn: this.movieResult= "+ this.movieResult);

		this.omdbAPI = 'http://www.omdbapi.com/?';
		console.log("initFn: this.omdbAPI= "+ this.omdbAPI);
		// this.omdbOptions = {
		// 	t: app.movieInput,
		// 	plot: "full",
		// 	r: "json",
		// 	tomatoes: true
		// };
		// console.log("initFn: this.omdbOptions= "+ this.omdbOptions);

		this.handleEvents();
	},

	handleEvents: function () {

		var begin = function () {
			this.movieInput = $('#movie-name').val();
			console.log("initFn: this.movieInput= "+ this.movieInput);
			
			this.omdbOptions = {
			t: $('#movie-name').val(),
			plot: "full",
			r: "json",
			tomatoes: true
			};
			console.log("initFn: this.omdbOptions= "+ this.omdbOptions.t);
			console.log("initFn: this.omdbOptions= "+ this.omdbOptions.plot);
			console.log("initFn: this.omdbOptions= "+ this.omdbOptions.r);
			console.log("initFn: this.omdbOptions= "+ this.omdbOptions.tomatoes);
		}

		this.movieSearchBtn.click( begin.bind(this) );
		app.displayMovie();
	},



	fetchMovie: function (data) {
		console.log('Button was clicked');
		console.log('fetchMovieFn: this.movieInput= ' + app.movieInput);
		var arr;

		/* check if data received is an array or an object
			--------------------------------------------------*/
		if (!data.length) {
			arr = [];
			arr.push(data);
			console.log("Wasn't an array. Now an array: " + arr);
		} else {
			
			arr = data;
			console.log("Was an array: " + arr);
		}

		var movieString = '<ul>';
		$.each(arr, function(index, aMovie) {
			movieString += '<li>Title: ' + arr.Title + '</li>';
			movieString += '<li>Plot: ' + arr.Plot + '</li>';
			movieString += '<li>Language: ' + arr.Language + '</li>';
			movieString += '<li>Country: ' + arr.Country + '</li>';
			movieString += '<li>Awards: ' + arr.Awards + '</li>';
			movieString += '<li>Ratings: ' + arr.imdbRating + '</li>';
		});
		movieString += '</ul>';
		$('#result').html(movieString);
	},

	displayMovie: function () {
		console.log('displayMovieFn: app.omdbAPI= ' + this.omdbAPI);
		console.log('displayMovieFn: this= ' + app.hasOwnProperty('omdbOptions'));
		console.log('displayMovieFn: app.omdbOptions= ' + this.omdbOptions);
		console.log('displayMovieFn: app.omdbOptionsType= ' + typeof(this.omdbOptions));
		console.log('displayMovieFn: app.fetchMovie= ' + this.fetchMovie.arr);
		$.getJSON(this.omdbAPI, this.omdbOptions, this.fetchMovie);
	}
};

window.load = app.init();