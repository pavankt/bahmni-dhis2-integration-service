import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as MappingActions from "../actions/MappingActions";

class FilteredTables extends Component {
    constructor() {
        super();
        this.onSelect = this.onSelect.bind(this);
        this.getListItems = this.getListItems.bind(this);
    }

    onSelect(_event) {
        this.props.dispatch(MappingActions.selectedTable(_event.target.dataset.tableName))
    }

    getListItems() {
        return this.props.filteredTables.map((tableName) => (
            <li
                key={tableName}
                onClick={this.onSelect}
                data-table-name={tableName}
            >{tableName}</li>)
        );
    }

    render() {
        return (
            <div className="tables-list">
                <ul type="none">
                    {this.getListItems()}
                </ul>
            </div>
        );
    }
}

FilteredTables.propTypes = {
    "filteredTables": PropTypes.array.isRequired,
    "dispatch": PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    "filteredTables": state.filteredTables
});

export default connect(mapStateToProps)(FilteredTables);
