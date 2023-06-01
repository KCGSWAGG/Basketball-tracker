var soccerGames = document.getElementById("main-content")

var url = 'https://footapi7.p.rapidapi.com/api/search/champions';
var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5c924b5375msh180d4c389c807a5p1dc70fjsnf2a6c9051cc7',
		'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
	}
};

function getTeams() {
	var requestUrl = 'https://footapi7.p.rapidapi.com/api/match/10200674';
	console.log(Teams)

	fetch(requestUrl)
	.then(function (reponse) {
		return reponse.json;
	})
	.then(function (data) {
		console.log(data)
		for (var i = 0; i < data.list.length; i+=2)
		var game = data.list[i]
		var match = document.createElement('div');
		match.setAttribute("Class", "card");
		var matchBody = document.createElement('div');
		matchBody.setAttribute("Class", "matchBody");
		match.appendChild(matchBody);
		matchBody.appendChild("soccer-track-button")

	})
	document.getElementById("soccer-track-button").addEventListener("click", function (getTeams));


}
