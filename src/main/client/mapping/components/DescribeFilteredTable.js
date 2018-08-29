import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    allTables,
    currentMapping,
    filteredInstanceTables,
    mappingJson,
    saveMappings,
    selectedEnrollmentsTable,
    selectedInstanceTable,
    getMapping
} from '../actions/MappingActions';
import Message from '../../common/Message';
import Spinner from "../../common/Spinner";
import {showHome} from "../../common/Actions";
import InstanceMapper from "./InstanceMapper";
import EnrollmentMapper from "./EnrollmentMapper";

class DescribeFilteredTable extends Component {
  constructor() {
    super();
    this._onCancel = this._onCancel.bind(this);
    this._onSave = this._onSave.bind(this);
  }

  componentDidMount() {
      this.props.dispatch(showHome(false));
      let mappingName = this.props.match.params.mappingName;
      if(mappingName) {
          this.props.dispatch(getMapping(mappingName, this.props.history));
      }
      fetch('/dhis-integration/api/getTables')
          .then(res => res.json())
          .then(result => {
              this.props.dispatch(allTables(result));
          });
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.currentMapping !== "") {
          this.refs.mappingName.value = nextProps.currentMapping;
      }
  }

  componentWillUnmount() {
      this.props.dispatch(showHome());
  }

  _onCancel() {
    this.props.dispatch(selectedInstanceTable());
    this.props.dispatch(selectedEnrollmentsTable());
    this.props.dispatch(filteredInstanceTables());
    this.props.dispatch(currentMapping());
    this.props.dispatch(mappingJson());
    this.props.history.push('/dhis-integration/mapping');
  }

  _onSave() {
    let mappingName = this.refs.mappingName.value;
    let mappings = {};
    mappings.instance = document.getElementsByClassName('instance');
    mappings.enrollments = document.getElementsByClassName('enrollments');
    let lookupTable = {
        instance: this.props.selectedInstanceTable,
        enrollments: this.props.selectedEnrollmentsTable
    };
    this.props.dispatch(saveMappings(mappingName, mappings, lookupTable, this.props.history, this.props.currentMapping));
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

        <InstanceMapper />

        <EnrollmentMapper />

        <div className="footer">
          {(this.props.selectedInstanceTable || this.props.selectedEnrollmentsTable) && (
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
  selectedInstanceTable: PropTypes.string.isRequired,
  selectedEnrollmentsTable: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  hideSpinner:PropTypes.bool.isRequired,
  currentMapping: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  selectedInstanceTable: state.selectedInstanceTable,
  selectedEnrollmentsTable: state.selectedEnrollmentsTable,
  tables: state.allTables,
  hideSpinner : state.hideSpinner,
  currentMapping: state.currentMapping,
  mappingJson : state.mappingJson
});


export default connect(mapStateToProps)(DescribeFilteredTable);
