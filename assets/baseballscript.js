var completedGamesContainer = document.querySelector('.completed-games-container');
var upcomingContentContainer = document.querySelector('.upcoming-games-container');
var completedGames = document.querySelector('.completed-games');
var upcomingGames = document.querySelector('.upcoming-games');

const requestUrl = 'https://odds.p.rapidapi.com/v4/sports/baseball_mlb/scores?daysFrom=1';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5c924b5375msh180d4c389c807a5p1dc70fjsnf2a6c9051cc7',
		'X-RapidAPI-Host': 'odds.p.rapidapi.com'
	}
};

// returns dateToFormat passed as formatted date (DD/MM/YYYY)
function convertCommenceTime(dateToFormat) {
	var date = new Date(dateToFormat);
	var formattedDate = date.toLocaleDateString('en-GB');
	return formattedDate;
}

function handleMLBTrack() {
	handleMLBClear();
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
			for (var i = 0; i < data.length; i++) {
				var event = data[i];
				var gameTime = convertCommenceTime(event.commence_time);
				var matchCard = document.createElement('div');

				if (event.completed) {
					matchCard.innerHTML = `
						<div class="card mb-5">
							<div class="card-content">
								<div class="media">
									<div class="media-content">
										<p class="title is-4">${event.home_team} vs. ${event.away_team}</p>
										<p class="subtitle is-6"><strong>Date of match:</strong> ${gameTime}</p>
									</div>
								</div>
								<div class="content">
									${event.scores[0].name} scored ${event.scores[0].score} and ${event.scores[1].name} scored ${event.scores[1].score}.
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
										<p class="title is-4">${event.home_team} vs. ${event.away_team}</p>
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

function handleMLBClear() {
	if (document.getElementById('completed-container')) {
		document.getElementById('completed-container').remove();
		document.getElementById('upcoming-container').remove();
		completedGames.innerHTML = '';
		upcomingGames.innerHTML = '';
	}
}

document.querySelector('#baseball-track-button').addEventListener('click', handleMLBTrack);

document.querySelector('#baseball-clear-button').addEventListener('click', handleMLBClear);
