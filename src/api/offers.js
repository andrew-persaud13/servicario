import db from 'db';
import { createRef } from './';

export const createOffer = offer => db.collection('offers').add(offer);
// .then(offerRef => offerRef.id);

export const fetchSentOffers = userId => {
  const user = createRef('profiles', userId);
  return db
    .collection('offers')
    .where('fromUser', '==', user)
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );
};

export const fetchReceivedOffers = userId => {
  const user = createRef('profiles', userId);
  return db
    .collection('offers')
    .where('toUser', '==', user)
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );
};

export const changeOfferStatus = (offerId, status) =>
  db.collection('offers').doc(offerId).update({ status });

export const markOfferAsInCollaboration = offerId =>
  db.collection('offers').doc(offerId).update({ collaborationCreated: true });
