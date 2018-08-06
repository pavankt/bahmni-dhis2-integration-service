import React from 'react';
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from '../common/Spinner';
import {allMappingNames} from './actions/MappingActions';
import * as CommonActions from '../common/Actions';

class MappingDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            redirectToAddMapping: false
        };
        this.renderMappingNames = this.renderMappingNames.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(CommonActions.hideSpinner(false));
    }

    componentDidMount() {
        let props = this.props;
        fetch('/getMappingNames')
            .then(res => res.json())
            .then((result) => {
                props.dispatch(allMappingNames(result));
            });
        props.dispatch(CommonActions.hideSpinner());
    }

    renderMappingNames() {
        return (
            this.props.mappingNames.map(mappingName => (
              <tr key={mappingName} className="table-row">
                <td className="mapping-name">
                  {mappingName}
                </td>
                <td className="edit-mapping-button">
                  <button type="submit" className="center">
                            Edit
                  </button>
                </td>
              </tr>
            ))
        );
    }

    render() {
        if (this.state.redirectToAddMapping) {
            return <Redirect to='/mapping/addEditMappings' />
        }
        return (
          <div>
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
                            Service Name
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
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    mappingNames: state.allMappingNames,
    hideSpinner: state.hideSpinner
});

export default connect(mapStateToProps)(MappingDashboard);
