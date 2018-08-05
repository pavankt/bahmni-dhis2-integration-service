import React from 'react';
import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Spinner from '../common/Spinner';
import {allMappingNames} from './actions/MappingActions';

class MappingDashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            redirectToAddMapping: false
        };
        this.renderMappingNames = this.renderMappingNames.bind(this);
    }

    componentDidMount() {
        fetch('/getMappingNames')
            .then(res => res.json())
            .then((result) => {
                this.props.dispatch(allMappingNames(result));
            });
        this.setState({loading: false});
    }

    renderMappingNames() {
        return (
            this.props.mappingNames.map(mappingName => (
                <tr key={mappingName}>
                    <td>
                        {mappingName}
                    </td>
                    <td>
                        <button className="center">
                            Edit
                        </button>
                    </td>
                </tr>
            ))
        );
    }

    render() {
        if (this.state.redirectToAddMapping) {
            return <Redirect to='/mapping/addEditMappings'/>
        }
        return (
            <div>
                <Spinner show={this.state.loading}/>
                <div className="center mapping-names-table">
                    <button
                        className="add-mapping-button"
                        onClick={() => {
                            this.setState({redirectToAddMapping: true})
                        }}
                    >
                        Add Mapping
                    </button>
                    <section className="all-mappings-sections">
                        <h2 className="section-title">
                            Current mappings
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
    mappingNames: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    mappingNames: state.allMappingNames
});

export default connect(mapStateToProps)(MappingDashboard);