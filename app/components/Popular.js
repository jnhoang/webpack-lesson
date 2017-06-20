const React           = require('react');
const SelectLanguage  = require('./SelectLanguage');
const ReposGrid       = require('./ReposGrid');
const api             = require('../utils/api');

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All'
    , repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang
    , repos: null
    });

    api
    .fetchPopularRepos(lang)
    .then( (repos) => this.setState({ repos }) )
    .catch( (err)  => console.log('error!: ', err) );
  }
  render() {
    return(
      <div>
        <SelectLanguage 
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        
        {!this.state.repos
          ? <p>LOADING</p>
          : <ReposGrid repos={this.state.repos} />
        }
      </div>
    );
  }
}

module.exports = Popular;