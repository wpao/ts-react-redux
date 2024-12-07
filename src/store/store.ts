import {combineReducers} from 'redux'
import { userReducer } from './user'
import { counterReducer } from './counter';


export const reducers = combineReducers({
  // add your reducers here
  user: userReducer, /* ini adalah slice dengan nama user */
  counter: counterReducer
})

// types
// Tipe global untuk state Redux
export type RootState = ReturnType<typeof reducers>;