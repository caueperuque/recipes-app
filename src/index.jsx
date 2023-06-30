import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';

// Verifica se o local storage está disponível
function isLocalStorageAvailable() {
  try {
    const testKey = '__testKey__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

// Verifica e configura o local storage com um array vazio se necessário
if (isLocalStorageAvailable() && !localStorage.getItem('favoriteRecipes')) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <BrowserRouter>
      <Provider store={ store }>
        <App />
      </Provider>
    </BrowserRouter>,
  );

serviceWorker.unregister();
