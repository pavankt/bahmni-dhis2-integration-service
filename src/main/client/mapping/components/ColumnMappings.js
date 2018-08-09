import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tableColumns } from '../actions/MappingActions';

class ColumnMappings extends Component {
  constructor() {
    super();
    this.renderColumns = this.renderColumns.bind(this);
    this.getColumns = this.getColumns.bind(this);
  }

  componentDidMount() {
    this.getColumns();
  }

  getColumns() {
    fetch(`/getColumns?tableName=${this.props.table}`)
      .then(res => res.json())
      .then(result => this.props.dispatch(tableColumns(result)));
  }

  renderColumns() {
    return this.props.columns.map(column => (
      <tr key={column} className="mapping-row table-row">
        <td className="mapping-column-name">
          {column}
        </td>
        <td className="mapping-data-element">
          <input type="text" className="mapping-input" />
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
}

ColumnMappings.propTypes = {
  table: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  table: state.selectedTable,
  columns: state.selectedTableColumns
});

export default connect(mapStateToProps)(ColumnMappings);
