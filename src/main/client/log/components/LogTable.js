import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { actualLogHeaders } from "../../common/constants";
import { getLogs, getUtcFromLocal, getLocalFromUtc } from "../actions/LogActions";
import moment from 'moment';

class LogTable extends Component{
    constructor(props) {
        super(props);
        this.renderTableHeader = this.renderTableHeader.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.renderValues = this.renderValues.bind(this);
    }

    componentDidMount() {
        let date = moment(new Date()).format("YYYY-MM-DD");
        let time = moment("12:00 AM", "hh:mm A", true).format("HH:mm:ss");
        let dateTime = date + " " + time;
        this.props.dispatch(getLogs(getUtcFromLocal(dateTime)));
    }

    renderTableHeader() {
        let logs = this.props.logs;
        let keys = logs.length > 0 ? Object.keys(logs[0]) : [];
        return keys.map(header => (
            <th className="log-header">
                {actualLogHeaders[header]}
            </th>
        ));
    }

    renderTableData() {
        return this.props.logs.map(obj => (
            <tr className={`log-row`}>
                {this.renderValues(obj)}
            </tr>
        ));
    }

    renderValues(rowObj) {
        return Object.keys(rowObj).map(key => (
            <td key={key} className="log-table-data-values">
                { key === 'date_created'
                    ? getLocalFromUtc(rowObj[key])
                    : rowObj[key]
                }
            </td>
        ));
    }

    render() {
        return(
            <div className="log-table-page">
                <section className="log-table-section">
                    <table className="log-table">
                        <tbody>
                        <tr className="log-row-header">
                            {this.renderTableHeader()}
                        </tr>
                        {this.renderTableData()}
                        </tbody>
                    </table>
                </section>
            </div>
        );
    }
}

LogTable.propTypes = {
    dispatch: PropTypes.func.isRequired,
    logs: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    logs: state.logs
});

export default connect(mapStateToProps)(LogTable);