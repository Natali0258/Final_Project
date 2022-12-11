import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
import { createRequest } from '../../fetch/createRequest';
import { fetchRequest } from '../../fetch/fetchRequest';
import { fetchTokenValidityStarted, fetchTokenValiditySuccess, fetchTokenValidityError } from '../../storage/actions/officerActions';
import { fetchCasesGetStarted, fetchCasesGetSuccess, fetchCasesGetError } from '../../storage/actions/casesActions';
import { fetchCaseRemoveStarted, fetchCaseRemoveSuccess, fetchCaseRemoveError } from '../../storage/actions/casesActions';
import { fetchOfficersGetStarted, fetchOfficersGetSuccess, fetchOfficersGetError } from '../../storage/actions/officerActions';
import { getOfficersName } from '../getOfficersName';
import Button from '../formElements/button/Button';
import css from './Cases.module.css';

const Cases = (props) => {
   // const [checkedDelet, setCheckedDelet] = useState(false);
   const dispatch = useDispatch();
   const cases = useSelector(state => state.cases);
   const officers = useSelector(state => state.officers);
   // const { id, status, licenseNumber, type, ownerFullName, clientId, createdAd, updatedAd, color, date, officer, description, resolution } = cases;

   useEffect(() => {
      async function fetchData() {

         const token = localStorage.getItem('token');
         console.log('token=', token);

         if (token) {
            //GET Запрос для проверки валидности токена.
            dispatch(fetchTokenValidityStarted());
            await createRequest('auth/', 'GET', true, dispatch, fetchTokenValiditySuccess, fetchTokenValidityError)

            //Запрос для получения всех сообщений о краже   
            dispatch(fetchCasesGetStarted());
            console.log('запрос всех сообщений о краже')
            await createRequest('cases/', 'GET', true, dispatch, fetchCasesGetSuccess, fetchCasesGetError)

            //GET Запрос для получения списка всех сотрудников (доступен только авторизованным пользователям):
            dispatch(fetchOfficersGetStarted());
            console.log('запрос списка всех сотрудников')
            await createRequest('officers/', 'GET', true, dispatch, fetchOfficersGetSuccess, fetchOfficersGetError)

         } else {
            console.log('token нет в localStorage, авторизуйтесь')
         }
      }
      fetchData();
   }, [dispatch])

   //Получим список сотрудников со статусом "одобрен":
   const officersName = getOfficersName(officers);

   const handleDelete = async (caseObj) => {
      const token = localStorage.getItem('token');

      if (token) {
         //GET Запрос для проверки валидности токена.
         dispatch(fetchTokenValidityStarted());
         await createRequest('auth/', 'GET', true, dispatch, fetchTokenValiditySuccess, fetchTokenValidityError)

         const caseId = caseObj._id;

         dispatch(fetchCaseRemoveStarted());
         await fetchRequest(`cases/${caseId}`, 'DELETE', true, dispatch, fetchCaseRemoveSuccess, fetchCaseRemoveError, caseObj._id)

      } else {
         console.log('token нет в localStorage, авторизуйтесь')
      }
   }

   return (
      <div className={css.cases}>
         <div className={css.wrapper}>
            <div className={css.caseBike}></div>
            <h2 className={css.title}>Сообщения о кражах</h2>
            <table className={css.table}>
               <thead className={css.thead}>
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
               </thead>
               <tbody className={css.tbody}>
                  {
                     cases.cases.length && cases.cases.map(caseObj => {
                        return (
                           <tr key={caseObj._id}>
                              <td><Link to={`/cases/${caseObj._id}`} className={css.link}>{caseObj.ownerFullName}</Link></td>
                              <td><Link to={`/cases/${caseObj._id}`} className={css.link}>{caseObj.createdAt}</Link></td>
                              <td><Link to={`/cases/${caseObj._id}`} className={css.link}>{caseObj.date}</Link></td>
                              <td><Link to={`/cases/${caseObj._id}`} className={css.link}>{caseObj.licenseNumber}</Link></td>
                              <td><Link to={`/cases/${caseObj._id}`} className={css.link}>{caseObj.type}</Link></td>
                              <td><Link to={`/cases/${caseObj._id}`} className={css.link}>{caseObj.color}</Link></td>
                              <td><Link to={`/cases/${caseObj._id}`} className={css.link}>{officersName[caseObj.officer]}</Link></td>
                              <td><Link to={`/cases/${caseObj._id}`} className={css.link}>{caseObj.status}</Link></td>
                              <td className={css.del}>
                                 <Button type={'button'}
                                    name={'удалить'}
                                    style={{ fontSize: "18px", padding: "5px 10px 6px", lineHeight: "100%" }}
                                    onClick={() => handleDelete(caseObj)} /></td>
                           </tr>
                        )
                     })
                  }
               </tbody>
            </table>
         </div>
      </div >
   )
}
export default Cases;