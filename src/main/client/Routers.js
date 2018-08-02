import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from "./common/Header";
import LogDashboard from "./log/LogDashboard";
import MappingDashboard from "./mapping/MappingDashboard";
import SyncDashboard from "./sync/SyncDashboard";
import App from './App';

const browserHistory = createBrowserHistory();

export function routes() {
    return (
      <BrowserRouter history={browserHistory}>
        <switch>
          <Route component={Header} />
          <Route exact path="/" component={App} />
          <Route path="/mapping" component={MappingDashboard} />
          <Route path="/sync" component={SyncDashboard} />
          <Route path="/logs" component={LogDashboard} />
        </switch>
      </BrowserRouter>);
}
