import React from 'react';

import { observable } from 'mobx';
import { observer } from 'mobx-react';

import { exercises } from '../constants';
import globalStore from '../globalStore';

@observer
class LessonBuilder extends React.Component {
  lessonLength = null

  componentWillMount() {
    globalStore.completedExercises = []
    globalStore.selectedAnswers = []
  }

  render() {
    return (
      <section className='body-content'>
        <div className='input-section'>
          <label>How long would you like your training to be?</label>
          <input ref={(length) => {this.lessonLength = length}} type='number' placeholder='1-10' onKeyDown={this._handleKeyDown.bind(this)}/>
        </div>
        <button onClick={this._handleClick.bind(this, 'begin')}>Begin Session</button>
      </section>
    )
  }

  _handleClick(reason, event) {
    event.preventDefault()
    switch (reason) {
      case 'begin':
        if (this.lessonLength.value > 0 && this.lessonLength.value <= 10) {
          globalStore.lessonLength = this.lessonLength.value
          var firstExercise = Math.floor(Math.random() * (Object.keys(exercises).length - 0)) + 0
          globalStore.completedExercises.push(firstExercise)
          globalStore.currentExercise = firstExercise
          speak('Use Tab, Shift Tab, and Enter to Navigate the App. Now use Tab and then Enter to begin App.')
          this.props.history.push('/exercise')
        } else {
          // TODO: Change this to using a snackbar!
          alert('Please enter a value in the range 1-10')
        }
        break;
      default:
        console.log('Broken')
    }
  }

  _handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this._handleClick('begin', event)
    }
  }
}

export default LessonBuilder;
