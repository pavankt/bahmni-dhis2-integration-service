import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import MappingDashboard from './mapping/mappingDashboard';
import SyncDashboard from './sync/syncDashboard';
import LogDashboard from './log/logDashboard';
import Spinner from '../client/common/Spinner';
import reduxThunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import { Provider } from 'react-redux';
import reducers from "./Reducers";

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
            <Provider store={store}>
                <div className="form-builder-link">
                    <Spinner show={this.state.loading} />
                    <Link to={'/mapping'}>
                        <i className="fa fa-map-signs"></i>
                        Manage Mapping
                    </Link>
                    <Link to={'/sync'}>
                        <i className="fa fa-upload"></i>
                        Sync to DHIS
                    </Link>
                    <Link to={'/logs'}>
                        <i className="fa fa-book"></i>
                        Logs
                    </Link>
                    <Switch>
                        <Route exact path='/mapping' component={MappingDashboard}/>
                        <Route exact path='/sync' component={SyncDashboard}/>
                        <Route exact path='/logs' component={LogDashboard}/>
                    </Switch>
                </div>
            </Provider>
        );
    }
}

render((<BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('app'));
