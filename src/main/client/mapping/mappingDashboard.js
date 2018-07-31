import React from 'react';
import Spinner from '../common/Spinner';
import TablesList from '../components/TablesList.js';

export default class MappingDashboard extends React.Component {
    constructor() {
        super();
        this.state = {loading: true};
        this.setState = this.setState.bind(this);
    }

    componentDidMount() {
        this.setState({loading: false});
    }

    render() {
        return (
            <div>
                <Spinner show={this.state.loading}/>
                <TablesList/>
            </div>
        );
    }
}
