import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {syncData} from './actions/SyncActions';
import {getAllMappings} from '../mapping/actions/MappingActions';
import Message from "../common/Message";


class SyncDashboard extends React.Component {

    componentDidMount() {
        this.props.dispatch(getAllMappings());
    }

    renderMappingNames() {
        return (
            this.props.mappingNames.sort().map(mappingName => (
              <tr key={mappingName} className="table-row">
                <td className="mapping-name">
                  {mappingName}
                </td>
                <td className="edit-mapping-button">
                  <button
                    type="submit"
                    className="center send-button"
                    onClick={() => this.props.dispatch(syncData(mappingName, this.props.session.user))}
                  >
                            Sync to DHIS2
                  </button>
                </td>
              </tr>
            ))
        );
    }

    render() {
        return (
          <div>
            <Message />
            <div className="center service-names-table">
              <Spinner hide={this.props.hideSpinner} />
              <section className="all-mappings-sections">
                <h2 className="section-title">
                            Name
                </h2>
                <table className="mapping-table">
                  <tbody>
                    {this.renderMappingNames()}
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        );
    }
}

SyncDashboard.propTypes = {
    hideSpinner: PropTypes.bool.isRequired,
    mappingNames: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    session: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    mappingNames: state.allMappingNames,
    hideSpinner: state.hideSpinner,
    session : state.session
});

export default connect(mapStateToProps)(SyncDashboard);
