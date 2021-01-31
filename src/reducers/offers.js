import { combineReducers } from 'redux';
import {
  FETCH_OFFERS_SUCCESS,
  CHANGE_OFFER_STATUS,
  COLLABORATION_CREATED,
} from 'types';

const createOfferList = offersType => (state = [], action) => {
  if (action.offersType !== offersType) return state; //guard the switch

  switch (action.type) {
    case 'FETCH_OFFERS_SUCCESS':
      return [...action.offers];
    case CHANGE_OFFER_STATUS:
      return state.map(offer =>
        offer.id === action.id
          ? updateOffer(offer, 'status', action.status)
          : offer
      );
    case COLLABORATION_CREATED:
      return state.map(offer =>
        offer.id === action.offerId
          ? updateOffer(offer, 'collaborationCreated', true)
          : offer
      );
    default:
      return state;
  }
};

const offers = combineReducers({
  received: createOfferList('received'),
  sent: createOfferList('sent'),
});

const updateOffer = (offer, field, value) => {
  offer[field] = value;
  return offer;
};

export default offers;
