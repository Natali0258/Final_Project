import React from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import mock from '../../server-response-mock.js';
import css from './App.module.css';

function App() { //почему-то mock.activeUserId = undefined ??????:
  const { activeUserId, users } = mock;
  console.log('mock.activeUserId=', activeUserId);
  const isLogged = activeUserId !== null; //если пользователь зарегистрирован
  console.log('App-isLogged=', isLogged);

  const loggedUser = users.find(user => user.id === activeUserId)
  console.log('loggedUser=', loggedUser);
  return (
    <div className={css.App}>
      <Header isLogged={isLogged} loggedUser={loggedUser} />
      <Main isLogged={isLogged} loggedUser={loggedUser} />
      <Footer />
    </div >
  );
}

export default App;
