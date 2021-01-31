import firebase from 'firebase/app';
import 'firebase/auth';

import db from 'db';

const createUserProfile = userProfile => {
  return db.collection('/profiles').doc(userProfile.uid).set(userProfile);
};

export const register = async ({ email, password, fullName, avatar }) => {
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const { user } = res;
    const userProfile = {
      email,
      fullName,
      avatar,
      uid: user.uid,
      services: [],
      description: '',
    };
    createUserProfile(userProfile);
    return userProfile;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

export const login = ({ email, password }) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => Promise.reject(error.message));
};

export const onAuthStateChanged = onAuthCallback =>
  firebase.auth().onAuthStateChanged(onAuthCallback);

export const getUserProfile = uid =>
  db
    .collection('/profiles')
    .doc(uid)
    .get()
    .then(snapshot => ({ uid, ...snapshot.data() }));

export const createUserRef = uid => db.doc('profiles/' + uid);

export const logout = () => firebase.auth().signOut();
