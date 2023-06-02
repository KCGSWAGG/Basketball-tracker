var mainContentContainer = document.querySelector(".main-content");
console.log(mainContentContainer);
var url = 'https://baseballapi.p.rapidapi.com/api/baseball/matches/live';
var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5c924b5375msh180d4c389c807a5p1dc70fjsnf2a6c9051cc7',
		'X-RapidAPI-Host': 'baseballapi.p.rapidapi.com'
	}
};

function getTeams() {
  console.log("working");
  var requestUrl = 'https://baseballapi.p.rapidapi.com/api/baseball/matches/live';
  fetch(requestUrl, options)
    .then(function (reponse) {
      return reponse.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.events.length; i++) {
        var event = data.events[i];
        var unixFormat = dayjs
          .unix(event.startTimestamp)
          .format("MMM D, YYYY, hh:mm:ss a");
        console.log("The TimeStamp is", event.startTimestamp);
        console.log("The home team is", event.homeTeam.name);
        console.log("The away team is", event.awayTeam.name);
        var matchCard = document.createElement("div");
        matchCard.setAttribute("class", "card");
        var matchBody = document.createElement("div");
        matchCard.innerHTML = `
		<h2>date${unixFormat}</h2>
		<p>homeTeam${event.homeTeam.name}</p>
		<p>awayTeam${event.awayTeam.name}</p>
		`;
        matchCard.appendChild(matchBody);
        mainContentContainer.appendChild(matchCard);
      }
    });
}
document
  .querySelector("#baseball-track-button")
  .addEventListener("click", getTeams);
