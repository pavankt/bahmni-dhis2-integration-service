import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {syncData} from './actions/SyncActions';
import {getAllMappingsSyncInfo} from '../sync/actions/SyncActions';
import {ensureActiveSession} from "../common/Actions";
import Message from "../common/Message";


class SyncDashboard extends React.Component {

    async componentDidMount() {
        this.props.dispatch(getAllMappingsSyncInfo());
        await this.props.dispatch(ensureActiveSession());
    }

    async onClick(unique_ref_prefix, mappingName) {
        this.props.syncDetails[mappingName].status = 'pending';
        this.setState({syncDetails: this.props.syncDetails});

        await this.props.dispatch(
            syncData(mappingName, this.props.session.user, this.refs[unique_ref_prefix + mappingName].value));

        this.props.syncDetails[mappingName].status = '';
        this.setState({syncDetails: this.props.syncDetails});
    }

    renderMappingNames() {
        let unique_ref_prefix = 'prefix_';
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
                    {this.props.syncDetails[mappingName] && this.props.syncDetails[mappingName].date &&
                    moment(moment.utc(this.props.syncDetails[mappingName].date)).local().format("dddd MMMM DD, YYYY hh:mm:ss A")}
                </td>
                <td className="preview-cell-border">
                  <button
                    type="submit"
                    className="preview-button"
                    disabled={this.props.syncDetails[mappingName] && this.props.syncDetails[mappingName].status === 'pending'}
                    onClick={() => {
                        window.open(`/dhis-integration/preview/${mappingName}`);
                    }}
                  >
                            Preview
                  </button>
                  <button
                    type="submit"
                    className="send-button"
                    disabled={this.props.syncDetails[mappingName] && this.props.syncDetails[mappingName].status === 'pending'}
                    onClick={this.onClick.bind(this, unique_ref_prefix, mappingName)}
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
    syncDetails: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    session: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    mappingNames: state.mappingNames,
    syncDetails: state.syncDetails,
    hideSpinner: state.hideSpinner,
    session : state.session
});

export default connect(mapStateToProps)(SyncDashboard);
