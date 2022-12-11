import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModal, getRegistration } from "../../storage/actions/officerActions";
import { getAuthorization } from "../../storage/actions/authActions";
import Modal from "../modal/Modal";
import logo from '../header/bike-orang.png';
import Registration from "../registration/Registration";
import Authorization from "../authorization/Authorization";
import css from './BurgerMenu.module.css';

const BurgerMenu = ({ active, setActiv }) => {
   const [isBurgerMenu, setIsBurgerMenu] = useState(true);
   //const isLogin = useSelector(state => state.users.isLogin);
   // const [isRegistration, setRegistration] = useState(false);
   // const [isAuth, setAuth] = useState(false);
   const [modalActive, setModalActive] = useState(false); // состояние модального окна 

   const dispatch = useDispatch();
   const isAuth = useSelector(state => state.auth.isAuth)

   const items = [
      {
         name: 'О нас',
         href: '/'
      },
      {
         name: 'Сообщить о краже',
         href: '/caseform'
      },
      {
         name: 'Сообщения о краже',
         href: '/cases'
      },
      {
         name: 'Ответственные сотрудники',
         href: '/officers'
      },
   ]


   return (
      <>
         {isBurgerMenu &&
            (<div className={css.menu} >
               <div className={css.content}>
                  <div className={css.menuTop}>
                     <div className={css.hederLogo}>
                        <img src={logo} className={css.logo} alt="logo" />
                        <p className={css.text}>С ВЕТЕРКОМ</p>
                     </div>
                     <div className={css.close}
                        onClick={() => setIsBurgerMenu(false)}>&#10006;</div>
                  </div>
                  <ul>
                     {items.map(item =>
                        <li className={css.item}><a href={item.href} onClick={() => setActiv(false)}>{item.name}</a></li>
                     )}
                  </ul>

                  <div className={css.buttons}>
                     {!isAuth && <button className={css.registration}
                        onClick={() =>
                        // { setModalActive(true); setRegistration(true) }}
                        {
                           dispatch(getModal());
                           dispatch(getRegistration())
                        }}>Регистрация</button>
                     }

                     <button className={css.authorization}
                        onClick={() =>
                        // { setModalActive(true); setAuth(true) }
                        {
                           dispatch(getModal());
                           dispatch(getAuthorization())
                        }
                        }>Вход</button>
                  </div>

                  {/* <Modal active={modalActive} setActiv={setModalActive}>
                     {isRegistration && <Registration setActiv={setModalActive} />}
                     {isAuth && <Authorization setActiv={setModalActive} />}
                  </Modal> */}

               </div>
            </div>)
         }
      </>
   )
}
export default BurgerMenu;