import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import {
  onAuthStateChanged,
  storeAuthUser,
  subscribeToMessages,
  checkUserConnection,
} from './actions';

import store from './store';
import ServiceApp from 'ServiceApp';

class App extends React.Component {
  componentDidMount() {
    this.unsubscribeAuth = onAuthStateChanged(authUser => {
      store.dispatch(storeAuthUser(authUser));

      this.unsubFromCheckUserConnection = () => {};
      if (authUser) {
        this.unsubscribeMessages = store.dispatch(
          subscribeToMessages(authUser.uid)
        );
        this.unsubFromCheckUserConnection = checkUserConnection(authUser.uid);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuth();
    this.unsubscribeMessages();
    this.unsubFromCheckUserConnection();
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
