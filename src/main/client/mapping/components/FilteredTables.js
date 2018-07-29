import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectedTable } from "../actions/MappingActions";

class FilteredTables extends Component {
    constructor() {
        super();
        this.onSelect = this.onSelect.bind(this);
        this.getListItems = this.getListItems.bind(this);
    }

    onSelect(_event) {
        this.props.dispatch(selectedTable(_event.target.innerText))
    }

    getListItems() {
        return this.props.filteredTables.map((tableName) => (
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

FilteredTables.propTypes = {
    "filteredTables" : PropTypes.array.isRequired,
    "dispatch": PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
   "filteredTables" : state.filteredTables
});

export default connect(mapStateToProps)(FilteredTables);
