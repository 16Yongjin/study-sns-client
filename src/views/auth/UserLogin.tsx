import { store } from '../../store'
import { Login } from './Login'

export const UserLogin = () => {
  const login = store.userStore.login.bind(store.userStore)
  return <Login title="로그인" login={login} signupUrl="/signup" />
}
