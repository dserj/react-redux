import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reduxImmutable from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

// here we can pass some usefuls for the initial configuration
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      thunk,
      reduxImmutable() // this is for development only
    )
  );
}
