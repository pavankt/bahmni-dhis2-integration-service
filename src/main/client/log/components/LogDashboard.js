import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import LogFilters from './LogFilters';
import LogTable from './LogTable';
import LogNavigation from './LogNavigation';

class LogDashboard extends Component {
    render() {
        return (
            <div className='log-page'>
                <LogFilters/>
                <LogTable/>
                <LogNavigation/>
                <span className="no-events">No more events to be displayed !!</span>
            </div>
        );
    }
}

LogDashboard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    noEvents: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    noEvents: state.noEventsToDisplay
});

export default connect(mapStateToProps)(LogDashboard);
