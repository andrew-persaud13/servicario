import { FETCH_SERVICES_SUCCESS } from '../types'
import { combineReducers } from 'redux'

//const INITIAL_STATE = { items : []}

const initServices = () => {

  const all = (state = [] , action) => {
    switch(action.type) {
      case FETCH_SERVICES_SUCCESS:
        return action.services
      default:
        return state
    }
  }


  return combineReducers({
    all
  })


  
}


export default initServices()