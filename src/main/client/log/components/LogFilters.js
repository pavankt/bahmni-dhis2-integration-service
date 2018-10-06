import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getLogs, filterValues, getUtcFromLocal } from '../actions/LogActions';

class LogFilters extends Component {
    constructor() {
        super();
        this.onDateChange = this.onDateChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
        this.state = {
            date: moment(),
            time: moment("12:00 AM", "hh:mm A")
        }
    }

    onDateChange(date) {
        this.setState({
            date: date
        });

    }

    onTimeChange(time) {
        this.setState({
            time: time
        });
    }

    onSelect(_event) {
        let date = moment(_event.target.value, "MM/DD/YYYY", true);

        if (!date.isValid()) {
            console.log("not valid");
        }
    }

    onFilterClick() {
        let service = this.refs.service.value;
        let user = this.refs.user.value;
        let formattedTime = this.state.time.format("HH:mm:ss");
        let formattedDate = this.state.date.format("YYYY-MM-DD");
        let dateCreated = formattedDate + " " + formattedTime;
        this.props.dispatch(filterValues(dateCreated, service, user));
        this.props.dispatch(getLogs(getUtcFromLocal(dateCreated), service, user));
    }

    render() {
        return (
            <div className="filters">
                <div className="filter-text">Filters</div>
                <span className="filter-on">Start From</span>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.onDateChange}
                    dropdownMode="select"
                    className="date-picker"
                    onChangeRaw={this.onSelect}
                />
                <DatePicker
                    selected={this.state.time}
                    onChange={this.onTimeChange}
                    dropdownMode="select"
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    dateFormat="LT"
                    timeCaption="Time"
                    className="time-picker"
                />
                <span className="filter-on">Service</span>
                <input className="filter-input" ref="service"/>
                <span className="filter-on">Username</span>
                <input className="filter-input" ref="user"/>
                <button className="filter-button" onClick={this.onFilterClick}>
                    <i className="fa fa-filter"/>
                    Filter
                </button>
            </div>
        )
    }
}

LogFilters.propTypes = {
    dispatch: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(LogFilters);