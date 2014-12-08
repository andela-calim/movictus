var app = {
	init: function() {
		
		this.placeSearchBtn = $('#place-search-btn');
		this.resultField = $('#result');

		this.handleEvents();	
	},

	handleEvents: function() {
		var _this = this;
		

		$('form').submit(function (e) {

			e.preventDefault();
			console.log(this);
			console.log(_this);
			_this.inputField = $('.search-name');
			_this.movieSearchBtn = $('#movie-search-btn');

			// $.inputField.prop("disabled", true);
			// $.movieSearchBtn.prop("disabled", true).val("Searching..");



			_this.inputFieldValue = _this.inputField.val();
			console.log('u clicked me...');
			console.log('inputBtn...this.inputFieldValue: ' + _this.inputFieldValue);
			console.log('searchBtn...this.searchBtn: ' + _this.searchBtn);
			console.log('resultField...this.resultField: ' + _this.resultField);

			_this.omdbAPI = 'http://www.omdbapi.com/?';
			_this.omdbOptions = {
				t: _this.inputFieldValue,
				plot: "full",
				r: "json",
				tomatoes: true
			};
			console.log("initFn: this.omdbOptions= "+ _this.omdbOptions.t);
			console.log("initFn: this.omdbOptions= "+ _this.omdbOptions.plot);
			console.log("initFn: this.omdbOptions= "+ _this.omdbOptions.r);
			console.log("initFn: this.omdbOptions= "+ _this.omdbOptions.tomatoes);

			app.displayMovie();
		});

		this.placeSearchBtn.click(function () {
			_this.inputFieldValue = _this.inputField.val();
			console.log('inputBtn...this.inputFieldValue: ' + _this.inputFieldValue);

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					_this.latLong = position.coords.latitude + ',' + position.coords.longitude;


					console.log(_this);
					console.log(_this.latLong);

					_this.fourSqAPI = 'https://api.foursquare.com/v2/venues/explore';
					_this.fourSqOptions = {
						"client_id": "O0YE0WUBFIZKPFJXA2SWCHBUE4ACYHFEXCQTMPS54FP1WIFI",
						"client_secret": "CKQVH0WQMCCKPXRO4AHWUTVSV3E04FLZMPVT544BAJBSA3G0",
						"m": "foursquare",
						"v": "20140806",
						"ll": _this.latLong,
						"venuePhotos": "1",
						"query": _this.inputFieldValue
					};
					console.log("initFn: this.fourSqOptions.client_id= "+ _this.fourSqOptions["?client_id"]);
					console.log("initFn: this.fourSqOptions.client_secret= "+ _this.fourSqOptions["&client_secret"]);
					console.log("initFn: this.fourSqOptions.version= "+ _this.fourSqOptions["&v"]);
					console.log("initFn: this.fourSqOptions.latitude_longitude= "+ _this.fourSqOptions["&ll"]);
					console.log("initFn: this.fourSqOptions.query= "+ _this.fourSqOptions["&query"]);

					app.displayPlace();

				})
			}

			
			
		});
	},

	displayMovie: function () {
		console.log(this); //this refers to app
		$.getJSON(this.omdbAPI, this.omdbOptions, this.fetchMovie )
	},

	fetchMovie: function (data) {
		//this refers to omdbOptions
		console.log('fetching movie...');
		console.log(app);
		console.log('omdbAPI: ' + app.omdbAPI);
		console.log(data);
		console.log(data.Year);

		// if (!data.length) {
		// 	arr = [];
		// 	arr.push(data);
		// 	console.log("Wasn't an array. Now an array: " + arr.Year);
		// } else {
		// 	arr = data;
		// 	console.log("Was an array: " + arr.plot);
		// }
		// console.log(data.Year);
		// console.log(arr.Year);

		
		// var movieString = '<ul class="answers">';
		var $link = $('<img>').attr('src', data.Poster);
		$link.attr('class', 'image');
		$liTitle = $('<li>').text('Title: ' + data.Title);
		$liYear = $('<li>').text('Year: ' + data.Year);
		$liGenre = $('<li>').text('Genre: ' + data.Genre);
		$liActors = $('<li>').text('Actors: ' + data.Actors);
		$liDirector = $('<li>').text('Director(s): ' + data.Director);
		$liPlot = $('<li>').text('Plot: ' + data.Plot);
		$liRated = $('<li>').text('Rated: ' + data.Rated);
		$liReleased = $('<li>').text('Released: ' + data.Released);
		$liRuntime = $('<li>').text('Runtime: ' + data.Runtime);
		$liWriter = $('<li>').text('Writer: ' + data.Writer);
		$liLanguage = $('<li>').text('Language: ' + data.Language);
		$liCountry = $('<li>').text('Country: ' + data.Country);
		$liBoxOffice = $('<li>').text('BoxOffice: ' + data.BoxOffice);
		$liAwards = $('<li>').text('Awards: ' + data.Awards);
		$liImdbRating = $('<li>').text('Rating: ' + data.imdbRating);

		// $.each(arr, function(index, aMovie) {
			
		// 	// movieString += '<img src="' + aMovie.Poster + '" class="image">';
		// 	movieString += '<li>Title: ' + aMovie.Title + '</li>';
		// 	movieString += '<li>Year: ' + aMovie.Year + '</li>';
		// 	movieString += '<li>Genre: ' + aMovie.Genre + '</li>';
		// 	movieString += '<li>Actors: ' + aMovie.Actors + '</li>';
		// 	movieString += '<li>Director(s): ' + aMovie.Director + '</li>';
		// 	movieString += '<li>Plot: ' + aMovie.Plot + '</li>';
		// 	movieString += '<li>Rated: ' + aMovie.Rated + '</li>';
		// 	movieString += '<li>Released: ' + aMovie.Released + '</li>';
		// 	movieString += '<li>Runtime: ' + aMovie.Runtime + '</li>'
		// 	movieString += '<li>Writer: ' + aMovie.Writer + '</li>';
		// 	movieString += '<li>Language: ' + aMovie.Language + '</li>';
		// 	movieString += '<li>Country: ' + aMovie.Country + '</li>';
		// 	movieString += '<li>BoxOffice: ' + aMovie.BoxOffice + '</li>';
		// 	movieString += '<li>Awards: ' + aMovie.Awards + '</li>';
		// 	movieString += '<li>Ratings: ' + aMovie.imdbRating + '</li>';
		// });
		// movieString += '</ul>';
			var $movieString = $('<ul class="answers">');
			$movieString.append($link, $liTitle, $liYear, $liGenre, $liActors, $liDirector, $liPlot, $liRated, $liReleased, $liRuntime, $liWriter, $liLanguage, $liCountry, $liBoxOffice, $liAwards, $liImdbRating);

			// console.log($movieString);
		$('#result').html($movieString);
	},

	displayPlace: function () {
		console.log(this); //this refers to app
		$.getJSON(this.fourSqAPI, this.fourSqOptions, this.fetchPlace)
	},

	fetchPlace: function (data) {
		console.log('fetching place...');
		console.log(app);
		console.log(this);
		console.log('fourSqAPI: ' + app.fourSqAPI);
		console.log(data);

		// if (!data.response.venues.length) {
		// if (!data.response.groups[0].items[0].venue.length) {
		if (!data.response.groups[0].items.length) {
			arr = [];
			// arr.push(data.response.venues);
			// arr.push(data.response.groups[0].items[0].venue)
			arr.push(data.response.groups[0].items)
			console.log("Wasn't an array. Now an array: ");
			console.log(arr);
		} else {
			// arr = data.response.venues;
			// arr = data.response.groups[0].items[0].venue;
			arr = data.response.groups[0].items;
			console.log("Was an array: ");
			console.log(arr);
		}

		// images = data.response.venues[0].categories[0].icon.prefix + data.response.venues[0].categories[0].icon.suffix;
		// console.log(data.response.venues[0].categories[0].icon.prefix + data.response.venues[0].categories[0].icon.suffix);
		// console.log(data.response.venues[0].categories[0].icon.prefix + data.response.venues[0].categories[0].icon.suffix);

		var placeString = '<ul class="answers">';
		$.each(arr, function (index, aPlace) {
			console.log(index);

			// images = aPlace.categories[index].icon.prefix + aPlace.categories[index].icon.suffix;
			// console.log(aPlace.categories[0].icon.prefix + aPlace.categories[0].icon.suffix);
			// placeString += '<img src="' + images + '">';
			placeString += '<img src="' + aPlace.venue.photos.groups[0].items[0].prefix + '400x150' + aPlace.venue.photos.groups[0].items[0].suffix + '">';
			placeString += '<li> Name: ' + aPlace.venue.name + '</li>';
			placeString += '<li> Address: ' + aPlace.venue.location.formattedAddress + '</li><br><br>';
			
		})

		placeString += '</ul>';

		$('#result').html(placeString);
	}
};

window.load = app.init();