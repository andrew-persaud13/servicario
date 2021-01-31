import db from 'db';
import firebase from 'firebase/app';
import 'firebase/database';

const getOnlineStatus = isOnline => ({
  state: isOnline ? 'online' : 'offline',
  lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
});
export const setUserOnlineStatus = (uid, isOnline) => {
  const userRef = db.doc(`/profiles/${uid}`);
  const updateData = getOnlineStatus(isOnline);
  debugger;
  return userRef.update(updateData);
};
export const onConnectionChanged = onConnection =>
  firebase
    .database()
    .ref('.info/connected')
    .on('value', snapshot => {
      if (snapshot && snapshot.val) {
        onConnection(snapshot.val());
      } else {
        onConnection(false);
      }
    });
