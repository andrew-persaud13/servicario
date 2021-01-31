import { combineReducers } from 'redux';
import {
  SET_COLLABORATION_JOINED_PEOPLE,
  SET_COLLABORATION,
  UPDATE_COLLABORATION_USER,
} from 'types';

const initCollab = () => {
  const collaboration = (state = {}, action) => {
    switch (action.type) {
      case SET_COLLABORATION:
        return action.collaboration;
      default:
        return state;
    }
  };

  const joinedPeople = (state = [], action) => {
    switch (action.type) {
      case SET_COLLABORATION_JOINED_PEOPLE:
        return action.joinedPeople;
      case UPDATE_COLLABORATION_USER:
        return state.map(user =>
          user.uid === action.user.uid ? action.user : user
        );
      default:
        return state;
    }
  };

  const messages = (state = [], action) => {
    switch (action.type) {
      case SET_COLLABORATION:
      case SET_COLLABORATION_JOINED_PEOPLE:
      default:
        return state;
    }
  };

  return combineReducers({
    joined: collaboration,
    joinedPeople,
    messages,
  });
};

export default initCollab();
