import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './bike-orang.png';
import Button from '../formElements/button';
import css from './Header.module.css';
import Authorization from '../authorization/Authorization';
import Registration from '../registration/Registration';

const Header = (props) => {
   //const { isLogged, loggedOfficer } = props;
   const [isLogged, setLogged] = useState(false);
   const [isResult, setResult] = useState(false);
   const [isFormAuthorization, setFormAuthorization] = useState(false);
   const [isFormRegistration, setFormRegistration] = useState(false);

   const navigate = useNavigate();

   const handleClickRegistration = () => {
      setFormRegistration(!isFormRegistration);
      console.log('Header1', 'isFormRegistration=', isFormRegistration);
      console.log('Header1', 'isLogged=', isLogged);
   }
   //при клике по кнопке ВХОД появляется форма авторизации:
   const handleClickAuthorization = () => {
      // window.location.assign('http://localhost:3000/');
      setFormAuthorization(!isFormAuthorization);
      console.log('Header2', 'isFormAuthorization=', isFormAuthorization);
      console.log('Header2', 'isLogged=', isLogged);
   }

   const handleClickEntry = () => {
      setLogged(false);
      setFormAuthorization(false);
      console.log('Header3', 'isFormAuthorization=', isFormAuthorization);
      console.log('Header3', 'isLogged=', isLogged);
   }
   //при клике по кнопке формы ВЫХОД происходит выход из учетной записи,
   //в меню отключаются ссылки "Сообщения о краже" и "Ответственные сотрудники"
   const handleClickOutput = () => {
      setLogged(false);
      setFormAuthorization(false);
      console.log('Header4', 'isFormAuthorization=', isFormAuthorization);
      console.log('Header4', 'isLogged=', isLogged);
      navigate("/");
      //window.location.assign('http://localhost:3000/');
   }

   return (
      <header className={css.header}>
         <div className={css.wrapper}>
            <div className={css.hederLogo}>
               <img src={logo} className={css.logo} alt="logo" />
               <p className={css.text}>С ВЕТЕРКОМ</p>
            </div>
            <nav>
               <ul className={css.nav}>
                  <li>
                     <Link to={'/'}>
                        <p className={css.link}>О нас</p>
                     </Link>
                  </li>
                  <li>
                     <Link to={'/caseform'}>
                        <p className={css.link}>Сообщить о краже</p>
                     </Link>
                  </li>
                  {isLogged &&
                     (<>
                        <li>
                           <Link to={'/cases'}>
                              <p className={css.link}>Сообщения о краже</p>
                           </Link>
                        </li>
                        <li>
                           <Link to={'/officers'}>
                              <p className={css.link}>Ответственные сотрудники</p>
                           </Link>
                        </li>
                     </>)
                  }
               </ul>
            </nav>

            <div className={css.button}>
               <button className={css.registration} type='button' onClick={handleClickRegistration}>Регистрация</button>

               {isFormRegistration &&
                  (<>
                     < Registration
                        isFormRegistration={isFormRegistration}
                        setFormRegistration={setFormRegistration} />
                  </>)
               }

               {!isFormAuthorization && !isLogged &&
                  (<button className={css.authorization}
                     type='button' onClick={handleClickAuthorization}>
                     {'Вход'}
                  </button>)
               }
               {isFormAuthorization &&
                  (<>
                     <button className={css.authorization}
                        type='button'
                        onClick={handleClickEntry}>
                        {isLogged ? 'Выход' : 'Вход'}
                     </button>
                     < Authorization
                        isLogged={isLogged} setLogged={setLogged}
                        isResult={isResult} setResult={setResult}
                        isFormAuthorization={isFormAuthorization}
                        setFormAuthorization={setFormAuthorization} />
                  </>)
               }
               {isLogged && !isFormAuthorization && isResult &&
                  (<>
                     <button className={css.authorization} type='button' onClick={handleClickOutput}>
                        {'Выход'}
                     </button>
                  </>)
               }
            </div>
         </div>
      </header >)
}
export default Header;