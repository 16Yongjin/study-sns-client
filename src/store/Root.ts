import { StudyTimeStore } from './StudyTime'
import { UserStore } from './User'

export class RootStore {
  userStore: UserStore
  studyTimeStore: StudyTimeStore

  constructor() {
    this.userStore = new UserStore(this)
    this.studyTimeStore = new StudyTimeStore(this)
  }
}
