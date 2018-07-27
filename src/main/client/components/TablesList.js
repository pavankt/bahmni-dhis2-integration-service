import React, {Component} from 'react';
import FilteredTables from './FilteredTables';
import ColumnMappings from './ColumnMappings';

class TablesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredTables: [],
            selectedTable: ""
        };
        this.searchTables = this.searchTables.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    searchTables() {
        let searchText = this.refs.tablesSearch.value;
        if (searchText.length == 0) {
            this.setState({
                "filteredTables": []
            });
            return;
        }
        let result = this.props.tables.filter(tableName => tableName.includes(searchText));
        this.setState({
            "filteredTables": result,
            "selectedTable" : ""
        });
    }

    componentDidMount() {
        fetch('/getTables')
            .then(res => res.json())
            .then(result => this.props.tables = result)
    }

    onSelect(selectedTable) {
        this.setState({selectedTable});
        this.refs.tablesSearch.value = selectedTable;
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    ref="tablesSearch"
                    name="tableName"
                    placeholder="Enter table name"
                    onKeyUp={this.searchTables}
                />
                { (this.state.selectedTable == "") && <FilteredTables tables={this.state.filteredTables} onSelect={this.onSelect}/> }
                { (this.state.selectedTable) && <ColumnMappings selectedTable={this.state.selectedTable}/> }
            </div>
        );
    }
}

export default TablesList;
