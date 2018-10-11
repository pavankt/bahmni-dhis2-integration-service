import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Spinner from '../common/Spinner';
import {getAllMappings, exportMapping, importMappings} from './actions/MappingActions';
import Message from '../common/Message';
import fileDownload from 'js-file-download';
import { showMessage } from '../common/Actions';

class MappingDashboard extends Component {
    constructor() {
        super();
        this.renderMappingNames = this.renderMappingNames.bind(this);
        this.redirectToAddEditMapping = this.redirectToAddEditMapping.bind(this);
        this.exportMapping = this.exportMapping.bind(this);
        this.exportAllMappings = this.exportAllMappings.bind(this);
        this.parseFile = this.parseFile.bind(this);
        this.importFile = this.importFile.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getAllMappings());
    }

    redirectToAddEditMapping() {
        this.props.history.push('/dhis-integration/mapping/new');
    }

    async exportMapping(mappingName) {
        let mappingDetails = await exportMapping(mappingName, this.props.dispatch, this.props.user);
        fileDownload(JSON.stringify(mappingDetails), `${mappingName}.json`);
        this.props.dispatch(showMessage(`Successfully exported ${mappingName} Mapping`, "success"));
    }

    async exportAllMappings() {
        const timestamp = moment().format("DDMMMYYYY_kk:mm:ss");
        let detailedMappingList = [];
        await Promise.all(this.props.mappingNames.map(async mappingName => {
            let mapDetails = await exportMapping(mappingName, this.props.dispatch, this.props.user);
            mapDetails && detailedMappingList.push(mapDetails[0]);
        }));
        fileDownload(JSON.stringify(detailedMappingList), `AllMappingExport_${timestamp}.json`);
        this.props.dispatch(showMessage(`Successfully exported all the mappings`, "success"));
    }

    importFile(_event) {
        let file = _event.target.files;
        this.parseFile(file);
    }

    parseFile(file) {
        const reader = new FileReader();

        reader.onload = () => {
            try {
                let parsedInfo = JSON.parse(reader.result);
            } catch (e) {
                this.props.dispatch(showMessage("Got Error while validating file.. Please import valid json file"));
            }
        };

        reader.readAsText(file[0]);
    }

    renderMappingNames() {
        return (
            this.props.mappingNames.sort().map(mappingName => (
              <tr key={mappingName} className="table-row">
                <td className="mapping-name">
                  {mappingName}
                </td>
                <td className="edit-mapping-button">
                  <Link to={`/dhis-integration/mapping/edit/${mappingName}`} className="center edit-button">
                            Edit
                  </Link>
                  <button className="export-button" onClick={() => this.exportMapping(mappingName)}>
                      Export
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
            <Spinner hide={this.props.hideSpinner} />
            <div className="center mapping-names-table">
              <button className="import-button">
                  <label htmlFor="formImportBtn" >Import
                      <input accept=".json"
                             id="formImportBtn"
                             className="import-input"
                             onChange={this.importFile}
                             onClick={(e) => {
                                 // eslint-disable-next-line
                                 e.target.value = null;
                             }}
                             type="file"
                      />
                  </label>
              </button>
              <button
                type="submit"
                className="add-mapping-button"
                onClick={this.redirectToAddEditMapping}
              >
                <i className="fa fa-plus-circle plus-sign" aria-hidden="true" />
                        Add Mapping
              </button>
              <button
                  type="submit"
                  className="export-all-button"
                  onClick={this.exportAllMappings}
              >
                    Export All Mappings
              </button>
              <section className="all-mappings-sections">
                <h2 className="section-title">
                            Mapping Name
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

MappingDashboard.propTypes = {
    hideSpinner: PropTypes.bool.isRequired,
    mappingNames: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    mappingNames: state.allMappingNames,
    hideSpinner: state.hideSpinner,
    user: state.session.user
});

export default connect(mapStateToProps)(MappingDashboard);
