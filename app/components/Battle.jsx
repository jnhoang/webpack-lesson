import React, { Component } from 'react';
import { Link }             from 'react-router-dom';

import PlayerInput   from './PlayerInput';
import PlayerPreview from './PlayerPreview';

class Battle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'playerOneName'     : ''
    , 'playerTwoName'     : ''
    , 'playerOneImage'    : null
    , 'playerTwoImage'    : null
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
    console.log(this.state)
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
          {!playerOneImage ? null :
            <PlayerPreview
              avatar   = {playerOneImage}
              username = {playerOneName}>
              <button
                className = "reset"
                onClick   = { this.handleReset.bind(null, 'playerOne') }>
                Reset
              </button>
            </PlayerPreview>
          }
          
          {!playerOneName && 
            <PlayerInput 
              id        = "playerOne"
              label     = "Player One"
              onSubmit  = { this.handleSubmit } />
          }

          {!playerTwoImage ? null :
            <PlayerPreview
              avatar   = {playerTwoImage}
              username = {playerTwoName}>
              <button
                className = "reset"
                onClick   = { this.handleReset.bind(null, 'playerTwo') }>
                Reset
              </button>
            </PlayerPreview>
          }
          {!playerTwoName && 
            <PlayerInput
              id       = "playerTwo"
              label    = "Player Two"
              onSubmit = { this.handleSubmit } />
          }
        </div>

        {playerOneImage && playerTwoImage && 
          <Link
            className = "button"
            to        = {{
              'pathname' : match.url + '/results'
            , 'search'   : '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
            Battle
          </Link>
        }
      </div>
    );
  }
}

export default Battle;
