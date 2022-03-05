import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
//import { connect } from 'react-redux';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Main from '../main/Main';
import data from '../../server-response-mock.js';
import uniqid from 'uniqid';
import css from './App.module.css';

function App() { //почему-то mock.activeOfficerId = undefined ??????:
  const { activeOfficerId, officers, cases } = data;
  const isLogged = activeOfficerId !== null; //если пользователь зарегистрирован

  // const [isCases, setCases] = useState(cases);
  //const [isOfficers, setOfficers] = useState(officers);

  const loggedOfficer = data.officers.find(officer => officer.id === activeOfficerId)

  // const addNewOfficer = (lastName, firstName, email, password, clientId) => {
  //   const newOfficer = {
  //     id: uniqid(),
  //     lastName: lastName,
  //     firstName: firstName,
  //     email: email,
  //     password: password,
  //     approved: false,
  //   };
  //   setOfficers(isOfficers => { return [...isOfficers, newOfficer] });
  // }

  // const addNewCase = (status, licenseNumber, type, ownerFullName, createdAd, updatedAd, color, date, officer, description,) => {
  //   const newCase = {
  //     status: status,
  //     licenseNumber: licenseNumber,
  //     type: type,
  //     ownerFullName: ownerFullName,
  //     clientId: '995544',
  //     createdAd: createdAd,
  //     updatedAd: createdAd,
  //     color: color,
  //     date: date,
  //     officer: officer,
  //     description: description,
  //     resolution: '',
  //   };
  //   setCases([...isCases, newCase]);
  //   console.log(cases);
  // }

  return (
    <BrowserRouter>
      <div className={css.App}>
        <Header isLogged={isLogged}
          loggedOfficer={loggedOfficer} />
        <Main isLogged={isLogged}
          loggedOfficer={loggedOfficer} />
        <Footer />
      </div >
    </BrowserRouter>
  );
}

export default App;
