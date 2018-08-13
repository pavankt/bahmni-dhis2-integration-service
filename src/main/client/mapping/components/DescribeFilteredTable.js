import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DisplayTableNames from './DisplayTableNames';
import ColumnMappings from './ColumnMappings';
import { selectedTable, filteredTables, allTables, saveMappings } from '../actions/MappingActions';
import Message from '../../common/Message';

class DescribeFilteredTable extends Component {
  constructor() {
    super();
    this.searchTables = this.searchTables.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onSave = this._onSave.bind(this);
  }

  componentDidMount() {
      fetch('/getTables')
          .then(res => res.json())
          .then(result => this.props.dispatch(allTables(result)));
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.selectedTable !== this.props.selectedTable) {
          this.refs.tablesSearch.value = nextProps.selectedTable;
      }else{
          this.refs.tablesSearch.value = this.props.selectedTable;
      }

      this.refs.mappingName.value = nextProps.currentMapping;
  }

  searchTables() {
    const searchText = this.refs.tablesSearch.value;
    if (searchText.length === 0) {
        this.props.dispatch(selectedTable());
        this.props.dispatch(filteredTables());
    }

    if (searchText.length > 2) {
      const result = this.props.tables.filter(tableName => tableName.includes(searchText));
      this.props.dispatch(filteredTables(result));
    }
  }

  _onCancel() {
    this.props.dispatch(selectedTable());
    this.props.dispatch(filteredTables());
    this.props.history.push('/mapping');
  }

  _onSave() {
    let mappingName = this.refs.mappingName.value;
    let columnMappings = document.getElementsByClassName('mapping-row');
    this.props.dispatch(saveMappings(mappingName, columnMappings, this.props.selectedTable, this.props.history));
    this.props.dispatch(selectedTable());
  }

  render() {
    return (
      <div className="mapping-div">
        <Message />
        <div>
          Mapping Name
        </div>
        <input
          type="text"
          ref="mappingName"
          className="mapping-name"
          placeholder="Enter Mapping Name"
        />
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
        {(this.props.selectedTable.length === 0) && <DisplayTableNames />}
        {(this.props.selectedTable) && <ColumnMappings />}
        <div className="footer">
          <span className="cancel" onClick={this._onCancel}>
            Cancel
          </span>
          <span className="save" onClick={this._onSave}>
            Save
          </span>
        </div>
      </div>
    );
  }
}

DescribeFilteredTable.propTypes = {
  selectedTable: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  tables: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  currentMapping: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  selectedTable: state.selectedTable,
  tables: state.allTables,
  currentMapping: state.currentMapping
});


export default connect(mapStateToProps)(DescribeFilteredTable);
