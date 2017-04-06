import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class GlobalStore {
  @observable isDirty = true
}

export default new GlobalStore()
