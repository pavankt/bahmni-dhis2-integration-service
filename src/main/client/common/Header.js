import React, {Component} from 'react';

export default class Header extends Component {

    constructor() {
        super();
        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        const history = this.props.history;
        history.push(history.location.pathname === '/' ? '/bahmni/home': '/');
    }

    render() {
        return (
          <header className='header-wrap-dhis'>
            <a className='back-btn' onClick={this.redirect}>
              <i className='fa fa-home' />
            </a>
          </header>
        )
    }
}
