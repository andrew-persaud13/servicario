
import { createStore, applyMiddleware, compose } from 'redux'
import thunk  from 'redux-thunk'
import logger  from 'redux-logger'
import serviceApp from '../reducers'

// const logger = store => nextDispatch => action => {
//       console.group(action.type)
//       console.log('%c prev state', 'color: gray' ,store.getState())
//       console.log('%c action', 'color: green' ,action)
//       const returnValue = nextDispatch(action)
//       console.log('%c next state', 'color: magenta' ,store.getState())
//       console.groupEnd(action.type)
//       return returnValue
// }

// const promise = store => nextDispatch => action => {
//       if (typeof action.then === 'function') {
//         return action.then(nextDispatch)
//       }
//       return nextDispatch(action)
// }


// const thunk = store => nextDispatch => action => {
//   if (typeof action === 'function') {
//     return action(store.dispatch, store.getState)
//   }
//   nextDispatch(action)
// }


//array of functions that all take store and decorate dispatch
// const applyMiddlewares = (store, middlewares) => {
//   middlewares.forEach(middleware => {
//     store.dispatch = middleware(store)(store.dispatch)
//   })
// }

export const initStore = () => {
  const middlewares = []
  if (process.env.NODE_env !== 'production') {
    middlewares.push(logger)
  }
  middlewares.push(thunk)

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  const store = createStore(
    serviceApp,
    composeEnhancers(applyMiddleware(...middlewares))
  )


  return store
}

export default initStore()




















