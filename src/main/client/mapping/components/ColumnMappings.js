import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tableColumns } from "../actions/MappingActions";

class ColumnMappings extends Component{
    constructor(){
        super();
        this.renderColumns = this.renderColumns.bind(this);
        this.getColumns = this.getColumns.bind(this);
    }

    componentDidMount(){
      this.getColumns();
    }

    componentDidUpdate() {
        this.getColumns();
    }

    getColumns() {
        fetch(`/getColumns?tableName=${this.props.table}`)
            .then(res => res.json())
            .then(result => this.props.dispatch(tableColumns(result)));
    }

    renderColumns() {
        return this.props.columns.map(column => <tr><td key={column}>{column}</td><td><input type="text" className="DHIS2Element"/></td></tr>)
    }

    render(){
        return (
            <table className="column-mapping">
                <tr>
                    <th>Bahmni Data columns</th><th>DHIS2 Data Element ID</th>
                </tr>
                {this.renderColumns()}
            </table>
        )
    }
}

ColumnMappings.propTypes = {
    "table": PropTypes.string.isRequired,
    "columns": PropTypes.array.isRequired,
    "dispatch": PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
   "table": state.selectedTable,
   "columns": state.selectedTableColumns
});

export default connect(mapStateToProps)(ColumnMappings);