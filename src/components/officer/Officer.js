import React from 'react';
import css from './Officer.module.css';

const Officer = (props) => {
   return (
      <div className={css.officer}>
         <div className={css.wrapper}>
            <div className={css.imgOfficer}></div>
            <div className={css.border}>
               <p className={css.title}>Ответственные сотрудники</p>
               <div className={css.container}>
                  <div className={css.lastName}>Фамилия сотрудника</div>
                  <div className={css.firstName}>Имя сотрудника</div>
                  <div className={css.email}>E-mail адрес сотрудника</div>
                  <div className={css.approved}>Статус сотрудника</div>
                  <div className={css.del}>удалить</div>
                  <div>Сидоров</div>
                  <div>Петр</div>
                  <div>123@mail.ru</div>
                  <div>одобрен</div>
                  <div><input className={css.delCheck} type='checkbox' name='del'></input></div>
               </div>
               <button className={css.btn}>Удалить</button>
            </div>
         </div>
      </div>
   )
}
export default Officer;