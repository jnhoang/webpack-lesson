const React       = require('react');
const PropTypes   = require('prop-types');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    };
  }
  handleChange(e) {
    this.setState({username: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(
      this.props.id
    , this.state.username
    );
  }
  render() {
    return (
      <form 
        className="column"
        onSubmit={ (e) => this.handleSubmit(e) }>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input 
          id="username"
          type="text"
          placeholder="github username"
          autoComplete="off"
          value={this.state.username}
          onChange={ (e) => this.handleChange(e) } />

        <button
          className="button"
          type="submit"
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    );
  }
}

PlayerInput.propTypes ={
  id          : PropTypes.string.isRequired
, label       : PropTypes.string.isRequired
, onSubmit    : PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
  label: 'Username'
}

module.exports = PlayerInput;