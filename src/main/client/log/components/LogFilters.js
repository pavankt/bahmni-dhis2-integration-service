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
        this.onFilterClick = this.onFilterClick.bind(this);
        this.validateDate = this.validateDate.bind(this);
        this.validateTime = this.validateTime.bind(this);
        this.state = {
            date: moment(),
            time: moment("12:00 AM", "hh:mm A"),
            disableButton: false,
            enteredDate: moment(),
            enteredTime: moment("12:00 AM", "hh:mm A")
        }
    }

    onDateChange(date) {
        this.setState({
            date: date,
            enteredDate: date
        });

        if(this.state.enteredTime.isValid()) {
            this.setState({
                disableButton: false
            });
        }
    }

    onTimeChange(time) {
        this.setState({
            time: time,
            enteredTime: time
        });

        if(this.state.enteredDate.isValid()) {
            this.setState({
                disableButton: false
            });
        }
    }

    validateDate(dateObj) {
        let date = moment(dateObj.target.value, "MM/DD/YYYY", true);
        this.setState({
            enteredDate: date
        });

        if(date.isValid()) {
            this.onDateChange(date);
        } else {
            this.props.dispatch(showMessage("Please Enter Valid date and format should be MM/DD/YYYY", "error"));
            this.setState({
                disableButton: true
            });
        }
    }

    validateTime(timeObj) {
        let time = moment(timeObj.target.value, "h:mm A", true);
        this.setState({
            enteredTime: time
        });

        if(time.isValid()) {
            this.onTimeChange(time);
        } else {
            this.props.dispatch(showMessage("Please Enter Valid time and format should be either of h:mm A/P, " +
                "h:mm AM/PM, hh:mm A/P, hh:mm AM/PM", "error"));
            this.setState({
                disableButton: true
            });
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
                    onBlur={this.validateDate}
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
                    onBlur={this.validateTime}
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
