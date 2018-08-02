import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Spinner from './common/Spinner';

export default class App extends Component {
constructor() {
    super();
    this.state = {loading: true};
    this.setState = this.setState.bind(this);
}

componentDidMount() {
    this.setState({loading: false});
}

render() {
    let { loading } = this.state;
    return (
      <div>
        <Spinner show={loading} />
        <div className="app-link">
          <Link to="/mapping" className="mapping-link">
            <i className="fa fa-map-signs" />
              Manage Mapping
          </Link>
          <Link to="/sync" className="sync-link">
            <i className="fa fa-upload" />
              Sync to DHIS
          </Link>
          <Link to="/logs" className="log-link">
            <i className="fa fa-book" />
              Logs
          </Link>
        </div>
      </div>
    );
}
}