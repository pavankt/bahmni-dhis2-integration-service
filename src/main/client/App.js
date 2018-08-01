import React from "react";
import { Link } from 'react-router-dom';
import Spinner from './common/Spinner';

export default class App extends React.Component {
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
        <div className="app-link">
          <Spinner show={loading} />
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