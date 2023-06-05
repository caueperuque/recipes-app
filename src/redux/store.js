import { applyMiddleware, legacy_createStore as Store } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './reducer/rootReducer';

const store = Store(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);

if (window.Cypress) {
  window.store = store;
}

export default store;
