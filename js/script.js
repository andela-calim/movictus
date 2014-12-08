$(document).ready(function () {
	$('form').submit( function (evt) {
		evt.preventDefault();

		var movie = $('#movie-name').val();

		var omdbAPI = 'http://www.omdbapi.com/?';
		var omdbOptions = {
			t: movie,
			plot: "full",
			r: "json",
			tomatoes: true
		};

		function displayMovie (data) {

			console.log(data);
			console.log(typeof(data));

			/* check if data received is an array or an object
			--------------------------------------------------*/
			if (typeof(data) !== 'array') {
				var arr = [];
				arr.push(data);
				console.log("Wasn't an array. Now an array: " + arr);
			} else {
				arr = data;
				console.log("Was an array: " + arr);
			}

			var movieString = '<ul>';
			$.each(arr, function(index, aMovie) {
				movieString += '<li>Title: ' + data.Title + '</li>';
				movieString += '<li>Plot: ' + data.Plot + '</li>';
				movieString += '<li>Language: ' + data.Language + '</li>';
				movieString += '<li>Country: ' + data.Country + '</li>';
				movieString += '<li>Awards: ' + data.Awards + '</li>';
				movieString += '<li>Ratings: ' + data.imdbRating + '</li>';
			});
			movieString += '</ul>';
			$('#result').html(movieString);
		}

		$.getJSON(omdbAPI, omdbOptions, displayMovie);
	});
});