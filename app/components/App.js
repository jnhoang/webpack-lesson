var React         = require('react');
var ReactRouter   = require('react-router-dom');
var Router        = ReactRouter.BrowserRouter;
var Route         = ReactRouter.Route;
var Switch        = ReactRouter.Switch;

var Popular   = require('./Popular');
var Nav       = require('./Nav');
var Home      = require('./Home');
var Battle    = require('./Battle');
var Result    = require('./Result');

class App extends React.Component{
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/popular" component={Popular} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/results" component={Result} />
            <Route render={ () => <p>Not Found</p> } />
          </Switch>
        </div>
        
      </Router>
    );
  }
}

module.exports = App;