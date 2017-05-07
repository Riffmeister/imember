import React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';
import globalStore from '../globalStore';
import { Prompt } from 'react-router-dom';
import { exercises } from '../constants';

@observer
class Exercise extends React.Component {

  render() {
    return (
      <section className='body-content'>
        <h2>Excercise</h2>
        <button onClick={this._handleClick.bind(this, 'talk')}>
          Begin Exercise
        </button>
      </section>
    )
  }

  _handleClick(origin, event) {
    event.preventDefault()
    switch (origin) {
      case 'talk':
        // speak(exercises[globalStore.currentExercise]['topic'])
        // window.setTimeout(() => {this.props.history.push('/questions')}, exercises[globalStore.currentExercise]['time']);
        window.setTimeout(() => {this.props.history.push('/questions')}, 1000)
        break;
      default:
        console.log('We are broken')
    }
  }
}

export default Exercise;
