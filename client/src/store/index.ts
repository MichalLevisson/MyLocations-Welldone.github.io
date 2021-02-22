import { createStore, applyMiddleware, Store } from 'redux'
import { mainReducer } from './reducers'
import thunk from 'redux-thunk'
import {  
  SystemState, SystemAction, DispatchType} from './types'

export const store: Store<SystemState, SystemAction> & {
  dispatch: DispatchType
} = createStore(mainReducer, applyMiddleware(thunk))
