import db from 'db';

export const createService = serviceData =>
  db
    .collection('/services')
    .add(serviceData)
    .then(docRef => docRef.id);

export const fetchServices = () =>
  db
    .collection('services')
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );

export const fetchUserServices = userId =>
  db
    .collection('services')
    .where('user', '==', userId)
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    );

export const fetchServiceById = serviceId =>
  db
    .collection('services')
    .doc(serviceId)
    .get()
    .then(snapshot => ({ id: snapshot.id, ...snapshot.data() }));
