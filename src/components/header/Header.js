import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './bike-orang.png';
import Button from '../formElements/button';
import css from './Header.module.css';
import Authorization from '../authorization/Authorization';
import Registration from '../registration/Registration';
import AuthorizationResult from '../authorizationResult/AuthorizationResult';

const Header = (props) => {
   const { isLogged, loggedOfficer, addNewOfficer } = props;

   const [isResult, setResultat] = useState(false);//результат отправки пароля (true-пользователь существует)

   const [isFormAuthorization, setFormAuthorization] = useState(false);
   const [isFormRegistration, setFormRegistration] = useState(false);

   const handleClickAuthorization = () => {
      setFormAuthorization(!isFormAuthorization);
   }

   const handleClickRegistration = () => {
      setFormRegistration(!isFormRegistration);
   }

   return (
      <header className={css.header}>
         <div className={css.wrapper}>
            <div className={css.hederLogo}>
               <img src={logo} className={css.logo} alt="logo" />
               <p className={css.text}>С ВЕТЕРКОМ</p>
            </div>
            {isLogged ?
               (<nav>
                  <ul className={css.nav}>
                     <li><Link to={'/'}><p className={css.link}>О нас</p></Link></li>
                     <li><Link to={'/caseform'}><p className={css.link}>Сообщить о краже</p></Link></li>
                     <li><Link to={'/cases'}><p className={css.link}>Сообщения о краже</p></Link></li>
                     <li><Link to={'/officers'}><p className={css.link} addNewOfficer={addNewOfficer}>Ответственные сотрудники</p></Link></li>
                  </ul>
               </nav>) :
               (<nav>
                  <ul className={css.nav}>
                     <li><a href='#' className={css.link}>О нас</a></li>
                     <li><a href='#' className={css.link}>Сообщить о краже</a></li>
                  </ul>
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
                        setFormRegistration={setFormRegistration} />
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
                     < AuthorizationResult isLogged={isLogged} loggedUser={loggedOfficer} />
                  </>)
               }
            </div>
         </div>
      </header >)
}
export default Header;