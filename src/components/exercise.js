import React from 'react';

import globalStore from '../globalStore';

import { Prompt } from 'react-router-dom';

class Exercise extends React.Component {
  render() {
    return (
      <section className='excercise'>
      <h3>Excercise</h3>
      <Prompt
      when={globalStore.isDirty}
      message="Your Progress Will Be Lost!">
      </Prompt>
      </section>
    )
  }
}

export default Exercise;
