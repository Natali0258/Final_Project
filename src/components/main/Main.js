import React from 'react';
import MainPage from '../mainPage/MainPage';
import Authorization from '../authorization/Authorization';
import MessageForm from '../messageForm/MessageForm';
import Messages from '../messages/Messages';
import DetalMessage from '../detalMessage/DetalMessage';
import Officer from '../officer/Officer';
import DetalOfficer from '../detalOfficer/DetalOfficer';
import css from './Main.module.css';

const Main = (props) => {
   return (
      <main className={css.main}>
         <MainPage />
         <MessageForm />
         <Messages />
         <DetalMessage />
         <Officer />
         <DetalOfficer />
      </main >
   )
}
export default Main;