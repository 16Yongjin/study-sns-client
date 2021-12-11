import { observer } from 'mobx-react-lite'
import { store } from '../../store'
import { Dashboard } from '../user'
import { Role } from '../../api/auth/entity'
import { Redirect } from 'react-router'
import { Loading } from '../../components/common'

export const Home = observer(() => {
  const role = store.userStore.user?.role
  const loggedIn = store.userStore.token

  if (role === Role.ADMIN) return <div>ADMIN</div>
  if (role === Role.USER) return <Dashboard />

  if (!loggedIn) return <Redirect to="/login" />

  return <Loading />
})
