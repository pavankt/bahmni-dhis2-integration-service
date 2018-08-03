import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import DescribeFilteredTable from './components/DescribeFilteredTable.js';
import * as CommonActions from '../common/Actions';

class MappingDashboard extends Component {
    componentWillMount() {
        this.props.dispatch(CommonActions.hideSpinner(false));
    }

    componentDidMount() {
        this.props.dispatch(CommonActions.hideSpinner());
    }

  render() {
    return (
      <div>
        <Spinner hide={this.props.hideSpinner} />
        <DescribeFilteredTable />
      </div>
    );
  }
}

MappingDashboard.propTypes = {
  hideSpinner : PropTypes.bool,
    dispatch : PropTypes.func.isRequired
};

const mapStoreToProps = (store) => ({
  hideSpinner : store.hideSpinner
});

export default connect(mapStoreToProps)(MappingDashboard);
