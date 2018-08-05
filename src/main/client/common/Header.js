import React, { Component } from 'react';


class Header extends Component {

    render() {
        return (
          <header className='header-wrap-dhis'>
            <a className='back-btn'> 
              {' '}
              <i className='fa fa-home' />
            </a>
          </header>
        )
    }
}

export default Header;