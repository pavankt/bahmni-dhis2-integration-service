import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './common/Spinner';
import * as Actions from './common/Actions';

class App extends Component {
    componentWillMount() {
        this.props.dispatch(Actions.hideSpinner(false));
    }

    componentDidMount() {
        this.props.dispatch(Actions.hideSpinner());
    }

    render() {
        return (
          <div>
            <Spinner hide={this.props.hideSpinner} />
            <div className="app-link">
              <Link to="/dhis-integration/mapping" className="mapping-link">
                <i className="fa fa-map-signs" />
                        Manage Mapping
              </Link>
              <Link to="/dhis-integration/sync" className="sync-link">
                <i className="fa fa-upload" />
                        Sync to DHIS
              </Link>
              <Link to="/dhis-integration/logs" className="log-link">
                <i className="fa fa-book" />
                        Logs
              </Link>
            </div>
          </div>
        );
    }
}


App.propTypes = {
    hideSpinner : PropTypes.bool.isRequired,
    dispatch : PropTypes.func.isRequired
};

const mapStoreToProps = (store) => ({
    hideSpinner : store.hideSpinner
});

export default connect(mapStoreToProps)(App);
