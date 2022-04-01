import React, { useEffect, useState } from 'react';
import line1 from '../../images/line1.svg';
import line2 from '../../images/line2.svg';
import css from './RegistrationResult.module.css';

const RegistrationResult = (props) => {
   const { isFormOpen, isFormError, isFormRegistration, setFormRegistration } = props;

   const message = localStorage.getItem('message');
   console.log(message);
   useEffect(() => {
      localStorage.removeItem('message');
   })

   return (
      <>
         <div className={css.cross} onClick={() => setFormRegistration(!isFormRegistration)}>
            <img className={css.line1} src={line1} alt='' />
            <img className={css.line2} src={line2} alt='' />
         </div>
         {!isFormOpen && !isFormError &&
            (<>
               <p className={css.success}>Пользователь зарегистрирован!</p>
               <p className={css.success}>Для авторизации нажмите кнопку ВХОД.</p>
            </>)}
         {isFormError && isFormOpen &&
            (<>
               <p className={css.success}>ОШИБКА!</p>
               <p className={css.success}>{message}</p>
            </>)}
      </>
   )
}
export default RegistrationResult;