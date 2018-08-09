import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Message extends Component{

    constructor() {
        super();
    }

    render() {
        if(this.props.message === "") {
            return null;
        }
        return (
          <div>
            <div className={`${this.props.type}-msg`}>
              {this.props.message}
            </div>
          </div>
        );
    }
}

Message.propTypes = {
  message : PropTypes.string.isRequired,
  type : PropTypes.string.isRequired,
  dispatch : PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  message : state.showMessage.responseMessage,
  type : state.showMessage.responseType
});

export default connect(mapStateToProps)(Message);