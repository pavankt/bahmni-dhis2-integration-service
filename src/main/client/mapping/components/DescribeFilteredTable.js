import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    currentMapping,
    getMapping,
    getTables,
    mappingJson,
    saveMappings,
    selectedEnrollmentsTable,
    selectedEventTable,
    selectedInstanceTable
} from '../actions/MappingActions';
import Message from '../../common/Message';
import Spinner from "../../common/Spinner";
import {showHome} from "../../common/Actions";
import InstanceMapper from "./InstanceMapper";
import EnrollmentMapper from "./EnrollmentMapper";
import EventMapper from "./EventMapper";

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
      this.props.dispatch(getTables());
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
    this.props.dispatch(selectedEventTable());
    this.props.dispatch(currentMapping());
    this.props.dispatch(mappingJson());
    this.props.history.push('/dhis-integration/mapping');
  }

  _onSave() {
    let mappingName = this.refs.mappingName.value;
    let mappings = {};
    mappings.instance = document.getElementsByClassName('instance');
    mappings.event = document.getElementsByClassName('events');
    let lookupTable = {
        instance: this.props.selectedInstanceTable,
        enrollments: this.props.selectedEnrollmentsTable,
        event: this.props.selectedEventTable
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
        <EventMapper />

        <div className="footer">
          {(this.props.selectedInstanceTable || this.props.selectedEnrollmentsTable || this.props.selectedEventTable) && (
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
  selectedEventTable: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  hideSpinner:PropTypes.bool.isRequired,
  currentMapping: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  selectedInstanceTable: state.selectedInstanceTable,
  selectedEnrollmentsTable: state.selectedEnrollmentsTable,
  selectedEventTable: state.selectedEventTable,
  hideSpinner : state.hideSpinner,
  currentMapping: state.currentMapping
});


export default connect(mapStateToProps)(DescribeFilteredTable);
