import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
//import data from '../../server-response-mock.js';
import css from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <div className={css.App}>
        <Header />
        <Main />
        <Footer />
      </div >
    </BrowserRouter>
  );
}

export default App;
