import React from 'react';

import { exercises } from '../constants';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import { Prompt } from 'react-router-dom';
import globalStore from '../globalStore';


@observer
class Questions extends React.Component {

  componentWillMount() {
    globalStore.currentExerciseSelectedAnswers = {}
    globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise] = {}
    Object.keys(exercises[globalStore.currentExercise].questions).forEach((question) => {
      globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question] = {selectedAnswer: null, correctAnswer: null, reference: {}}

      var correct = null
      Object.keys(exercises[globalStore.currentExercise].questions[question].potentialAnswers).forEach((answer) => {
        if (exercises[globalStore.currentExercise].questions[question].potentialAnswers[answer].valid === true) {
          correct = parseInt(answer)
        }
        globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].reference[answer] = null
      })
      globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].correctAnswer = correct
      console.log('globalStore', globalStore.currentExerciseSelectedAnswers)
    })
    console.log('successfully mounted')
  }

  render() {
    return (
      <section className='body-content'>
      {this._generateQuestions()}
      <button onClick={this._handleClick.bind(this, 'submit', null, null)} onKeyDown={this._handleKeyDown.bind(this)}>Submit</button>
      </section>
    )
  }

  componentWillUnmount() {
    globalStore.completedExercises.push(globalStore.currentExercise)
  }

  _generateQuestions() {
    var questionsJSX = []
    Object.keys(exercises[globalStore.currentExercise].questions).forEach((question) => {
      var answersJSX = []
      Object.keys(exercises[globalStore.currentExercise].questions[question].potentialAnswers).forEach((answer) => {
        answersJSX.push(
          <div key={answer} className='answer'>
            <button onClick={this._handleClick.bind(this, 'answer', question, answer)}>
              Answer {parseInt(answer, 10) + 1}
            </button>
            <button onClick={this._handleClick.bind(this, 'select', question, answer)} ref={(answerSelected) => {globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].reference[answer] = answerSelected}}>
              Selected Answer {parseInt(answer, 10) + 1}
            </button>
          </div>
        )
      })
      questionsJSX.push(
        <div key={question} className='question'>
          <button onClick={this._handleClick.bind(this, 'question', question, null)}>Question {parseInt(question, 10) + 1}</button>
          <div className='answers'>
            {answersJSX}
          </div>
        </div>
      )
    })
    return questionsJSX
  }

  _selectAnswer(question, answer) {
    if (globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].selectedAnswer === null) {
      console.log('1')
      speak(`Question ${parseInt(question) + 1}, Answer ${parseInt(answer) + 1} selected`)
      globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].reference[answer].classList.add('selected')
      globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].selectedAnswer = parseInt(answer)
    } else if (globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].selectedAnswer === parseInt(answer)) {
      console.log('2')
      speak(`Question ${parseInt(question) + 1}, Answer ${parseInt(answer) + 1} deselected`)
      globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].reference[answer].classList.remove('selected')
      globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].selectedAnswer = null
    } else if (globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].selectedAnswer !== parseInt(answer)) {
      console.log('3')
      globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].reference[globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].selectedAnswer].classList.remove('selected')
      globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].selectedAnswer = parseInt(answer)
      globalStore.currentExerciseSelectedAnswers[globalStore.currentExercise][question].reference[answer].classList.add('selected')
      speak(`Question ${parseInt(question) + 1}, Answer ${parseInt(answer) + 1} selected`)
    }
  }

  _handleClick(origin, question, answer, event) {
    event.preventDefault()
    switch (origin) {
      case 'submit':
      this._submit()
        break;
      case 'question':
        speak(`Question ${parseInt(question) + 1}, ${exercises[globalStore.currentExercise].questions[question].question}`)
        break;
      case 'answer':
        speak(`Question ${parseInt(question) + 1}, Answer ${parseInt(answer) + 1}, ${exercises[globalStore.currentExercise].questions[question].potentialAnswers[answer].answer}`)
        break;
      case 'select':
        this._selectAnswer(question, answer)
        break;
      default:
        console.log('We are broken')
    }
  }

  _handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      this._handleClick('submit', null, null, event)
    }
  }

  _submit() {
    console.log('selected', globalStore.selectedAnswers.length)
    console.log('length', globalStore.lessonLength)
    if (globalStore.selectedAnswers.length === (globalStore.lessonLength - 1)) {
      console.log('hello')
      this.props.history.push('/results')
    }
    console.log('submitted')
  }
}

export default Questions;
