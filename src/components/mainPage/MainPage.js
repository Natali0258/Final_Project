import React from 'react';
import mainPage from './main-page.jpg';
import css from './MainPage.module.css';

const MainPage = (pops) => {
   return (
      <div className={css.mainPage}>
         <div className={css.wrapper}>
            <div className={css.mainImage}></div>
            <div className={css.left}>
               <p className={css.text}>
                  <em className={css.em}>Прокат велосипедов</em>— это доступный, удобный и недорогой сервис. Перемещаться на велосипеде удобно, быстро и полезно для здоровья. Однако участились случаи кражи велосипедов. Для решения этой проблемы наша компания ведет учет этих случаев. На сайте в разделе “СООБЩИТЬ О КРАЖЕ” можно без регистрации оставить информацию о новом случае кражи велосипеда.
               </p>
            </div>
            <div className={css.right}></div>

         </div>


      </div>
   )
}
export default MainPage;