const React         = require('react');
const queryString   = require('query-string');
const api           = require('../utils/api');
const Link          = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');
const Player        = require('./Player');

class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner   : null
    , loser    : null
    , error    : null
    , loading  : true
    };
  }
  componentDidMount() {
    let players = queryString.parse(this.props.location.search);
    
    api.battle([
      players.playerOneName
    , players.playerTwoName
    ])
    .then( function(players) {
      console.log(players);

      if (players === null) {
        return this.setState(function() {
          return {
            error: 'looks like there was an error. Check that both users exists on Github'
          , loading: false
          }
        });
      }

      this.setState(function() {
        return {
          error     : null
        , winner    : players[0]
        , loser     : players[1]
        , loading   : false
        }
      })
    }.bind(this))
  }
  render() {
    let error     = this.state.error;
    let winner    = this.state.winner;
    let loser     = this.state.loser;
    let loading   = this.state.loading;
    
    if (loading === true) {
      return (<p>Loading</p>);
    }

    if (error) {
      return (
        <div>
          <p>{error}</p> 
          <Link to="/battle">Reset</Link>   
        </div>
      );
    }
    return (
      <div className="row">
        <Player 
          label="Winner"
          score={winner.score}
          profile={winner.profile}/>
        <Player 
          label="Loser"
          score={loser.score}
          profile={loser.profile}/>
      </div>
    );
  }
}

module.exports = Result;