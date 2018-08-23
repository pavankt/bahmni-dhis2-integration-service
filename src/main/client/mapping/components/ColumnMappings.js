import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ColumnMappings extends Component {
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
      let mappingJson = this.props.mappingJson;

      if(!this.isEmptyObject(mappingJson)){
          this.props.columns.forEach(column => {
              let mapping = mappingJson[column];
              this.refs[column].value = mapping !== undefined ? mapping : '';
          });
      }
  }

    isEmptyObject(object) {
        return object === undefined || Object.keys(object).length === 0;
    }

    renderColumns() {
    return this.props.columns.map(column => (
      <tr key={column} className={`mapping-row table-row ${this.props.category}`}>
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
  mappingJson: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired
};