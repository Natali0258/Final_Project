import React from 'react';
import { Link } from 'react-router-dom';
import css from './Officers.module.css';

const Officers = (props) => {
   const { officers } = props;

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
                  {officers.map(officer => {
                     return (<>
                        <div><Link to="/officers/detalofficer/:officerId">{officer.lastName}</Link></div>
                        <div><Link to="/officers/detalofficer/:officerId">{officer.firstName}</Link></div>
                        <div><Link to="/officers/detalofficer/:officerId">{officer.email}</Link></div>
                        <div><Link to="/officers/detalofficer/:officerId">{officer.approved ? 'одобрен' : ''}</Link></div>
                        <div><input className={css.delCheck} type='checkbox' name='del'></input></div>
                     </>)
                  })}

               </div>
               <button className={css.btn}>Удалить</button>
            </div>
         </div>
      </div>
   )
}
export default Officers;