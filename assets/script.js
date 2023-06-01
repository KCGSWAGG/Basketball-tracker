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
	console.log("working")
	var requestUrl = 'https://footapi7.p.rapidapi.com/api/matches/live';
	fetch(requestUrl, options)
	.then(function (reponse) {
		return reponse.json();
	})
	.then(function (data) {
		console.log(data)
		for (var i = 0; i < data.events.length; i++){
		var event = data.events[i]
		console.log("The TimeStamp is", event.startTimestamp)
		console.log("The home team is", event.homeTeam.name)
		console.log("The away team is", event.awayTeam.name)}
		// var game = data.list[i]
		// var match = document.createElement('div');
		// match.setAttribute("Class", "card");
		// var matchBody = document.createElement('div');
		// matchBody.setAttribute("Class", "matchBody");
		// match.appendChild(matchBody);
		// matchBody.appendChild("soccer-track-button")

	})
	


}
document.querySelector("#soccer-track-button").addEventListener("click", getTeams)