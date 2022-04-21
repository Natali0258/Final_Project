import React, { useState } from 'react';
//import line1 from '../../images/line1.svg';
//import line2 from '../../images/line2.svg';
import ButtonClose from '../formElements/buttonClose';
import css from './AuthorizationResult.module.css';

const AuthorizationResult = (props) => {
   //const { isLogged, loggedOfficer } = props;
   const { isLogged, isFormError, isResult, setResult, isForm, setForm } = props;
   const firstName = localStorage.getItem('firstName');
   console.log('isLoggedResult=', isLogged);

   const handleClickAuthResult = () => {
      setForm(false);
      setResult(!isResult)
      console.log('isResult=', isResult, 'isForm=', isForm)
   }

   return (
      <div className={css.authorizationResult}>
         <ButtonClose onClick={handleClickAuthResult} />
         {!isFormError ?
            (
               <h2 className={css.hello}>Добро пожаловать, {firstName}!</h2>
            ) : (<>
               <h2 className={css.helloLink}>Неверный логин или пароль!</h2>
               <p className={css.link}>Повторите процедуру авторизации</p>
               <p className={css.link}>или создайте новую учетную запись.</p>
            </>)
         }
      </div >
   )
}
export default AuthorizationResult;