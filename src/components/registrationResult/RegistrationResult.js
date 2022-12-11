import React from 'react';
import { useDispatch } from 'react-redux';
import { closeRegistration, closeModal } from '../../storage/actions/officerActions';
import line1 from '../../images/line1.svg';
import line2 from '../../images/line2.svg';
import css from './RegistrationResult.module.css';

const RegistrationResult = (props) => {
   const { isFormOpen, isFormError,
      // isFormRegistration, setFormRegistration 
   } = props;
   const dispatch = useDispatch();

   const message = localStorage.getItem('message');
   console.log('resultMessage=', message);
   console.log('resultIsFormOpen=', isFormOpen);
   console.log('resultIsFormError=', isFormError);
   // useEffect(() => {
   //    localStorage.removeItem('message');
   // })

   const clickCloseRegistration = () => {
      localStorage.removeItem('message');
      dispatch(closeRegistration())
      dispatch(closeModal())
      console.log('removeMessage=', message);
   }
   return (
      <>
         <div className={css.cross}
            // onClick={() => setFormRegistration(!isFormRegistration)}
            onClick={clickCloseRegistration}
         >
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
               <div className={css.message}>{message}</div>
            </>)}
      </>
   )
}
export default RegistrationResult;