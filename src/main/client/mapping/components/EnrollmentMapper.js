import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ColumnMappings from "./ColumnMappings";
import DisplayTableNames from "./DisplayTableNames";

class EnrollmentMapper extends Component {

    constructor(){
        super();
        this.searchTables = this.searchTables.bind(this);
        this.state = {
            filteredTables : []
        };
    }
    componentWillReceiveProps(nextProps){
        this.refs.tablesSearch.value = nextProps.selectedTable !== this.props.selectedTable ?
            nextProps.selectedTable
            :this.props.selectedTable;
    }

    searchTables() {
        const searchText = this.refs.tablesSearch.value;

        if (searchText.length > 2) {
            const result = this.props.tables.filter(
                tableName => tableName.includes(searchText)
            );
            this.setState({filteredTables:result});
        }

        if(searchText.length === 0){
            this.setState({filteredTables:[]});
        }
    }

    render(){
        return (
          <div className="mapper">
            <span>
          Please select patient instance table
            </span>
            <input
              type="text"
              ref="tablesSearch"
              name="tableName"
              placeholder="Enter at least 3 characters of the table name to search"
              onKeyUp={this.searchTables}
              className="table-input"
            />

            <DisplayTableNames
              filteredTables={this.state.filteredTables}
              dispatch={this.props.dispatch}
              category="enrollments"
              filteredTablesAction={()=>{this.setState({filteredTables:[]})}}
            />

            {(this.props.selectedTable) && (
            <ColumnMappings
              columns={this.props.columns}
              mappingJson={this.props.mappingJson.enrollments}
              category="enrollments"
            />
                )}
          </div>
        )
    }
}

EnrollmentMapper.propTypes = {
    selectedTable: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    tables: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    mappingJson: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    selectedTable: state.selectedEnrollmentsTable,
    tables: state.allTables,
    columns: state.selectedEnrollmentTableColumns,
    mappingJson: state.mappingJson
});

export default connect(mapStateToProps)(EnrollmentMapper);
