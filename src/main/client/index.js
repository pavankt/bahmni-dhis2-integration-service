import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import MappingDashboard from './mapping/mappingDashboard';
import SyncDashboard from './sync/syncDashboard';
import LogDashboard from './log/logDashboard';
import Spinner from './common/Spinner';
import reducers from './Reducers';
import Header from './common/Header';

const store = createStore(reducers, applyMiddleware(reduxThunk));

class App extends React.Component {
  constructor() {
    super();
    this.state = { loading: true };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <div className="app-link">
          <Spinner show={this.state.loading} />
          <Link to="/mapping">
            <i className="fa fa-map-signs" />
              Manage Mapping
          </Link>
          <Link to="/sync">
            <i className="fa fa-upload" />
              Sync to DHIS
          </Link>
          <Link to="/logs">
            <i className="fa fa-book" />
              Logs
          </Link>
        </div>
      </div>
    );
  }
}

render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route component={Header}/>
        <Route exact path="/" component={App} />
        <Route exact path="/mapping" component={MappingDashboard} />
        <Route exact path="/sync" component={SyncDashboard} />
        <Route exact path="/logs" component={LogDashboard} />
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
