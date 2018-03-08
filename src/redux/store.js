//redux的核心store对象
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools}from 'redux-devtools-extension'

import reducers from './reducers'

//创建核心对象
 let store = createStore(reducers,
  composeWithDevTools(applyMiddleware(thunk))
 )
export default store