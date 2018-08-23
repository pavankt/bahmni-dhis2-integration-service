import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {getAllMappings, getMapping} from './actions/MappingActions';
import Message from '../common/Message';

class MappingDashboard extends Component {
    constructor() {
        super();
        this.renderMappingNames = this.renderMappingNames.bind(this);
        this.editMapping = this.editMapping.bind(this);
        this.redirectToAddEditMapping = this.redirectToAddEditMapping.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getAllMappings());
    }

    editMapping(mappingName) {
        this.props.dispatch(getMapping(mappingName, this.props.history));
    }

    redirectToAddEditMapping() {
        this.props.history.push('/dhis-integration/mapping/save');
    }

    renderMappingNames() {
        return (
            this.props.mappingNames.sort().map(mappingName => (
              <tr key={mappingName} className="table-row">
                <td className="mapping-name">
                  {mappingName}
                </td>
                <td className="edit-mapping-button">
                  <button type="submit" className="center edit-button" onClick={()=>{this.editMapping(mappingName)}}>
                            Edit
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
              <button
                type="submit"
                className="add-mapping-button"
                onClick={this.redirectToAddEditMapping}
              >
                <i className="fa fa-plus-circle plus-sign" aria-hidden="true" />
                        Add Mapping
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
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    mappingNames: state.allMappingNames,
    hideSpinner: state.hideSpinner
});

export default connect(mapStateToProps)(MappingDashboard);
