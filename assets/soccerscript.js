var completedGamesContainer = document.querySelector('.completed-games-container');
var upcomingContentContainer = document.querySelector('.upcoming-games-container');
var completedGames = document.querySelector('.completed-games');
var upcomingGames = document.querySelector('.upcoming-games');

var currentDate = new Date();
var currentMonth = currentDate.getUTCMonth() + 1;
var currentDay = currentDate.getUTCDate();
var currentYear = currentDate.getUTCFullYear();

var requestUrl = `https://footapi7.p.rapidapi.com/api/matches/top/${currentDay}/${currentMonth}/${currentYear}`;
var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5c924b5375msh180d4c389c807a5p1dc70fjsnf2a6c9051cc7',
		'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
	}
};

// returns dateToFormat passed as formatted date (DD/MM/YYYY)
function convertTimestamp(timestamp) {
	var date = new Date(timestamp * 1000);
	var formattedDate = date.toLocaleDateString('en-GB');
	return formattedDate;
}

function handleSoccerTrack() {
	handleSoccerClear();
	var completedGamesTitle = document.createElement('div');
	var upcomingGamesTitle = document.createElement('div');
	completedGamesTitle.setAttribute('id', 'completed-container');
	upcomingGamesTitle.setAttribute('id', 'upcoming-container');

	completedGamesTitle.innerHTML = '<h1 class="title has-text-centered mb-3">Completed Games</h1>';
	upcomingGamesTitle.innerHTML = '<h1 class="title has-text-centered mb-3">Upcoming Games</h1>';

	completedGamesContainer.prepend(completedGamesTitle);
	upcomingContentContainer.prepend(upcomingGamesTitle);

	fetch(requestUrl, options)
		.then(function (reponse) {
			return reponse.json();
		})
		.then(function (data) {
			for (var i = 0; i < data.events.length; i++) {
				var event = data.events[i];
				console.log(event);

				var gameTime = convertTimestamp(event.startTimestamp);
				var matchCard = document.createElement('div');

				if (event.status.type === 'finished') {
					matchCard.innerHTML = `
            <div class="card mb-5">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">${event.homeTeam.name} vs. ${event.awayTeam.name}</p>
                      <p class="subtitle is-6"><strong>Date of match:</strong> ${gameTime}</p>
                    </div>
                  </div>
                  <div class="content">
                    ${event.homeTeam.name} scored ${event.homeScore.current} and ${event.awayTeam.name} scored ${event.awayScore.current}.
                  </div>
                </div>
              </div>
		      `;
					completedGames.appendChild(matchCard);
				} else {
					matchCard.innerHTML = `
            <div class="card mb-5">
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">${event.homeTeam.name} vs. ${event.awayTeam.name}</p>
                      <p class="subtitle is-6"><strong>Date of match:</strong> ${gameTime}</p>
                    </div>
                  </div>
                  <div class="content">
                    Score to be determined.
                  </div>
                </div>
              </div> 
		      `;
					upcomingGames.appendChild(matchCard);
				}
			}
		});
}

function handleSoccerClear() {
	if (document.getElementById('completed-container')) {
		document.getElementById('completed-container').remove();
		document.getElementById('upcoming-container').remove();
		completedGames.innerHTML = '';
		upcomingGames.innerHTML = '';
	}
}

document.querySelector('#soccer-track-button').addEventListener('click', handleSoccerTrack);

document.querySelector('#soccer-clear-button').addEventListener('click', handleSoccerClear);
