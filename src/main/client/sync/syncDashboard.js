import React from 'react';
import Spinner from '../common/Spinner';

export default class SyncDashboard extends React.Component {
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
                <p>Sync Dashboard</p>
            </div>

        );
    }
}

