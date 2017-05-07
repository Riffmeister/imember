import React from 'react';

import globalStore from '../globalStore';

class Home extends React.Component {
  render() {
    return(
      <section className='body-content'>
        <h2>Welcome to I'Member!</h2>
        <h3>Ready to Begin?</h3>
        <button onClick={this._handleClick.bind(this, 'start')}>
          Start Training
        </button>
      </section>
    )
  }

  _handleClick(reason, event) {
    event.preventDefault()
    switch (reason) {
      case 'start':
        this.props.history.push('/lesson-builder')
        break;
      default:
        console.log('wrong')
    }
    console.log(reason)
  }
}

export default Home;
