var mainContentContainer = document.querySelector(".main-content");
console.log(mainContentContainer);
// var url = 'https://baseballapi.p.rapidapi.com/api/baseball/matches/live';
// var options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '5c924b5375msh180d4c389c807a5p1dc70fjsnf2a6c9051cc7',
// 		'X-RapidAPI-Host': 'baseballapi.p.rapidapi.com'
// 	}
// };

const url =
  "https://odds.p.rapidapi.com/v4/sports/baseball_mlb/scores?daysFrom=3";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "5c924b5375msh180d4c389c807a5p1dc70fjsnf2a6c9051cc7",
    "X-RapidAPI-Host": "odds.p.rapidapi.com",
  },
};

async function getMLBTeams() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // const mlbTeams = result.filter(team=>team.title==="MLB")
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

function mlb() {
  console.log("working");
  mainContentContainer.innerHTML = "";
  fetch(url, options)
    .then(function (reponse) {
      return reponse.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var event = data[i];
        console.log(event);
        var gameTime = dayjs(event.commence_time).format("YYY, MMM D");
        var matchCard = document.createElement("div");
        matchCard.setAttribute("class", "card");
        var matchBody = document.createElement("div");
        matchCard.innerHTML = `
          <h2>date ${event.commence_time}</h2>
          <div><p class ="title">homeTeam ${event.home_team}</p></div>
          <div><p class ="title">awayTeam ${event.away_team}</p></div>
          `;
        matchCard.appendChild(matchBody);
        mainContentContainer.appendChild(matchCard);
      }
    });
}

// function getTeams() {
//   console.log("working");
//   mainContentContainer.innerHTML="";
//   var requestUrl = 'https://baseballapi.p.rapidapi.com/api/baseball/matches/live';
//   fetch(requestUrl, options)
//     .then(function (reponse) {
//       return reponse.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       for (var i = 0; i < data.events.length; i++) {
//         var event = data.events[i];
//         var unixFormat = dayjs
//           .unix(event.startTimestamp)
//           .format("MMM D, YYYY, hh:mm:ss a");
//         console.log("The TimeStamp is", event.startTimestamp);
//         console.log("The home team is", event.homeTeam.name);
//         console.log("The away team is", event.awayTeam.name);
//         var matchCard = document.createElement("div");
//         matchCard.setAttribute("class", "card");
//         var matchBody = document.createElement("div");
//         matchCard.innerHTML = `
// 		<h2 class="title">date ${unixFormat}</h2>
// 		<div style ="background-color: ${event.homeTeam.teamColors.primary}"><p class ="title">homeTeam ${event.homeTeam.name}</p></div>
// 		<div style ="background-color: ${event.awayTeam.teamColors.primary}"><p class ="title">awayTeam ${event.awayTeam.name}</p></div>
// 		`;
//         matchCard.appendChild(matchBody);
//         mainContentContainer.appendChild(matchCard);
//       }
//     });
// }
document.querySelector("#baseball-track-button").addEventListener("click", mlb);
