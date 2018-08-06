import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from "./common/Header";
import LogDashboard from "./log/LogDashboard";
import MappingDashboard from "./mapping/MappingDashboard";
import SyncDashboard from "./sync/SyncDashboard";
import App from './App';
import DescribeFilteredTable from "./mapping/components/DescribeFilteredTable";

const browserHistory = createBrowserHistory();

export function routes() {
return (
  <BrowserRouter history={browserHistory}>
    <switch>
      <Route component={Header} />
      <Route exact path="/" component={App} />
      <Route exact path="/mapping" component={MappingDashboard} />
      <Route exact path="/sync" component={SyncDashboard} />
      <Route exact path="/logs" component={LogDashboard} />
      <Route exact path="/mapping/addEditMappings" component={DescribeFilteredTable} />
    </switch>
  </BrowserRouter>);
}
