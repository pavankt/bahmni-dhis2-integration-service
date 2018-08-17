import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class ColumnMappings extends Component {
  constructor() {
    super();
    this.renderColumns = this.renderColumns.bind(this);
    this.insertValues = this.insertValues.bind(this);
  }

  componentDidMount() {
      this.insertValues();
  }

  componentDidUpdate() {
      this.insertValues();
  }

  insertValues() {
      let instanceJson = this.props.mappingJson;
      this.props.columns.map(column => {
          let mapping = instanceJson[column];
          this.refs[column].value = mapping !== undefined ? mapping : '';
      });
  }

    renderColumns() {
    return this.props.columns.map(column => (
      <tr key={column} className="mapping-row table-row">
        <td className="mapping-column-name">
          {column}
        </td>
        <td className="mapping-data-element">
          <input type="text" className="mapping-input" ref={column} />
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
  columns: PropTypes.array.isRequired,
  mappingJson: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  columns: state.selectedTableColumns,
  mappingJson: state.mappingJson
});

export default connect(mapStateToProps)(ColumnMappings);
