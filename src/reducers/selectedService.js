import { combineReducers } from 'redux'
import {  
  FETCH_SERVICE_SUCCESS, 
  REQUEST_SERVICE,
  RESET_SERVICE 
} from '../types'


//const INITIAL_STATE = { item : {}} combineReducers will create the outer object

const initSelectedService = () => {
  
  const selectedService = (state = {} , action) => {
    switch(action.type) {
      case FETCH_SERVICE_SUCCESS:
        return action.service 
      case RESET_SERVICE:
        return {}
      default:
        return state
    }
  }

  const isFetching = (state = false, action) => {
    switch(action.type) {
      case FETCH_SERVICE_SUCCESS:
        return false
      case REQUEST_SERVICE:
        return true
      default:
        return state
    }
  }
  
  return combineReducers({
    item: selectedService,
    isFetching
  })
}


export default initSelectedService()