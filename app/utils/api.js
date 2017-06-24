var axios = require('axios');

module.exports = {
  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return (
      axios
      .get(encodedURI)
      .then( (res)  => res.data.items )
      .catch( handleError )
    );
  }
, battle: function(players) {
    return (
      axios
      .all( players.map(getUserData) )
      .then( sortPlayers )
      .catch( handleError )
    );
  }
};


// Helper functions
function getProfile(username) {
  return (
    axios
    .get('https://api.github.com/users/' + username)
    .then( (user) => user.data ) 
    .catch( handleError )
  );
}

function getRepos(username) {
  return axios.get('https://api.github.com/users/' + username + '/repos');
}
function getStarCount(repos) {
  return repos.data.reduce( (count, repo) => count + repo.stargazers_count, 0);
}
function calculateScore(profile, repos) {
  let followers   = profile.followers;
  let totalStars  = getStarCount(repos);

  return ((followers * 3) + totalStars);
}
function handleError(error) {
  console.warn(error);
  return null;
}
function getUserData(player) {
  return (
    axios
    .all([ getProfile(player), getRepos(player) ])
    .then( (data) => {
      let profile   = data[0];
      let repos     = data[1];

      return {
        profile: profile
      , score: calculateScore(profile, repos)
      };
    })
    .catch( handleError )
  );
}
function sortPlayers(players) {
  return players.sort( (a, b) => b.score - a.score );
}
