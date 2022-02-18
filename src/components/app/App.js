import React, { useState, useRef } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import data from '../../server-response-mock.js';
import uniqid from 'uniqid';
import css from './App.module.css';

function App() { //почему-то mock.activeUserId = undefined ??????:
  const { activeUserId, users, messages } = data;
  console.log('data.activeUserId=', activeUserId);
  const isLogged = activeUserId !== null; //если пользователь зарегистрирован
  console.log('App-isLogged=', isLogged);

  const ref = useRef();
  const [isMessages, setMessages] = useState(messages);
  const [isUsers, setUsers] = useState(users);

  const loggedUser = data.users.find(user => user.id === activeUserId)
  console.log('loggedUser=', loggedUser);

  const addNewOfficer = (lastName, firstName, email, password, clientId) => {
    // if (users.lenght == 0) {
    //   const newOfficer = {
    //     id: uniqid(),
    //     lastName: lastName,
    //     firstName: firstName,
    //     email: email,
    //     password: password,
    //     approved: true,
    //   }
    // } else {}
    const newOfficer = {
      id: uniqid(),
      lastName: lastName,
      firstName: firstName,
      email: email,
      password: password,
      approved: false,
    };
    setUsers(isUsers => { return [...isUsers, newOfficer] });
    console.log('isUsers=', isUsers);
    console.log('newOfficer=', newOfficer);
  }

  const addNewMessages = (status, licenseNumber, type, ownerFullName, createdAd, updatedAd, color, date, officer, description,) => {
    const newMessage = {
      status: status,
      licenseNumber: licenseNumber,
      type: type,
      ownerFullName: ownerFullName,
      clientId: '995544',
      createdAd: createdAd,
      updatedAd: createdAd,
      color: color,
      date: date,
      officer: officer,
      description: description,
      resolution: '',
    };
    setMessages([...isMessages, newMessage]);
    console.log(messages);
  }

  return (
    <div className={css.App}>
      <Header isLogged={isLogged}
        loggedUser={loggedUser}
        addNewOfficer={addNewOfficer}
        ref={ref} />
      <Main isLogged={isLogged}
        loggedUser={loggedUser}
        addNewMessages={addNewMessages}
        addNewOfficer={addNewOfficer}
        users={isUsers} setUsers={setUsers}
        messages={isMessages}
        setMessages={setMessages} />
      <Footer />
    </div >
  );
}

export default App;
