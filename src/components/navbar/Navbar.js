import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getModal, getRegistration } from "../../storage/actions/officerActions";
import { closeBurgerMenu, getAuthorization, output } from "../../storage/actions/authActions";
import css from './Navbar.module.css';

const Navbar = ({ active }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const isAuth = useSelector(state => state.auth.isAuth);

   return (
      <div className={active ? css.navbarBurgerMenu : css.navbar}>
         <div></div>
         <nav>
            <ul className={active ? css.navBurgerMenu : css.nav}>
               <li>
                  <Link to={'/'}>
                     <p className={active ? css.linkBurgerMenu : css.link}
                        onClick={() => dispatch(closeBurgerMenu())}>О нас</p>
                  </Link>
               </li>
               <li>
                  <Link to={'/caseform'}>
                     <p className={active ? css.linkBurgerMenu : css.link}
                        onClick={() => dispatch(closeBurgerMenu())}>Сообщить о краже</p>
                  </Link>
               </li>
               {isAuth &&
                  (<>
                     <li>
                        <Link to={'/cases'}>
                           <p className={active ? css.linkBurgerMenu : css.link}
                              onClick={() => dispatch(closeBurgerMenu())}>Сообщения о краже</p>
                        </Link>
                     </li>
                     <li>
                        <Link to={'/officers'}>
                           <p className={active ? css.linkBurgerMenu : css.link}
                              onClick={() => dispatch(closeBurgerMenu())}>Ответственные сотрудники</p>
                        </Link>
                     </li>
                  </>)
               }
            </ul>
         </nav>
         <div className={active ? css.buttonsBurgerMenu : css.buttons}>
            {!isAuth &&
               (<>
                  <button className={active ? css.regBurgerMenu : css.registration} type='button'
                     onClick={() => {
                        dispatch(getModal());
                        dispatch(getRegistration())
                     }}>Регистрация</button>

                  <button className={active ? css.authBurgerMenu : css.authorization} type='button'
                     onClick={() => {
                        dispatch(getModal());
                        dispatch(getAuthorization());
                     }}>Вход</button>
               </>)
            }

            {isAuth &&
               (<>
                  <button className={active ? css.authBurgerMenu : css.authorization} type='button'
                     onClick={() => {
                        dispatch(output());
                        navigate("/");
                        localStorage.removeItem('token')
                     }}>Выход</button>
               </>)
            }
         </div>
      </div>
   )
}
export default Navbar;