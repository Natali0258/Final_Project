import React from 'react';
import { useState } from 'react';
import logo from './bike-orang.png';
import Button from '../formElements/button';
import css from './Header.module.css';
import Authorization from '../authorization/Authorization';
import Registration from '../registration/Registration';
import AuthorizationResult from '../authorizationResult/AuthorizationResult';

const Header = (props) => {
   const { isLogged, loggedUser, addNewOfficer, ref } = props;

   const [isResult, setResultat] = useState(false);//результат отправки пароля (true-пользователь существует)

   console.log('isLogged=', isLogged);
   console.log('isResult in Header=', isResult);
   const [isFormAuthorization, setFormAuthorization] = useState(false);
   const [isFormRegistration, setFormRegistration] = useState(false);

   const handleClickAuthorization = () => {
      //event.preventDeflt();
      console.log('Entry');
      setFormAuthorization(!isFormAuthorization);
      console.log('isFormAuthorization=', isFormAuthorization);
   }

   const handleClickRegistration = () => {
      console.log('Registration');
      setFormRegistration(!isFormRegistration);
      console.log('Регистрация');
   }

   return (
      <header className={css.header}>
         <div className={css.wrapper}>
            <div className={css.hederLogo}>
               <img src={logo} className={css.logo} alt="logo" />
               <p className={css.text}>С ВЕТЕРКОМ</p>
            </div>
            {isLogged ?
               (<nav className={css.nav}>
                  <a href='#' className={css.link}>О нас</a>
                  <a href='#' className={css.link}>Сообщить о краже</a>
                  <a href='#' className={css.link}>Сообщения о краже</a>
                  <a href='#' className={css.link}>Ответственные сотрудники</a>
               </nav>) :
               (<nav className={css.nav}>
                  <a href='#' className={css.link}>О нас</a>
                  <a href='#' className={css.link}>Сообщить о краже</a>
               </nav>)
            }

            <div className={css.button}>
               {!isFormRegistration &&
                  (<button className={css.registration} type='button' onClick={handleClickRegistration}>Регистрация</button>)
               }
               {isFormRegistration &&
                  (<>
                     <button className={css.registration} type='button' onClick={handleClickRegistration}>Регистрация</button>
                     < Registration addNewOfficer={addNewOfficer}
                        isFormRegistration={isFormRegistration}
                        setFormRegistration={setFormRegistration}
                        ref={ref} />
                  </>)
               }

               {!isFormAuthorization &&
                  (<button className={css.authorization} type='button' onClick={handleClickAuthorization}>Вход</button>)
               }
               {isFormAuthorization && !isResult &&
                  (<>
                     <button className={css.authorization} type='button' onClick={handleClickAuthorization}>{isLogged ? 'Вход' : 'Выход'}</button>
                     < Authorization isResult={isResult} setResultat={setResultat} />
                  </>)
               }
               {isFormAuthorization && isResult &&
                  (<>
                     <button className={css.authorization} type='button' onClick={handleClickAuthorization}>{isLogged ? 'Вход' : 'Выход'}</button>
                     < AuthorizationResult isLogged={isLogged} loggedUser={loggedUser} />
                  </>)
               }
            </div>
         </div>
      </header >)
}
export default Header;