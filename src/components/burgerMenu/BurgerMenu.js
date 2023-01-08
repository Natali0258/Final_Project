import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeBurgerMenu } from "../../storage/actions/authActions";
import Logo from "../formElements/logo/Logo";
import css from './BurgerMenu.module.css';
import Navbar from "../navbar/Navbar";

const BurgerMenu = () => {
   const [isNavbarActive, setNavbarActiv] = useState(true)
   const dispatch = useDispatch();
   const isBurgerMenu = useSelector(state => state.auth.isBurgerMenu)

   return (
      <>
         {isBurgerMenu &&
            (<div className={css.menu} >
               <div className={css.content}>
                  <div className={css.menuTop}>
                     <Logo />
                     <div className={css.close}
                        onClick={() => {
                           dispatch(closeBurgerMenu())
                           setNavbarActiv(false)
                        }}>&#10006;
                     </div>
                  </div>
                  <Navbar active={isNavbarActive} />
               </div>
            </div>)
         }
      </>
   )
}
export default BurgerMenu;