import { StudyGoal } from '../../api/study-goals/entity'
import { StudyGoalCard } from './StudyGoalCard'

export const StudyGoalList = ({ studyGoals }: { studyGoals: StudyGoal[] }) => {
  return (
    <div>
      {studyGoals.map((studyGoal) => (
        <StudyGoalCard key={studyGoal.id} studyGoal={studyGoal} />
      ))}
    </div>
  )
}
