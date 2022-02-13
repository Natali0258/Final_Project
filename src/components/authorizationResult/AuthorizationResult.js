import React from 'react';
import css from './AuthorizationResult.module.css';

const AuthorizationResult = (props) => {
   const { isLogged, loggedUser } = props;
   console.log('isLogged3=', isLogged);
   return (
      <div className={css.authorizationResult}>
         {isLogged ?
            (
               <h2 className={css.hello}>Добро пожаловать, {loggedUser.firstName}!</h2>
            ) : (<>
               <h2 className={css.helloLink}>Добро пожаловать на сайт!</h2>
               <p className={css.link}>Вам нужно создать <a href='/'>учетную запись</a>,</p>
               <p className={css.link}>чтобы использовать это приложение.</p>
            </>)
         }
      </div >
   )
}
export default AuthorizationResult;