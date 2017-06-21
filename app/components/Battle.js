const React         = require('react');
const PlayerInput   = require('./PlayerInput');
const PlayerPreview = require('./PlayerPreview');
const Link = require('react-router-dom').Link;

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName     : ''
    , playerTwoname     : ''
    , playerOneImage    : null
    , playerTwoImage    : null
    };

    this.handleSubmit   = this.handleSubmit.bind(this);
    this.handleReset    = this.handleReset.bind(this);
  }
  handleSubmit(id, username) {
    let newState = {};
    newState[id + 'Name']  = username;
    newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
    
    this.setState(newState);
  }
  handleReset(id) {
    let newState = {};
    newState[id + 'Name']  = '';
    newState[id + 'Image'] = '';
    
    this.setState(newState);
  }
  render() {
    let match           = this.props.match;
    let playerOneName   = this.state.playerOneName;
    let playerTwoName   = this.state.playerTwoName;
    let playerOneImage  = this.state.playerOneImage;
    let playerTwoImage  = this.state.playerTwoImage;

    return (
      <div>
        <div className="row">
          {playerOneImage !== null &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
              onReset={this.handleReset}
              id="playerOne" />
          }
          
          {!playerOneName && 
            <PlayerInput 
              id="playerOne"
              label="Player One"
              onSubmit={ this.handleSubmit } />
          }

          {playerTwoImage !== null &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
              onReset={ this.handleReset }
              id="playerTwo" />
          }
          {!playerTwoName && 
            <PlayerInput
              id="playerTwo"
              label="Player Two"
              onSubmit={ this.handleSubmit } />
          }
        </div>

        {playerOneImage && playerTwoImage && 
          <Link
            className="button"
            to={{
              pathname: match.url + '/results'
            , search: '?playerOneName=' + playerOneName + '&playerTwoName' + playerTwoName
            }}>
            Battle
          </Link>
        }
      </div>
    );
  }
}

module.exports = Battle;