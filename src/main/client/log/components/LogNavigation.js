import React, { Component } from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { getNextPageLogs, getPrevPageLogs, getUtcFromLocal } from '../actions/LogActions';

class LogNavigation extends Component{
    constructor(props) {
        super(props);
        this.onPrevPage = this.onPrevPage.bind(this);
        this.onNextPage = this.onNextPage.bind(this);
    }

    onPrevPage() {
        let filters = this.props.filters;
        this.props.dispatch(getPrevPageLogs(getUtcFromLocal(filters.date), filters.service, filters.user));
    }

    onNextPage() {
        let filters = this.props.filters;
        this.props.dispatch(getNextPageLogs(getUtcFromLocal(filters.date), filters.service, filters.user));
    }

    render() {
        return (
          <div className="log-navigation">
              <p className="log-table-buttons">
                  <button
                      className="prev-page"
                      onClick={this.onPrevPage}
                  >
                      <i className="fa fa-chevron-left" />
                  </button>
                  <button className="next-page"
                          onClick={this.onNextPage}
                  >
                      <i className="fa fa-chevron-right" />
                  </button>
              </p>
          </div>
        );
    }
}

LogNavigation.propTypes = {
    dispatch: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    filters: state.filters
});

export default connect(mapStateToProps)(LogNavigation);
