import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { getLogsOnFilter, filterValues, getUtcFromLocal } from '../actions/LogActions';
import {showMessage} from "../../common/Actions";
import Message from "../../common/Message";

class LogFilters extends Component {
    constructor() {
        super();
        this.onDateChange = this.onDateChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onDateEnter = this.onDateEnter.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
        this.onTimeEnter = this.onTimeEnter.bind(this);
        this.isValidMoment = this.isValidMoment.bind(this);
        this.state = {
            date: moment(),
            time: moment("12:00 AM", "hh:mm A"),
            disableButton: false
        }
    }

    onDateChange(date) {
        this.setState({
            date: date
        });
        this.props.dispatch(showMessage());
        this.setState({
            disableButton: false
        });
    }

    onTimeChange(time) {
        this.setState({
            time: time
        });
        this.props.dispatch(showMessage());
        this.setState({
            disableButton: false
        });
    }

    onDateEnter(_event) {
        let date = moment(_event.target.value, "MM/DD/YYYY", true);
        this.isValidMoment(date, "date", "MM/DD/YYYY");
    }

    onTimeEnter(_event) {
        let time = moment(_event.target.value, "h:mm A", true);
        this.isValidMoment(time, "time", "h:mm A");
    }

    isValidMoment(momentObj, invalidField, format) {
        let errorMessage = "Please Enter Valid " + invalidField + " and format should be " + format;
        if (!momentObj.isValid()) {
            this.props.dispatch(showMessage(errorMessage, "error"));
            this.setState({
                disableButton: true
            });
        } else {
            if(invalidField === "time") {
                this.onTimeChange(momentObj);
            }
        }
    }

    onFilterClick() {
        let service = this.refs.service.value;
        let user = this.refs.user.value;
        let formattedTime = this.state.time.format("HH:mm:ss");
        let formattedDate = this.state.date.format("YYYY-MM-DD");
        let dateCreated = formattedDate + " " + formattedTime;
        this.props.dispatch(filterValues(dateCreated, service, user));
        this.props.dispatch(getLogsOnFilter(getUtcFromLocal(dateCreated), service, user));
    }

    render() {
        return (
            <div className="filters">
                <Message/>
                <div className="filter-text">Filters</div>
                <span className="filter-on">Start From</span>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.onDateChange}
                    dropdownMode="select"
                    className="date-picker"
                    onChangeRaw={this.onDateEnter}
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
                    onChangeRaw={this.onTimeEnter}
                />
                <span className="filter-on">Service</span>
                <input className="filter-input" ref="service"/>
                <span className="filter-on">Username</span>
                <input className="filter-input" ref="user"/>
                <button className="filter-button" onClick={this.onFilterClick} disabled={this.state.disableButton}>
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
