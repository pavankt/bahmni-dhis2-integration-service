import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {allMappingNames, getMapping, mappingJson} from './actions/MappingActions';
import {hideSpinner} from '../common/Actions';
import Message from '../common/Message';

class MappingDashboard extends Component {
    constructor() {
        super();
        this.state = {
            redirectToAddMapping: false
        };
        this.renderMappingNames = this.renderMappingNames.bind(this);
        this.editMapping = this.editMapping.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(hideSpinner(false));
    }

    componentDidMount() {
        let props = this.props;
        fetch('/dhis-integration/getMappingNames')
            .then(res => res.json())
            .then((result) => {
                props.dispatch(allMappingNames(result));
            });
        props.dispatch(hideSpinner());
    }

    editMapping(mappingName) {
        this.props.dispatch(getMapping(mappingName, this.props.history));
    }

    renderMappingNames() {
        return (
            this.props.mappingNames.sort().map(mappingName => (
              <tr key={mappingName} className="table-row">
                <td className="mapping-name">
                  {mappingName}
                </td>
                <td className="edit-mapping-button">
                  <button type="submit" className="center" onClick={()=>{this.editMapping(mappingName)}}>
                            Edit
                  </button>
                </td>
              </tr>
            ))
        );
    }

    render() {
        if (this.state.redirectToAddMapping) {
            this.props.history.push('/dhis-integration/mapping/addEditMappings');
        }
        return (
          <div>
            <Message />
            <Spinner hide={this.props.hideSpinner} />
            <div className="center mapping-names-table">
              <button
                type="submit"
                className="add-mapping-button"
                onClick={() => {
                            this.setState({redirectToAddMapping: true})
                        }}
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
