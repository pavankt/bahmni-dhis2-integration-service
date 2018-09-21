import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import ColumnMappings from "./ColumnMappings";
import DisplayTableNames from "./DisplayTableNames";
import {filterTables} from "../../utils/MappingUtil";

class InstanceMapper extends Component {

    constructor() {
        super();
        this.updateFilteredTables = this.updateFilteredTables.bind(this);
        this.state = {
            filteredTables: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.refs.tablesSearch.value = nextProps.selectedTable !== this.props.selectedTable ?
            nextProps.selectedTable
            : this.props.selectedTable;
    }

    updateFilteredTables() {
        this.setState({
            filteredTables: filterTables(
                this.refs.tablesSearch.value,
                this.props.tables
            )
        });
    }

    render() {
        return (
          <div className="mapper">
            <span className="instance-table-span">
          Please select patient instance table
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
              category="instance"
              filteredTablesAction={() => {
                        this.setState({filteredTables: []})
                    }}
            />

            {(this.props.selectedTable) && (
            <ColumnMappings
              columns={this.props.columns}
              mappingJson={this.props.mappingJson.instance}
              category="instance"
              mappingType="patient instance"
            />
                )}
          </div>
        )
    }
}

InstanceMapper.propTypes = {
    selectedTable: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    tables: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    mappingJson: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    selectedTable: state.selectedInstanceTable,
    tables: state.allTables,
    columns: state.selectedInstanceTableColumns,
    mappingJson: state.mappingJson
});

export default connect(mapStateToProps)(InstanceMapper);
