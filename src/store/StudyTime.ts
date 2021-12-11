import { action, computed, makeObservable, observable } from 'mobx'
import { RootStore } from './Root'
import { StudyTime } from '../api/study-times/entity'
import { api } from '../api'
import { StudyGoal } from '../api/study-goals/entity'

export class StudyTimeStore {
  rootStore: RootStore
  studyGoals: StudyGoal[]
  studyTimes: StudyTime[]
  currentStudyTime: StudyTime | null
  updateWorkerId: any

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    this.studyGoals = []
    this.studyTimes = []
    this.currentStudyTime = null
    this.updateWorkerId = -1

    makeObservable(this, {
      studyGoals: observable,
      studyTimes: observable,
      currentStudyTime: observable,
      startStudy: action,
      stopStudy: action,
      tickStartTime: action,
      updateStudyTime: action,
      loadStudyGoals: action,
      createStudyGoal: action,
      deleteStudyGoal: action,
      updateStudyGoal: action,
      loadStudyTimes: action,
      createStudyTime: action,
      studyGoalAndTimes: computed,
      totalStudyTime: computed,
      init: action,
    })

    if (this.rootStore.userStore.token) {
      this.init()
    }
  }

  /** 시간을 추가한 공부 목표 목록 */
  get studyGoalAndTimes(): (StudyGoal & { studyTime: StudyTime })[] {
    const goalToTime: Record<number, StudyTime> = this.studyTimes.reduce(
      (acc, time) =>
        time.studyGoal ? { ...acc, [time.studyGoal.id]: time } : acc,
      {}
    )

    return this.studyGoals.map((goal) => ({
      ...goal,
      studyTime: goalToTime[goal.id],
    }))
  }

  /** 오늘의 총 공부 시간 */
  get totalStudyTime() {
    return this.studyTimes
      .map((time) => time.duration)
      .reduce((a, b) => a + b, 0)
  }

  /** 공부 시작하기 */
  async startStudy(studyGoalId: number, studyTimeId?: number) {
    this.stopStudy()

    const studyTime = this.studyTimes.find((time) => time.id === studyTimeId)

    if (studyTime) {
      this.currentStudyTime = studyTime
    } else {
      // 공부 시간 없으면 생성
      const studyTimeId = (await this.createStudyTime(studyGoalId)).id
      const studyTime = this.studyTimes.find((time) => time.id === studyTimeId)
      if (!studyTime) return
      this.currentStudyTime = studyTime
    }

    this.updateWorkerId = setInterval(() => this.tickStartTime(), 1000)
  }

  /** 공부 그만하기 */
  async stopStudy() {
    if (!this.currentStudyTime) return

    clearInterval(this.updateWorkerId)
    this.currentStudyTime = null
    this.updateWorkerId = -1
  }

  /** 공부 시간 1초 추가 */
  tickStartTime() {
    console.log('tick!')
    if (!this.currentStudyTime) {
      return clearInterval(this.updateWorkerId)
    }

    this.currentStudyTime.duration += 1
    this.updateStudyTime()
  }

  /** 공부 시간 서버에 업데이트 */
  async updateStudyTime() {
    if (!this.currentStudyTime) return

    await api.studyTimes.updateStudyTime(this.currentStudyTime.id, {
      duration: this.currentStudyTime.duration,
    })
  }

  /** 공부 목표 가져오기 */
  async loadStudyGoals() {
    this.studyGoals = await api.studyGoals.getStudyGoals()
  }

  /** 공부 목표 생성 */
  async createStudyGoal(data: { name: string }) {
    await api.studyGoals.createStudyGoal(data)
    await this.loadStudyGoals()
  }

  /** 공부 목표 수정 */
  async updateStudyGoal(id: number, data: { name: string }) {
    await api.studyGoals.updateStudyGoal(id, data)
    await this.loadStudyGoals()
  }

  /** 공부 목표 삭제 */
  async deleteStudyGoal(id: number) {
    await api.studyGoals.deleteStudyGoal(id)
    await this.loadStudyGoals()
  }

  /** 오늘의 공부 시간 가져오기 */
  async loadStudyTimes() {
    this.studyTimes = await api.studyTimes.getTodayStudyTimes()
  }

  /** 공부 시간 생성 */
  async createStudyTime(studyGoalId: number) {
    const studyTime = await api.studyTimes.createStudyTime({ studyGoalId })
    await this.loadStudyTimes()
    return studyTime
  }

  init() {
    console.log('init study time')
    this.loadStudyGoals()
    this.loadStudyTimes()
  }
}
