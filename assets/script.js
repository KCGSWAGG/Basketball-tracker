var mainContentContainer = document.querySelector(".main-content")
console.log(mainContentContainer)
var url = 'https://footapi7.p.rapidapi.com/api/search/champions';
var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '404cb8548cmshdb04b9f931ecc25p14f062jsn3e6e88c1b722',
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
		var unixFormat = dayjs.unix(event.startTimestamp).format("MMM D, YYYY, hh:mm:ss a");
		console.log("The TimeStamp is", event.startTimestamp)
		console.log("The home team is", event.homeTeam.name)
		console.log("The away team is", event.awayTeam.name)
	// (".main").text(unixFormat)
		var matchCard = document.createElement('div')
		matchCard.setAttribute("class", "card");
		var matchBody = document.createElement('div')
		// matchBody.setAttribute("
		matchCard.innerHTML = `
		<h2>date${unixFormat}</h2>
		<p>homeTeam${event.homeTeam.name}</p>
		<p>awayTeam${event.awayTeam.name}</p>
		`;
		matchCard.appendChild(matchBody)
		mainContentContainer.appendChild(matchCard)
		
	}
		
		
	})
	
	


}
document.querySelector("#soccer-track-button").addEventListener("click", getTeams)


