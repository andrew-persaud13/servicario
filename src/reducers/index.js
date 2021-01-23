import { combineReducers } from "redux";

import services from "../reducers/services";
import selectedService from "../reducers/selectedService";
import auth from "./auth";

const serviceApp = combineReducers({
  services,
  selectedService,
  auth,
});

export default serviceApp;

/*

One reducer for the array of items --->  { all  }
One reducer for the selectedService --> { item, isFetching }

In here combine them into one object

{
  services: {  all: [] }
  selectedService: {
    item: { },
    isFetching: bool
  }
}

state: {
  services: {  all: [] }
  selectedService: {
    item: { },
    isFetching: bool
  }
}

Create your reducers inside a function and return using combineReducers
*/
