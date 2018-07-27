import React, {Component} from 'react';

class FilteredTables extends Component {
    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(_event) {
        this.props.onSelect(_event.target.innerText);
    }

    getListItems() {
        let tables = this.props.tables;
        return tables.map((tableName) => (
            <li
                key={tableName}
                onClick={this.onSelect}
                data-selected-table = {tableName}
            >{tableName}</li>)
        );
    }

    render() {
        return (
            <ul type="none">
                {this.getListItems()}
            </ul>
        );
    }
}


export default FilteredTables;
