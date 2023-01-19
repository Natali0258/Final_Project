import React, { useState } from 'react';
import css from './Footer.module.css';
import facebook from '../../images/footer/icon-facebook.png';
import twitter from '../../images/footer/icon-twitter.png';
import instagram from '../../images/footer/icon-instagram.png';

const Footer = () => {
   const [show, setShow] = useState(false)
   const socialNetwork = [instagram, facebook, twitter]
   return (
      <footer className={css.footer}>
         <div className={css.wrapper}>
            <div className={css.contacts}>
               <p>+7(913)333-33-33</p>
               <div className={css.socialNetwork}>
                  {socialNetwork.map(item =>
                     <button
                        type="button"
                        className={css.link_button}
                        title='Это учебный сайт, поэтому ссылка на соц.сети отсутствует'
                        onClick={() => setShow(!show)}>
                        <img src={item} className={css.item} alt="логотип instagram" />
                     </button>
                  )}
               </div>
            </div>
         </div>
      </footer >
   )
}
export default Footer; 