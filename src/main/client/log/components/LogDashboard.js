import React from 'react';
import Datetime from 'react-datetime';
import {Moment} from 'moment';


export default class LogDashboard extends React.Component {
    constructor() {
        super();
        this.renderDay = this.renderDay.bind(this);
        this.renderMonth = this.renderMonth.bind(this);
        this.renderYear = this.renderYear.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.validateTime = this.validateTime.bind(this);
    }
    componentDidMount() {
    }

    renderDay( props, currentDate, selectedDate ){
        return <td {...props}>{ currentDate.date() }</td>;
    }
    renderMonth( props, month, year, selectedDate ){
        return <td {...props}>{ month }</td>;
    }
    renderYear( props, year, selectedDate ){
        return <td {...props}>{ year % 100 }</td>;
    }

    renderInput(props) {
        return <input {...props} />;
    }

    validateTime(currentTime, selectedTime) {
        console.log("current time---->", currentTime);
        console.log("current time valid----->", currentTime.isValid());
        return currentTime.isValid();
    }

    render() {
    return (
      <div className='log-page'>
          <Datetime
              inputProps={{ placeholder: 'N/A', disabled: false }}
              isValidDate={this.validateTime}
              renderDay={ this.renderDay }
              renderMonth={ this.renderMonth }
              renderYear={ this.renderYear }
          />
      </div>
    );
  }
}
