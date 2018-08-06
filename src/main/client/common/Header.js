import React, {Component} from 'react';

export default class Header extends Component {

    constructor() {
        super();
        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        const history = this.props.history;
        history.push(history.location.pathname === '/' ? '/bahmni/home' : '/');
    }

    render() {
        return (
          <div className='opt-header-wrapper'>
            <header className='center header-wrap-dhis'>
              <button type='submit' className='back-btn' onClick={this.redirect}>
                <i className='fa fa-home' />
              </button>
            </header>
          </div>
        )
    }
}
