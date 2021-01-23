import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider  } from 'react-redux' 
import { ToastProvider } from 'react-toast-notifications'


import { onAuthStateChanged, storeAuthUser } from './actions'



import store from './store'
import ServiceApp from 'ServiceApp'



class App extends React.Component {
 
  componentDidMount() {
    
    this.unsubscribeAuth = onAuthStateChanged(authUser => {
      store.dispatch(storeAuthUser(authUser))
    })
  }

  componentWillUnmount() {
    this.unsubscribeAuth()
  }

  render() {
    return (
      <Provider store={store}>
        <ToastProvider>
          <Router>
            <ServiceApp />
          </Router>
        </ToastProvider>
      </Provider>
    );
 }
}

export default App;
