import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class GlobalStore {
  @observable inProgress = false
  @observable lessonLength = 0
  @observable completedExercises = []
  @observable currentExercise = null
  @observable selectedAnswers = []
  @observable currentExerciseSelectedAnswers = []
}

export default new GlobalStore()
