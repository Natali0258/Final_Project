import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getModal, getRegistration } from '../../storage/actions/officerActions';
import { getAuthorization, getBurgerMenu, output } from '../../storage/actions/authActions';
import logo from './bike-orang.png';
import Button from '../formElements/button';
import css from './Header.module.css';
import Authorization from '../authorization/Authorization';
import Registration from '../registration/Registration';
import { useDispatch, useSelector } from 'react-redux';
import BurgerMenu from '../burgerMenu/BurgerMenu';

const Header = (props) => {
   //const { isLogged, loggedOfficer } = props;
   // const [isLogged, setLogged] = useState(false);
   //const [isResult, setResult] = useState(false);
   const [isFormAuthorization, setFormAuthorization] = useState(false);
   // const [isFormRegistration, setFormRegistration] = useState(false);

   //const [activ, setActiv] = useState(false);

   const dispatch = useDispatch();
   const isModalActive = useSelector(state => state.officers.isModalActive)
   const isBurgerMenu = useSelector(state => state.auth.isBurgerMenu)
   // const isLogged = useSelector(state => state.auth.isLogged)
   const navigate = useNavigate();
   const isAuth = useSelector(state => state.auth.isAuth)

   const handleClickRegistration = () => {
      // setFormRegistration(!isFormRegistration);
      console.log('вызов модального окна и окна регистрации')
      dispatch(getModal());
      dispatch(getRegistration());
   }

   const handleClickAuthorization = () => {
      //setFormAuthorization(!isFormAuthorization);
      console.log('вызов модального окна и окна авторизации')
      dispatch(getModal());
      dispatch(getAuthorization());
   }

   const handleClickEntry = () => {
      //setLogged(false);
      setFormAuthorization(false);
      console.log('Header3', 'isFormAuthorization=', isFormAuthorization);
      // console.log('Header3', 'isLogged=', isLogged);
   }
   //при клике по кнопке формы ВЫХОД происходит выход из учетной записи,
   //в меню отключаются ссылки "Сообщения о краже" и "Ответственные сотрудники"
   const handleClickOutput = () => {
      //setLogged(false);
      //setFormAuthorization(false);
      dispatch(output())
      navigate("/");
      //window.location.assign('http://localhost:3000/');
      localStorage.removeItem('token')
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
                  {isAuth &&
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
               {!isAuth &&
                  <button className={css.registration} type='button'
                     onClick={handleClickRegistration}>Регистрация</button>
               }
               {/* {isFormRegistration && !isLogged &&
                  (<>
                     < Registration
                        isFormRegistration={isFormRegistration}
                        setFormRegistration={setFormRegistration}
                     />
                  </>)
               } */}

               {/* {!isFormAuthorization && !isLogged && */}
               {!isAuth &&
                  (<button className={css.authorization} type='button'
                     onClick={handleClickAuthorization}>{isAuth ? 'Выход' : 'Вход'}</button>)
               }
               {/* {isFormAuthorization &&
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
               } */}
               {isAuth && !isFormAuthorization &&
                  // isResult &&
                  (<>
                     <button className={css.authorization} type='button' onClick={handleClickOutput}>
                        {'Выход'}
                     </button>
                  </>)
               }
            </div>
            <nav className={css.burgerMenu}>
               {/* <div className={css.burgerButton} onClick={() => setActiv(!activ)} > */}
               <div className={css.burgerButton} onClick={() => dispatch(getBurgerMenu())} >
                  <span />
               </div>
               {/* {activ && <BurgerMenu activ={activ} setActiv={setActiv} />} */}
               {isBurgerMenu && <BurgerMenu />}
            </nav>
         </div>
      </header >)
}
export default Header;