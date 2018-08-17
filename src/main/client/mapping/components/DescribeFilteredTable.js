import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DisplayTableNames from './DisplayTableNames';
import ColumnMappings from './ColumnMappings';
import {
    allTables,
    currentMapping,
    filteredTables,
    mappingJson,
    saveMappings,
    selectedTable
} from '../actions/MappingActions';
import Message from '../../common/Message';
import Spinner from "../../common/Spinner";
import {showHome} from "../../common/Actions";

class DescribeFilteredTable extends Component {
  constructor() {
    super();
    this.searchTables = this.searchTables.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onSave = this._onSave.bind(this);
  }

  componentDidMount() {
      this.props.dispatch(showHome(false));
      fetch('/dhis-integration/getTables')
          .then(res => res.json())
          .then(result => this.props.dispatch(allTables(result)));
  }

  componentWillReceiveProps(nextProps) {
      this.refs.tablesSearch.value = nextProps.selectedTable !== this.props.selectedTable ?
           nextProps.selectedTable
          :this.props.selectedTable;
      if(nextProps.currentMapping !== "") {
          this.refs.mappingName.value = nextProps.currentMapping;
      }
  }

  componentWillUnmount() {
      this.props.dispatch(showHome());
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
    this.props.dispatch(currentMapping());
    this.props.dispatch(mappingJson());
    this.props.history.push('/dhis-integration/mapping');
  }

  _onSave() {
    let mappingName = this.refs.mappingName.value;
    let columnMappings = document.getElementsByClassName('mapping-row');
    this.props.dispatch(saveMappings(mappingName, columnMappings, this.props.selectedTable, this.props.history, this.props.currentMapping));
  }

  render() {
    return (
      <div className="mapping-div">
        <Message />
        <Spinner hide={this.props.hideSpinner} />
        <div>
          Mapping Name
        </div>
        <input
          type="text"
          ref="mappingName"
          className="mapping-name mapping-name-input"
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
        {(this.props.selectedTable) && <ColumnMappings /> }
        <div className="footer">
          {(this.props.selectedTable) && (
          <button type="button" className="save" onClick={this._onSave}>
              Save
          </button>
)}
          <button type="button" className="cancel" onClick={this._onCancel}>
              Cancel
          </button>
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
  hideSpinner:PropTypes.bool.isRequired,
  currentMapping: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  selectedTable: state.selectedTable,
  tables: state.allTables,
  hideSpinner : state.hideSpinner,
  currentMapping: state.currentMapping,
  mappingJson : state.mappingJson
});


export default connect(mapStateToProps)(DescribeFilteredTable);
