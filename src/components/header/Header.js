import { getBurgerMenu } from '../../storage/actions/authActions';
import Logo from '../formElements/logo/Logo';
import Navbar from '../navbar/Navbar';
import css from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import BurgerMenu from '../burgerMenu/BurgerMenu';

const Header = () => {
   const dispatch = useDispatch();
   const isBurgerMenu = useSelector(state => state.auth.isBurgerMenu)

   return (
      <header className={css.header}>
         <div className={css.wrapper}>
            <Logo />
            <Navbar />
            <nav className={css.burgerMenu}>
               <div className={css.burgerButton} onClick={() => dispatch(getBurgerMenu())} >
                  <span />
               </div>
               {isBurgerMenu && <BurgerMenu />}
            </nav>
         </div>
      </header >)
}
export default Header;