import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { fatchTokenValidityStarted, fatchTokenValiditySuccess, fatchTokenValidityError } from '../../storage/actions/officerActions';
import { fatchOfficersGetStarted, fatchOfficersGetSuccess, fatchOfficersGetError } from '../../storage/actions/officerActions';
//import { tokenValidityCheck } from '../../func/tokenValidityCheck';
import OfficersTable from '../officersTable/OfficersTable';
import Loader from '../loader/Loader';
import css from './Officers.module.css';
import Registration from '../registration/Registration';

const Officers = () => {
   const [checked, setChecked] = useState(false);

   const dispatch = useDispatch();
   const officers = useSelector(state => state.officers);
   const isLoading = useSelector(state => state.isLoading);

   useEffect(async () => {
      // localStorage.removeItem('token');
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
         //GET Запрос для получения списка всех сотрудников (доступен только авторизованным пользователям):
         dispatch(fatchOfficersGetStarted());
         await fetch('https://sf-final-project.herokuapp.com/api/officers/',
            { headers: { "Authorization": `Bearer ${token}` } })
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

   return (
      <div className={css.officers}>
         <div className={css.wrapper}>
            <div className={css.imgOfficer}></div>
            <div className={css.border}>
               <h3 className={css.title}>Ответственные сотрудники</h3>
               {isLoading ?
                  <Loader /> :
                  <OfficersTable
                     checked={checked}
                     setChecked={setChecked}
                     officers={officers} />
               }
            </div>
         </div>
      </div >
   )
}
export default Officers;

 // const getRequestToken = () => {
         //    return new Promise((resolve, reject) => {
         //       //Запрос для проверки валидности токена
         //       dispatch(fatchTokenValidityStarted());
         //       fetch('https://sf-final-project.herokuapp.com/api/auth/',
         //          { headers: { "Authorization": `Bearer ${token}` } })
         //          .then(response => {
         //             if (response.status < 400) {
         //                return response.json()
         //             } else {
         //                throw response;
         //             }
         //          }).then((data) => {
         //             resolve(data);
         //             dispatch(fatchTokenValiditySuccess(data))
         //          }).catch(response => {
         //             response.json().then(error => {
         //                reject(error);
         //                dispatch(fatchTokenValidityError(error))
         //             })
         //          })
         //    })
         // }
         // const getRequestOfficers = () => {
         //    return new Promise((resolve, reject) => {
         //       //GET Запрос для получения списка всех сотрудников (доступен только авторизованным пользователям):
         //       dispatch(fatchOfficersGetStarted());
         //       fetch('https://sf-final-project.herokuapp.com/api/officers/',
         //          { headers: { "Authorization": `Bearer ${token}` } })
         //          .then(response => {
         //             if (response.status < 400) {
         //                return response.json()
         //             } else {
         //                throw response;
         //             }
         //          }).then((data) => {
         //             resolve(data);
         //             dispatch(fatchOfficersGetSuccess(data))
         //          }).catch(response => {
         //             response.json().then(error => {
         //                reject(error);
         //                dispatch(fatchOfficersGetError(error))
         //             })
         //          })
         //    })
         // }
         // getRequestToken()
         //    .then(data => {
         //       return getRequestOfficers()
         //    })
         //    .then(data => {
         //       console.log("success=", data)
         //    })
         //    .catch(error => {
         //       console.log('error=', error)
         //    })