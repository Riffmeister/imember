import React from 'react';
import { exercises } from '../constants';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

import globalStore from '../globalStore';

class Results extends React.Component {
  render() {
    return (
      <section className='body-content'>
        <h2>Session Results</h2>
        <div className='results'>
          {this._generateResults()}
        </div>
      </section>
    )
  }

  _generateResults() {
    var resultsJSX = []
    Object.keys(globalStore.currentExerciseSelectedAnswers).forEach((exercise) => {
      var topicNumber = exercise
      var statsJSX = []
      Object.keys(globalStore.currentExerciseSelectedAnswers[exercise]).forEach((question) => {
        var key = `${exercise} + ${question}`
        console.log(globalStore.currentExerciseSelectedAnswers[exercise][question])
        statsJSX.push(
          <div key={key} className='question'>
          <h4>Question {parseInt(question) + 1}</h4>
            <p>{globalStore.currentExerciseSelectedAnswers[exercise][question].correctAnswer !== globalStore.currentExerciseSelectedAnswers[exercise][question].selectedAnswer ? 'Incorrect' : 'Correct'}</p>
          </div>
        )
        console.log(question)
      })
      // console.log(globalStore.currentExerciseSelectedAnswers[exercise])
      resultsJSX.push(
        <div key={topicNumber} className='topic'>
          <h3>Section {topicNumber}</h3>
          <div className='questions'>
          {statsJSX}
          </div>
        </div>
      )
    })
    return resultsJSX
  }
}

export default Results;
