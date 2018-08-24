import React from 'react';
import {sync} from "../common/constants";
import Ajax from "../common/Ajax";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import { getAllMappings } from '../mapping/actions/MappingActions';


class SyncDashboard extends React.Component {

    constructor() {
        super();
        this.syncData = this.syncData.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getAllMappings());
    }

    async syncData(mappingName) {
        try {
            let ajax = Ajax.instance();
            await ajax.get(sync.URI + mappingName);
            console.log('ajax get done');
        } catch (e) {
            console.log('something went wrong :(');
            window.location.pathname = '/home';
        }
    }

    renderMappingNames() {
        return (
            this.props.mappingNames.sort().map(mappingName => (
                <tr key={mappingName} className="table-row">
                    <td className="mapping-name">
                        {mappingName}
                    </td>
                    <td className="edit-mapping-button">
                        <button type="submit" className="center send-button"
                                onClick={() => {this.syncData(mappingName)}}>
                            Sync to DHIS2
                        </button>
                    </td>
                </tr>
            ))
        );
    }

    render() {
        return (
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
        );
    }
}

SyncDashboard.propTypes = {
    hideSpinner: PropTypes.bool.isRequired,
    mappingNames: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    mappingNames: state.allMappingNames,
    hideSpinner: state.hideSpinner
});

export default connect(mapStateToProps)(SyncDashboard);
