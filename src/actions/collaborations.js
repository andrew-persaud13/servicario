import * as api from 'api';
import {
  COLLABORATION_CREATED,
  FETCH_USER_MESSAGES_SUCCESS,
  SET_COLLABORATION,
  SET_COLLABORATION_JOINED_PEOPLE,
  UPDATE_COLLABORATION_USER,
} from 'types';

export const collaborate = ({ collaboration, message }) => dispatch => {
  return api.createCollaboration(collaboration).then(collabId => {
    message.cta = `/collaborations/${collabId}`;
    api.sendMessage(message);
    api.markOfferAsInCollaboration(collaboration.fromOffer);
    dispatch({
      type: COLLABORATION_CREATED,
      offerId: collaboration.fromOffer,
      offersType: 'sent',
    });
    return collabId;
  });
};

export const subscribeToMessages = userId => dispatch =>
  api.subscribeToMessages(userId, messages =>
    dispatch({ type: FETCH_USER_MESSAGES_SUCCESS, messages })
  );

export const markMessageAsRead = message => api.markMessageAsRead(message);

export const fetchCollaborations = userId => api.fetchCollaborations(userId);

export const subToCollaboration = (collabId, done) => dispatch =>
  api.subToCollaboration(collabId, async collaboration => {
    let joinedPeople = []; //initially an array of ids

    if (collaboration.joinedPeople) {
      joinedPeople = await Promise.all(
        collaboration.joinedPeople.map(async userRef => {
          const userDoc = await userRef.get();
          const user = { uid: userDoc.id, ...userDoc.data() };
          return user;
        })
      );

      dispatch({ type: SET_COLLABORATION, collaboration });
      dispatch({ type: SET_COLLABORATION_JOINED_PEOPLE, joinedPeople });
      done({ joinedPeople });
    }
  });

export const joinCollaboration = (collabId, uid) =>
  api.joinCollaboration(collabId, uid);

export const leaveCollaboration = (collabId, uid) =>
  api.leaveCollaboration(collabId, uid);

export const subToProfile = uid => dispatch =>
  api.subToProfile(uid, user => {
    dispatch({ type: UPDATE_COLLABORATION_USER, user });
  });
