import { useSelector } from 'react-redux';
import css from './RegAndAuthResult.module.css';

const RegAndAuthResult = (props) => {
   const { isFormRegError, isFormAuthError } = props;
   const isAuthResult = useSelector(state => state.auth.isAuthResult)
   const isRegResult = useSelector(state => state.officers.isRegResult)
   const isError = useSelector(state => state.auth.isError)
   const firstName = localStorage.getItem('firstName');
   const message = localStorage.getItem('message');

   return (
      <>
         {isRegResult && !isFormRegError && !isError && !isAuthResult && !isFormAuthError &&
            (<>
               <h3 className={css.title}>Пользователь зарегистрирован!</h3>
               <p className={css.message}>Для авторизации нажмите кнопку ВХОД.</p>
            </>)
         }
         {isFormRegError && !isRegResult && !isError &&
            (<>
               <h3 className={css.title}>ОШИБКА!</h3>
               <div className={css.message}>{message}</div>
            </>)
         }

         {isAuthResult && !isFormAuthError &&
            <h2 className={css.hello}>Добро пожаловать, {firstName}!</h2>
         }
         {!isAuthResult && isFormAuthError &&
            (<>
               <h2 className={css.helloLink}>Неверный логин или пароль!</h2>
               <p className={css.link}>Повторите процедуру авторизации или создайте новую учетную запись.</p>
            </>)
         }

         {isError &&
            (<div >
               <p className={css.error}>Token нет в localStorage, авторизуйтесь</p>
            </div>)
         }
      </>
   )
}
export default RegAndAuthResult;