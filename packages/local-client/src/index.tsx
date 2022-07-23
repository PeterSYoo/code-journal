import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state/store';
import Footer from './components/footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className="logo">
      <img src="https://i.imgur.com/XnrAbs8.png" alt="logo" />
    </div>
    <Provider store={store}>
      <App />
    </Provider>
    <Footer />
  </React.StrictMode>
);
