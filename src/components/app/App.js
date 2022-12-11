import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import Modal from '../modal/Modal';
import Registration from '../registration/Registration';
import Authorisation from '../authorization/Authorization';
import css from './App.module.css';
import { useSelector } from 'react-redux';

function App() {
  localStorage.removeItem('token');
  console.log('localStorage=', localStorage.getItem('token'));
  const isModalActive = useSelector(state => state.officers.isModalActive);
  const isAuthorization = useSelector(state => state.auth.isAuthorization);
  const isRegistration = useSelector(state => state.officers.isRegistration);
  console.log('isAuthorization=', isAuthorization);
  console.log('isRegistration=', isRegistration);
  console.log('isModalActive=', isModalActive);
  return (
    <BrowserRouter>
      <div className={css.App}>
        <Header />
        <Main />
        <Footer />
        <Modal active={isModalActive}>
          {isAuthorization && <Authorisation />}
          {isRegistration && <Registration />}
        </Modal>
      </div >
    </BrowserRouter>
  );
}

export default App;
