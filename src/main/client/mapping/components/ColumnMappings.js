import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTableColumns } from '../actions/MappingActions';

class ColumnMappings extends Component {
  constructor() {
    super();
    this.renderColumns = this.renderColumns.bind(this);
    this.insertValues = this.insertValues.bind(this);
  }

  isNotEmpty = (object)=> (
     object !== undefined && Object.keys(object).length !== 0
  );

  componentDidMount() {
    this.props.dispatch(getTableColumns(this.props.table));
  }

  componentDidUpdate(){
     if(this.isNotEmpty(this.props.mappingJson)){
         this.insertValues();
      }
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
        let instanceJson = this.props.mappingJson;
        Object.keys(instanceJson).forEach((columnName)=>{
            this.refs[columnName].value = instanceJson[columnName];
        });
    }
}

ColumnMappings.propTypes = {
  table: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  mappingJson: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  table: state.selectedTable,
  columns: state.selectedTableColumns,
  mappingJson: state.mappingJson
});

export default connect(mapStateToProps)(ColumnMappings);
