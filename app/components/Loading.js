const React       = require('react');
const PropTypes   = require('prop-types');

const styles = {
  content: {
    textAlign   : 'center'
  , fontSize    : '35px'
  }
};

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text    : props.text
    , speed   : props.speed
    }
  }
  componentDidMount() {
    let resetPoint = this.props.text + '...';

    this.interval = window.setInterval( () => {
      this.state.text === resetPoint
      ? this.setState({ text: this.props.text })
      : this.setState({ text: this.state.text + '.' });  
    }, this.props.speed);
  }
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  render() {
    return (
      <p style={styles.content}>
        {this.state.text}
      </p>
    );
  }
}

Loading.propTypes = {
  text    : PropTypes.string
, speed   : PropTypes.number
};

Loading.defaultProps = {
  text    : 'Loading'
, speed   : 200
};

module.exports = Loading;