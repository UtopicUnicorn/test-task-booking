import React from 'react';
import './App.css';
import BookingPage from './pages/booking';
import { Provider } from 'react-redux';
import { store } from './store';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

function App() {
  return (
    <Provider store={store}>
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <div className="App">
          <BookingPage />
        </div>
      </StyleSheetManager>
    </Provider>
  );
}

//For using styled components and removing warnings from console
function shouldForwardProp(propName: string, target: any) {
  if (typeof target === 'string') {
    return isPropValid(propName);
  }
  return true;
}

export default App;
