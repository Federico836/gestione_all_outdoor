/* eslint-disable import/no-anonymous-default-export */
import "regenerator-runtime/runtime";
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import RootSaga from '../sagas/index'


// creates the store
export default (rootReducer, rootSaga) => {

  const middleware = [];

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);
  middleware.push(logger);


  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(...middleware)
  ));

 sagaMiddleware.run(RootSaga); 

  return store;
};
