import  React from 'react'
import {render} from 'react-dom'
import  {Route ,Switch,BrowserRouter} from 'react-router-dom'
import   {Provider} from 'react-redux'
import  store from './redux/store'

//引入
import Register from './containers/register'
import Login from './containers/login'
import Dashbroad from './containers/dashbroad'
import './assets/css/style.css'

//渲染
  render(
    (
        <Provider store={store} >
      <BrowserRouter>
        <Switch>
            <Route path='/register'  component={Register}/>
            <Route path='/login'  component={Login}/>
            <Route   component={Dashbroad}/>

        </Switch>

      </BrowserRouter>
        </Provider>
    )
    ,document.getElementById('root'))
