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

   //Запрос для получения всех сообщений о краже (доступен только авторизованным пользователям)
   // const getCases = async (url) => {
   //    const response = await fetch(url);
   //    if (response.status !== 'OK') {
   //       throw new Error(`Ошибка! Код ошибки ${response.errCode}, описание ошибки: ${response.message} `)
   //    }
   //    return await response.json()
   // }
   // getCases('https://sf-final-project.herokuapp.com/api/cases/').then((data) => console.lof(data))

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
               {cases.length && cases.map(cas => {
                  return (
                     <tr key={cas.id}>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.ownerFullName}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.createdAd}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.date}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.licenseNumber}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.type}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.color}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.pofficer}</Link></td>
                        <td><Link to={`/cases/${cas.id}`} className={css.link}>{cas.status}</Link></td>
                        <td className={css.delCheck}><input key={cas.id} type='checkbox' name={cas.id} checked={checkedDelet} onChange={changeCheckbox/*() => dispatch(removeFromCheckedDeletCas(id))*/} /></td>
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