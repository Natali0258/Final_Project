import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fatchTokenValidityStarted, fatchTokenValiditySuccess, fatchTokenValidityError } from '../../storage/actions/officerActions';
import { fatchOfficerRemoveStarted, fatchOfficerRemoveSuccess, fatchOfficerRemoveError } from '../../storage/actions/officerActions';
import Button from '../formElements/button/Button';
import css from './OfficersTable.module.css';

const OfficersTable = (props) => {
   const { checked, setChecked } = props;
   const params = useParams();
   // const { officerId } = params;
   const dispatch = useDispatch();
   const officers = useSelector(state => state.officers);
   const isLoading = useSelector(state => state.isLoading);

   const handleDelete = async (officer) => {
      console.log('officer=', officer, officer._id)
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
         //DEL Запрос для удаления данных сотрудника (доступен только авторизованным пользователям):
         const options = {
            method: 'DELETE',
            headers: {
               "Content-Type": "application/json; charset=utf-8",
               "Authorization": `Bearer ${token}`
            }
         }
         dispatch(fatchOfficerRemoveStarted());
         const officerId = officer._id;
         console.log('officerId=', officerId)
         await fetch(`https://sf-final-project.herokuapp.com/api/officers/${officerId}`, options)
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
               dispatch(fatchOfficerRemoveSuccess(officer._id))
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchOfficerRemoveError(error))
            })

      } else {
         console.log('token нет в localStorage, авторизуйтесь')
      }
   }

   return (
      <table>
         <thead className={css.thead}>
            <tr className={css.th}>
               <th className={css.lastName}>Фамилия сотрудника</th>
               <th className={css.firstName}>Имя сотрудника</th>
               <th className={css.email}>E-mail адрес сотрудника</th>
               <th className={css.approved}>Статус сотрудника</th>
               <th className={css.del}>удалить</th>
            </tr>
         </thead>
         <tbody className={css.tbody}>
            {officers.officers.length && officers.officers.map(officer => (
               <tr className={css.tr} key={officer._id} >
                  <td className={css.lastName}><Link to={`/officers/${officer._id}`}>{officer.lastName}</Link></td>
                  <td className={css.firstName}><Link to={`/officers/${officer._id}`}>{officer.firstName}</Link></td>
                  <td className={css.email}><Link to={`/officers/${officer._id}`}>{officer.email}</Link></td>
                  <td className={css.approved}><Link to={`/officers/${officer._id}`}>{officer.approved ? 'одобрен' : ''}</Link></td>
                  <td className={css.del}>
                     <Button type={'button'}
                        name={'удалить'}
                        style={{ fontSize: "18px", padding: "4px", lineHeight: "100%" }}
                        onClick={() => handleDelete(officer)} />
                  </td>
               </tr>
            ))}
         </tbody>
      </table>)
}
export default OfficersTable;