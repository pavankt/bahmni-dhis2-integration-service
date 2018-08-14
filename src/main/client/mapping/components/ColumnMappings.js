import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tableColumns } from '../actions/MappingActions';
import { hideSpinner } from "../../common/Actions";

class ColumnMappings extends Component {
  constructor() {
    super();
    this.renderColumns = this.renderColumns.bind(this);
    this.getColumns = this.getColumns.bind(this);
    this.insertValues = this.insertValues.bind(this);
  }

  isNotEmpty = (object)=> (
     object !== undefined && Object.keys(object).length !== 0
  );

  componentDidMount() {
    this.getColumns();
  }

  componentDidUpdate(){
     if(this.isNotEmpty(this.props.mappingJson)){
         this.insertValues();
      }
  }

  getColumns() {
    this.props.dispatch(hideSpinner(false));
    fetch(`/dhis-integration/getColumns?tableName=${this.props.table}`)
      .then(res => res.json())
      .then(result => this.props.dispatch(tableColumns(result)));
      this.props.dispatch(hideSpinner());
  }

  renderColumns() {
    return this.props.columns.map(column => (
      <tr key={column} className="mapping-row table-row">
        <td className="mapping-column-name">
          {column}
        </td>
        <td className="mapping-data-element">
          <input type="text" className="mapping-input" ref={column}/>
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="mapping-table-div">
        <span>
Please provide DHIS2 data element mapping for patient instance
        </span>
        <section className="column-mapping-section">
          <table className="mapping-table">
            <tr className="mapping-row-header">
              <th className="mapping-header">
                    Bahmni Data Point
              </th>
              <th className="mapping-header">
                    DHIS2 Data Element ID
              </th>
            </tr>
            {this.renderColumns()}
          </table>
        </section>
      </div>
    );
  }

    insertValues() {
        let instanceJson = this.props.mappingJson.instance;
        Object.keys(instanceJson).forEach((columnName)=>{
            this.refs[columnName].value = instanceJson[columnName];
        });
    }
}

ColumnMappings.propTypes = {
  table: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  table: state.selectedTable,
  columns: state.selectedTableColumns,
  mappingJson: state.mappingJson
});

export default connect(mapStateToProps)(ColumnMappings);
