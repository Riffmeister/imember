import React from 'react';

import { NavLink } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <section className='header'>
        <div className='title'>
          <h1>I&apos;Member</h1>
          <h2>Brain Training for All!</h2>
        </div>
        <div className='header-content'>
          <button ><NavLink exact activeClassName='active' to="/">Home</NavLink></button>
          <button><NavLink activeClassName='active' to="/about">About</NavLink></button>
          <button><NavLink activeClassName='active' to="/stats">Stats</NavLink></button>
          <button><NavLink activeClassName='active' to="/support">Support</NavLink></button>
        </div>
      </section>
    )
  }

  _handleClick(redirect, event) {
    switch (redirect) {
      case 'home':
        this.props.history.push('/')
        break;
    }
  }
}

export default Header;
