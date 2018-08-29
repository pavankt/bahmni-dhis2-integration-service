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
      <Route exact path="/dhis-integration/" component={App} />
      <Route exact path="/dhis-integration/mapping" component={MappingDashboard} />
      <Route exact path="/dhis-integration/sync" component={SyncDashboard} />
      <Route exact path="/dhis-integration/logs" component={LogDashboard} />
      <Route exact path="/dhis-integration/mapping/new" component={DescribeFilteredTable} />
      <Route exact path="/dhis-integration/mapping/edit/:mappingName" component={DescribeFilteredTable} />
    </switch>
  </BrowserRouter>);
}
