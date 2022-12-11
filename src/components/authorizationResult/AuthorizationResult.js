import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../storage/actions/officerActions';
import { closeAuthorization } from '../../storage/actions/authActions';
//import line1 from '../../images/line1.svg';
//import line2 from '../../images/line2.svg';
import ButtonClose from '../formElements/buttonClose';
import css from './AuthorizationResult.module.css';

const AuthorizationResult = (props) => {
   const dispatch = useDispatch();
   const { isLogged, isFormError, isForm, setForm } = props;
   const [isResult, setResult] = useState(true);
   const firstName = localStorage.getItem('firstName');

   console.log('!isResult=', !isResult)
   const handleClickAuthResult = () => {
      //setForm(false);
      setResult(!isResult)
      dispatch(closeModal());
      dispatch(closeAuthorization());
   }

   return (
      <>
         {isResult && (<div className={css.authorizationResult}>
            <ButtonClose onClick={handleClickAuthResult} />
            {!isFormError ?
               (
                  <h2 className={css.hello}>Добро пожаловать, {firstName}!</h2>
               ) : (<>
                  <h2 className={css.helloLink}>Неверный логин или пароль!</h2>
                  <p className={css.link}>Повторите процедуру авторизации или создайте новую учетную запись.</p>
               </>)
            }
         </div >)
         }
      </>
   )
}
export default AuthorizationResult;