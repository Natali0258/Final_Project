import React from 'react';
import { Link } from 'react-router-dom';
import css from './Footer.module.css';
import Logo from '../formElements/logo/Logo';
import facebook from '../../images/footer/icon-facebook.png';
import twitter from '../../images/footer/icon-twitter.png';
import instagram from '../../images/footer/icon-instagram.png';

const Footer = () => {
   return (
      <footer className={css.footer}>
         <div className={css.wrapper}>
            <Logo />
            <div className={css.container}>
               <nav className={css.nav}>
                  <Link to={'/'}><a href='#' className={css.link}>О нас</a></Link>
                  <Link to={'/caseform'}><a href='#' className={css.link}>Сообщить о краже</a></Link>
                  <Link to={'/cases'}><a href='#' className={css.link}>Сообщения о краже</a></Link>
                  <Link to={'/officers'}><a href='#' className={css.link}>Ответственные сотрудники</a></Link>
               </nav>
               <div className={css.contacts}>
                  <p>+7(913)333-33-33</p>
                  <div className={css.socialNetwork}>
                     <a href='' target='_blank' rel='nofollow' title='Это учебный сайт, поэтому ссылка на соц.сети отсутствует'><img src={instagram} className={css.instagram} alt="логотип instagram"></img></a>
                     <a href='' target='_blank' rel='nofollow' title='Это учебный сайт, поэтому ссылка на соц.сети отсутствует'><img src={facebook} className={css.facebook} alt="логотип facebook"></img></a>
                     <a href='' target='_blank' rel='nofollow' title='Это учебный сайт, поэтому ссылка на соц.сети отсутствует'><img src={twitter} className={css.twitter} alt="логотип twitter"></img></a>
                  </div>
               </div>
               <div></div>
            </div>
            <div></div>
         </div>
      </footer >
   )
}
export default Footer; 