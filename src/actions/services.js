import {
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICE_SUCCESS,
  REQUEST_SERVICE,
  RESET_SERVICE,
  FETCH_USER_SERVICES_SUCCESS,
} from '../types';

import * as api from '../api';

export const requestService = () => ({
  type: REQUEST_SERVICE,
});

export const resetService = () => ({
  type: RESET_SERVICE,
});

export const fetchServices = () => dispatch => {
  return api
    .fetchServices()
    .then(services => dispatch({ type: FETCH_SERVICES_SUCCESS, services }));
};

export const fetchUserServices = userId => dispatch => {
  return api
    .fetchUserServices(userId)
    .then(services =>
      dispatch({ type: FETCH_USER_SERVICES_SUCCESS, services })
    );
};

export const fetchServiceById = serviceId => (dispatch, getState) => {
  const lastService = getState().selectedService.item;
  if (lastService.id && lastService.id === serviceId) return Promise.resolve();

  dispatch(requestService());
  return api.fetchServiceById(serviceId).then(async service => {
    //service.user = await api.getUserProfile(service.user);
    const user = await service.user.get();
    service.user = user.data();
    service.user.id = user.id;
    dispatch({ type: FETCH_SERVICE_SUCCESS, service });
  });
};

export const createService = async (serviceData, userId) => {
  serviceData.price = parseInt(serviceData.price, 10);
  serviceData.user = api.createUserRef(userId);
  return api.createService(serviceData);
};
