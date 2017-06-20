var axios = require('axios');

module.exports = {
  fetchPopularRepos: function(language) {
    console.log(language)
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');


    return (
      axios
      .get(encodedURI)
      .then( (res)  => res.data.items )
      .catch( (err) => err)
    );
  }
}

