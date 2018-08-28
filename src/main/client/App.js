import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './common/Spinner';
import { hideSpinner, getPrivileges } from './common/Actions';
import { privileges, auditLogEventDetails } from './common/constants';
import Message from './common/Message';
import auditLog from './common/AuditLog';

class App extends Component {

    constructor() {
        super();
        this.logEvent = this.logEvent.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(hideSpinner(false));
        this.props.dispatch(getPrivileges());
        auditLog(auditLogEventDetails.OPEN_DHIS_SYNC_APP);
        this.props.dispatch(hideSpinner());
    }

    logEvent(param) {
        auditLog(param);
    }

    render() {
        return (
          <div>
            <Message />
            <Spinner hide={this.props.hideSpinner} />
            <div className="app-link">
              {this.props.privileges.includes(privileges.MAPPING) && (
              <Link
                to="/dhis-integration/mapping"
                className="mapping-link"
                onClick={() => this.logEvent(auditLogEventDetails.OPEN_DHIS_MANAGE_MAPPING)}
              >
                <i className="fa fa-map-signs" />
                    Manage Mapping
              </Link>
)}
              {this.props.privileges.includes(privileges.UPLOAD) && (
              <Link
                to="/dhis-integration/sync"
                className="sync-link"
                onClick={() => this.logEvent(auditLogEventDetails.OPEN_SYNC_TO_DHIS)}
              >
                <i className="fa fa-upload" />
                    Sync to DHIS
              </Link>
)}
              {this.props.privileges.includes(privileges.LOG) && (
              <Link
                to="/dhis-integration/logs"
                className="log-link"
                onClick={() => this.logEvent(auditLogEventDetails.OPEN_DHIS_LOG)}
              >
                <i className="fa fa-book" />
                    Logs
              </Link>
)}
            </div>
          </div>
        );
    }
}


App.propTypes = {
    hideSpinner : PropTypes.bool.isRequired,
    dispatch : PropTypes.func.isRequired,
    privileges: PropTypes.array.isRequired
};

const mapStoreToProps = (store) => ({
    hideSpinner : store.hideSpinner,
    privileges : store.privileges
});

export default connect(mapStoreToProps)(App);
