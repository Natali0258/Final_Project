import css from './Logo.module.css';
import logo from '../../../images/bike-orang.png';

const Logo = () => {
   return (
      <div className={css.wrap}>
         <img src={logo} className={css.logo} alt="logo" />
         <p className={css.text}>С ВЕТЕРКОМ</p>
      </div>
   )
}
export default Logo;