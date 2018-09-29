import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {syncData} from './actions/SyncActions';
import {getAllMappings} from '../mapping/actions/MappingActions';
import {ensureActiveSession} from "../common/Actions";
import Message from "../common/Message";


class SyncDashboard extends React.Component {

    async componentDidMount() {
        this.props.dispatch(getAllMappings());
        await this.props.dispatch(ensureActiveSession());
    }

    renderMappingNames() {
        let unique_ref = 'comment_';
        return (
            this.props.mappingNames.sort().map(mappingName => (
              <tr key={mappingName} className="table-row">
                <td className="mapping-name">
                  {mappingName}
                </td>
                <td >
                    <textarea className="sync-comment" ref={unique_ref + mappingName}
                              placeholder='Please provide comments (Mandatory)' />
                </td>
                <td className="edit-mapping-button">
                  <button
                    type="submit"
                    className="center send-button"
                    onClick={() => this.props.dispatch(
                        syncData(mappingName, this.props.session.user, this.refs[unique_ref + mappingName].value))}
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
