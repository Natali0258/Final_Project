import React, { useState } from 'react';
import line1 from '../../images/line1.svg';
import line2 from '../../images/line2.svg';
import css from './AuthorizationResult.module.css';

const AuthorizationResult = (props) => {
   //const { isLogged, loggedOfficer } = props;
   const { isLogged, isFormError, isResult, setResult, isFormAuthorization, setFormAuthorization } = props;
   const [isAuthorizationResult, setAuthorizationResult] = useState(false);
   const firstName = localStorage.getItem('firstName');
   console.log('isLoggedResult=', isLogged);

   const handleClickAuthResult = () => {
      setFormAuthorization(false);
      setResult(!isResult)
      console.log('isResult=', isResult, 'isFormAuthorization=', isFormAuthorization)
   }

   return (
      <div className={css.authorizationResult}>
         <div className={css.cross} onClick={handleClickAuthResult}>
            <img className={css.line1} src={line1} alt='' />
            <img className={css.line2} src={line2} alt='' />
         </div>
         {!isFormError ?
            (
               <h2 className={css.hello}>Добро пожаловать, {firstName}!</h2>
            ) : (<>
               <h2 className={css.helloLink}>Неверный логин или пароль!</h2>
               <p className={css.link}>Вам нужно создать учетную запись:</p>
               <p className={css.link}>нажмите на кнопку "Регистрация".</p>
            </>)
         }
      </div >
   )
}
export default AuthorizationResult;