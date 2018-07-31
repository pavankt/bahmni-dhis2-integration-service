import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import MappingDashboard from './mapping/mappingDashboard';
import SyncDashboard from './sync/syncDashboard';
import LogDashboard from './log/logDashboard';

class App extends React.Component {
    render() {
        return (
            <div className="form-builder-link">
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
        );
    }
}

render((<BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('app'));
