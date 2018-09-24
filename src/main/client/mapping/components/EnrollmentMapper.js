import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import DisplayTableNames from "./DisplayTableNames";
import {filterTables} from "../../utils/MappingUtil";
import {selectedEnrollmentsTable} from "../actions/MappingActions";

class EnrollmentMapper extends Component {

    constructor() {
        super();
        this.updateFilteredTables = this.updateFilteredTables.bind(this);
        this.state = {
            filteredTables: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTable) {
            this.refs.tablesSearch.value = this.props.selectedTable !== nextProps.selectedTable ?
                nextProps.selectedTable :
                this.props.selectedTable;
        }
    }

    updateFilteredTables() {
        this.setState({
            filteredTables: filterTables(
                this.refs.tablesSearch.value,
                this.props.tables
            )
        });

        this.props.dispatch(selectedEnrollmentsTable());
    }

    render() {
        return (
          <div className="mapper">
            <span>
          Please select program enrollment table
            </span>
            <input
              type="text"
              ref="tablesSearch"
              name="tableName"
              placeholder="Enter at least 3 characters of the table name to search"
              onKeyUp={this.updateFilteredTables}
              className="table-input"
            />

            <DisplayTableNames
              filteredTables={this.state.filteredTables}
              dispatch={this.props.dispatch}
              category="enrollments"
              filteredTablesAction={() => {
                        this.setState({filteredTables: []})
                    }}
            />
          </div>
        )
    }
}

EnrollmentMapper.propTypes = {
    selectedTable: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    tables: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    selectedTable: state.selectedEnrollmentsTable,
    tables: state.allTables
});

export default connect(mapStateToProps)(EnrollmentMapper);
