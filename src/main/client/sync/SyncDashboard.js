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
        let unique_ref_prefix = 'comment_';
        return (
            this.props.mappingNames.sort().map(mappingName => (
              <tr key={mappingName} className="table-row">
                <td className="mapping-name">
                  {mappingName}
                </td>
                <td className="center sync-comment-border">
                    <textarea className="sync-comment" ref={unique_ref_prefix + mappingName}
                              placeholder='Please provide comments' />
                </td>
                <td className="mapping-name">
                      Some date
                </td>
                <td className="edit-mapping-button">
                  <button
                    type="submit"
                    className="center send-button"
                    onClick={() => this.props.dispatch(
                        syncData(mappingName, this.props.session.user, this.refs[unique_ref_prefix + mappingName].value))}
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
                <table className="mapping-table">
                  <tbody>
                  <tr className="section-title">
                      <td className="title-name">Name</td>
                      <td className="title-comments">Comments</td>
                      <td className="title-name">Last Successful Sync</td>
                      <td></td>
                  </tr>
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
