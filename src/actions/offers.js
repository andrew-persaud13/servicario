import * as api from 'api';
import { FETCH_OFFERS_SUCCESS, CHANGE_OFFER_STATUS } from 'types';

export const createOffer = offer => api.createOffer(offer);

const extractDataFromOffer = userField => async offer => {
  const service = await offer.service.get(); //get --> data
  const user = await offer[userField].get();

  offer.service = service.data();
  offer.service.id = service.id;
  offer[userField] = user.data();

  return offer;
};

export const fetchSentOffers = userId => dispatch => {
  return api.fetchSentOffers(userId).then(async offers => {
    const populatedOffers = await Promise.all(
      offers.map(extractDataFromOffer('toUser'))
    );
    dispatch({
      type: FETCH_OFFERS_SUCCESS,
      offers: populatedOffers,
      offersType: 'sent',
    });
    return offers;
  });
};

export const fetchReceivedOffers = userId => dispatch => {
  return api.fetchReceivedOffers(userId).then(async offers => {
    const populatedOffers = await Promise.all(
      offers.map(extractDataFromOffer('fromUser'))
    );
    dispatch({
      type: FETCH_OFFERS_SUCCESS,
      offers: populatedOffers,
      offersType: 'received',
    });
    return offers;
  });
};

export const changeOfferStatus = (offerId, status) => dispatch =>
  api.changeOfferStatus(offerId, status).then(_ =>
    dispatch({
      type: CHANGE_OFFER_STATUS,
      id: offerId,
      status,
      offersType: 'received',
    })
  );
