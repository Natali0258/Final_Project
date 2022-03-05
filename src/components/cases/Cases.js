import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../formElements/button/Button';
import css from './Cases.module.css';

const Cases = (props) => {
   const [checked, setChecked] = useState(false);
   const dispatch = useDispatch();
   const cases = useSelector(state => state.cases);

   const changeCheckbox = () => {
      setChecked(checked => {
         return !checked
      });
   }

   return (
      <div className={css.cases}>
         <div className={css.wrapper}>
            <div className={css.caseBike}></div>
            <h2 className={css.title}>Сообщения о кражах</h2>
            <table className={css.table}>
               <tr className={css.tr}>
                  <th>ФИО пользователя</th>
                  <th>Дата создания сообщения</th>
                  <th>Дата кражи</th>
                  <th>Номер лицензии</th>
                  <th>Тип велосипеда</th>
                  <th>Цвет</th>
                  <th>Ответственный сотрудник</th>
                  <th>Статус сообщения</th>
                  <th>Удалить сообщение</th>
               </tr>
               {cases.map(cas => {
                  return (
                     <tr key={cas.id}>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.ownerFullName}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.createdAd}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.date}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.licenseNumber}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.type}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.color}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.officer}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.status}</Link></td>
                        <td className={css.delCheck}><input key={cas.id} type='checkbox' name={cas.id} checked={checked} onChange={changeCheckbox} /></td>
                     </tr>
                  )
               })
               }
            </table>
            <Button name={'Удалить'} />
         </div>
      </div >
   )
}
export default Cases;