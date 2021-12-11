import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home, Signup, UserLogin } from './views'
import './App.css'
import { observer } from 'mobx-react-lite'
import { Layout } from './views/Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/login">
            <UserLogin />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default observer(Router)
