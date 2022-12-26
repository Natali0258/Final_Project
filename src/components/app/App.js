import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import Modal from '../modal/Modal';
import Registration from '../registration/Registration';
import Authorisation from '../authorization/Authorization';
import Result from '../result/Result';
import RegAndAuthResult from '../regAndAuthResult/RegAndAuthResult';
import css from './App.module.css';
import { useSelector } from 'react-redux';

function App() {
  const isModalActive = useSelector(state => state.officers.isModalActive);
  const isAuthorization = useSelector(state => state.auth.isAuthorization);
  const isRegistration = useSelector(state => state.officers.isRegistration);
  const isError = useSelector(state => state.auth.isError)
  const isAuthResult = useSelector(state => state.auth.isAuthResult)
  //console.log('isError=', isError)
  return (
    <BrowserRouter>
      <div className={css.App}>
        <Header />
        <Main />
        <Footer />
        <Modal active={isModalActive}>
          {isAuthorization && <Authorisation />}
          {isRegistration && <Registration />}
          {isError &&
            <Result>
              <RegAndAuthResult />
            </Result>
          }
          {isAuthResult &&
            <Result>
              <RegAndAuthResult />
            </Result>
          }
        </Modal>
      </div >
    </BrowserRouter>
  );
}

export default App;
