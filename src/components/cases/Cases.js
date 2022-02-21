import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../formElements/button/Button';
import css from './Cases.module.css';

const Cases = (props) => {
   const { cases } = props;
   const [checked, setChecked] = useState(false);

   const chengeCheckbox = () => {
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
                     <tr>
                        <td><Link to={`/cases/detalcase/${cas.id}`} key={cas.id} className={css.link}>{cas.ownerFullName}</Link></td>
                        <td><Link to={`/cases/detalcase/${cas.id}`} key={cas.id} className={css.link}>{cas.createdAd}</Link></td>
                        <td><Link to={`/cases/detalcase/${cas.id}`} key={cas.id} className={css.link}>{cas.date}</Link></td>
                        <td><Link to={`/cases/detalcase/${cas.id}`} key={cas.id} className={css.link}>{cas.licenseNumber}</Link></td>
                        <td><Link to={`/cases/detalcase/${cas.id}`} key={cas.id} className={css.link}>{cas.type}</Link></td>
                        <td><Link to={`/cases/detalcase/${cas.id}`} key={cas.id} className={css.link}>{cas.color}</Link></td>
                        <td><Link to={`/cases/detalcase/${cas.id}`} key={cas.id} className={css.link}>{cas.officer}</Link></td>
                        <td><Link to={`/cases/detalcase/${cas.id}`} key={cas.id} className={css.link}>{cas.status}</Link></td>
                        <td className={css.delCheck}><input type='checkbox' name='del' onChange={chengeCheckbox} /></td>
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