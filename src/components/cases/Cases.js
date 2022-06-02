import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fatchTokenValidityStarted, fatchTokenValiditySuccess, fatchTokenValidityError } from '../../storage/actions/officerActions';
import { fatchCasesGetStarted, fatchCasesGetSuccess, fatchCasesGetError } from '../../storage/actions/casesActions';
import { fatchCaseRemoveStarted, fatchCaseRemoveSuccess, fatchCaseRemoveError } from '../../storage/actions/casesActions';
import { fatchOfficersGetStarted, fatchOfficersGetSuccess, fatchOfficersGetError } from '../../storage/actions/officerActions';
import Button from '../formElements/button/Button';
import css from './Cases.module.css';

const Cases = (props) => {
   const [checkedDelet, setCheckedDelet] = useState(false);
   const dispatch = useDispatch();
   const cases = useSelector(state => state.cases);
   const officers = useSelector(state => state.officers);
   const { id, status, licenseNumber, type, ownerFullName, clientId, createdAd, updatedAd, color, date, officer, description, resolution } = cases;

   useEffect(async () => {

      const token = localStorage.getItem('token');
      console.log('token=', token);

      if (token) {
         //GET Запрос для проверки валидности токена.
         dispatch(fatchTokenValidityStarted());
         await fetch('https://sf-final-project.herokuapp.com/api/auth/',
            { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
               if (response.status !== 200) {
                  return Promise.reject(new Error(response.status))
               }
               return Promise.resolve(response)
            })
            .then((response) => { return response.json(); })
            .then((data) => {
               console.log("data=", data);
               dispatch(fatchTokenValiditySuccess(data))
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchTokenValidityError(error))
            })

         //Запрос для получения всех сообщений о краже   
         dispatch(fatchCasesGetStarted());
         await fetch('https://sf-final-project.herokuapp.com/api/cases/',
            {
               headers: {
                  "Content-type": "application/json",
                  "Authorization": `Bearer ${token}`
               }
            })
            .then((response) => {
               console.log(response);
               if (response.status !== 200) {
                  return Promise.reject(new Error(response.status))
               }
               return Promise.resolve(response)
            })
            .then((response) => { return response.json(); })
            .then((data) => {
               console.log("data=", data);
               dispatch(fatchCasesGetSuccess(data.data))
               console.log('cases=', cases);
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchCasesGetError(error))
            })

         console.log('cases=', cases);

         //GET Запрос для получения списка всех сотрудников (доступен только авторизованным пользователям):
         dispatch(fatchOfficersGetStarted());
         await fetch('https://sf-final-project.herokuapp.com/api/officers/',
            {
               headers: {
                  "Content-type": "application/json",
                  "Authorization": `Bearer ${token}`
               }
            })
            .then((response) => {
               console.log(response);
               if (response.status !== 200) {
                  return Promise.reject(new Error(response.status))
               }
               return Promise.resolve(response)
            })
            .then((response) => { return response.json(); })
            .then((data) => {
               console.log("data=", data);
               dispatch(fatchOfficersGetSuccess(data.officers))
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchOfficersGetError(error))
            })

      } else {
         console.log('token нет в localStorage, авторизуйтесь')
      }
   }, [dispatch])

   function getOfficersName(officers) {
      const approvedOfficers = officers.officers.map(officer => {
         if (officer.approved) {
            return officer;
         }
      })
      console.log('approvedOfficers=', approvedOfficers);

      const filterOfficers = approvedOfficers.filter(officer => {
         return officer;
      })
      console.log('filterOfficers=', filterOfficers);

      let officersName = {};
      filterOfficers.map(officer => {
         return officersName[`${officer._id}`] = `${officer.lastName} ${officer.firstName}`;
      })
      console.log('officersName=', officersName);
      return officersName;
   }
   const officersName = getOfficersName(officers);
   console.log('officersName1=', officersName);

   const handleDelete = async (caseObj) => {
      console.log('caseObj=', caseObj, caseObj._id)
      const token = localStorage.getItem('token');
      console.log('token=', token);

      if (token) {
         //GET Запрос для проверки валидности токена.
         dispatch(fatchTokenValidityStarted());
         await fetch('https://sf-final-project.herokuapp.com/api/auth/',
            { headers: { "Authorization": `Bearer ${token}` } })
            .then((response) => {
               if (response.status !== 200) {
                  return Promise.reject(new Error(response.status))
               }
               return Promise.resolve(response)
            })
            .then((response) => { return response.json(); })
            .then((data) => {
               console.log("data=", data);
               dispatch(fatchTokenValiditySuccess(data))
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchTokenValidityError(error))
            })
         //DEL Запрос для удаления сообщения о краже (доступен только авторизованным пользователям):
         const options = {
            method: 'DELETE',
            headers: {
               "Content-Type": "application/json; charset=utf-8",
               "Authorization": `Bearer ${token}`
            }
         }
         const caseId = caseObj._id;
         //console.log('caseId=', caseId);
         dispatch(fatchCaseRemoveStarted());
         await fetch(`https://sf-final-project.herokuapp.com/api/cases/${caseId}`, options)
            .then((response) => {
               console.log(response);
               if (response.status !== 200) {
                  return Promise.reject(new Error(response.status))
               }
               return Promise.resolve(response)
            })
            .then((response) => { return response.json(); })
            .then((data) => {
               console.log("data=", data);
               dispatch(fatchCaseRemoveSuccess(caseObj._id))
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchCaseRemoveError(error))
            })
         console.log('cases=', cases);
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
                              <td><Link to={`/cases/${caseObj._id}`} className={css.link}>{caseObj.createdAd}</Link></td>
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

// сonst officer= officers.find(officer=>officer._id===caseObj.officer) {`${officer.lastName} ${officer.firstName} `}
