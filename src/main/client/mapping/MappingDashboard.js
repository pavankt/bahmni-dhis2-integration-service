import React from 'react';
import Spinner from '../common/Spinner';
import DescribeFilteredTable from './components/DescribeFilteredTable.js';

export default class MappingDashboard extends React.Component {
  constructor() {
    super();
    this.state = { loading: true };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
      let { loading } = this.state;
    return (
      <div>
        <Spinner show={loading} />
        <DescribeFilteredTable />
      </div>
    );
  }
}
