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

    componentDidMount() {
        this.props.dispatch(hideSpinner(false));
        this.props.dispatch(getPrivileges());
        auditLog(auditLogEventDetails.OPEN_DHIS_SYNC);
        this.props.dispatch(hideSpinner());
    }

    render() {
        return (
          <div>
            <Message />
            <Spinner hide={this.props.hideSpinner} />
            <div className="app-link">
              {this.props.privileges.includes(privileges.MAPPING) && (
              <Link to="/dhis-integration/mapping" className="mapping-link">
                <i className="fa fa-map-signs" />
                        Manage Mapping
              </Link>
)}
              {this.props.privileges.includes(privileges.UPLOAD) && (
              <Link to="/dhis-integration/sync" className="sync-link">
                <i className="fa fa-upload" />
                    Sync to DHIS
              </Link>
)}
              {this.props.privileges.includes(privileges.LOG) && (
              <Link to="/dhis-integration/logs" className="log-link">
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
