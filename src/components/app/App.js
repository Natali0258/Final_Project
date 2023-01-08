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
import * as officersSelectors from '../../storage/selectors';
import * as authSelectors from '../../storage/selectors';
import css from './App.module.css';
import { useSelector } from 'react-redux';

function App() {
  const isModalActive = useSelector(officersSelectors.isModalActive);
  const isRegistration = useSelector(officersSelectors.isRegistration);
  const isAuthorization = useSelector(authSelectors.isAuthorization);
  const isError = useSelector(authSelectors.isError);

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
        </Modal>
      </div >
    </BrowserRouter>
  );
}

export default App;
