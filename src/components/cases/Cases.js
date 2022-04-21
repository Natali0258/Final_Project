import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from '../formElements/button/Button';
import css from './Cases.module.css';

const Cases = (props) => {
   const [checkedDelet, setCheckedDelet] = useState(false);
   const dispatch = useDispatch();
   const cases = useSelector(state => state.cases);
   const { id, status, licenseNumber, type, ownerFullName, clientId, createdAd, updatedAd, color, date, officer, description, resolution } = cases;
   const changeCheckbox = () => {
      setCheckedDelet(checkedDelet => {
         return !checkedDelet
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
               {cases.length && cases.map(caseObj => {
                  return (
                     <tr key={caseObj.id}>
                        <td><Link to={`/cases/${caseObj.id}`} className={css.link}>{caseObj.ownerFullName}</Link></td>
                        <td><Link to={`/cases/${caseObj.id}`} className={css.link}>{caseObj.createdAd}</Link></td>
                        <td><Link to={`/cases/${caseObj.id}`} className={css.link}>{caseObj.date}</Link></td>
                        <td><Link to={`/cases/${caseObj.id}`} className={css.link}>{caseObj.licenseNumber}</Link></td>
                        <td><Link to={`/cases/${caseObj.id}`} className={css.link}>{caseObj.type}</Link></td>
                        <td><Link to={`/cases/${caseObj.id}`} className={css.link}>{caseObj.color}</Link></td>
                        <td><Link to={`/cases/${caseObj.id}`} className={css.link}>{caseObj.pofficer}</Link></td>
                        <td><Link to={`/cases/${caseObj.id}`} className={css.link}>{caseObj.status}</Link></td>
                        <td className={css.delCheck}><input key={caseObj.id} type='checkbox' name={caseObj.id} checked={checkedDelet} onChange={changeCheckbox/*() => dispatch(removeFromCheckedDeletCas(id))*/} /></td>
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