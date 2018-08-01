import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import FilteredTables from './FilteredTables';
import ColumnMappings from './ColumnMappings';
import * as MappingActions from '../actions/MappingActions';

class TablesList extends Component {
    constructor() {
        super();
        this.searchTables = this.searchTables.bind(this);
    }

    searchTables() {
        let searchText = this.refs.tablesSearch.value;
        if (searchText.length === 0) {
            this.props.dispatch(MappingActions.selectedTable());
            this.props.dispatch(MappingActions.filteredTables());
        }

        if (searchText.length > 2) {
            let result = this.props.tables.filter(tableName => tableName.includes(searchText));
            this.props.dispatch(MappingActions.filteredTables(result));
        }
    }

    componentDidMount() {
        fetch('/getTables')
            .then(res => res.json())
            .then(result => this.props.dispatch(MappingActions.allTables(result)))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedTable !== this.props.selectedTable) {
            this.refs.tablesSearch.value = nextProps.selectedTable;
        }
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    ref="tablesSearch"
                    name="tableName"
                    placeholder="Please select patient instance table"
                    onKeyUp={this.searchTables}
                    className="table-input"/>
                {(this.props.selectedTable.length === 0) && <FilteredTables/>}
                {(this.props.selectedTable) && <ColumnMappings/>}
            </div>
        );
    }
}

TablesList.propTypes = {
    "selectedTable": PropTypes.string.isRequired,
    "dispatch": PropTypes.func.isRequired,
    "tables": PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    "selectedTable": state.selectedTable,
    "tables": state.allTables
});


export default connect(mapStateToProps)(TablesList)
