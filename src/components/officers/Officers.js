import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchTokenValidityStarted, fetchTokenValiditySuccess, fetchTokenValidityError } from '../../storage/actions/officerActions';
import { getModal, fetchOfficersGetStarted, fetchOfficersGetSuccess, fetchOfficersGetError } from '../../storage/actions/officerActions';
import { tokenError } from '../../storage/actions/authActions';
import { createRequest } from '../../fetch/createRequest';
import OfficersTable from '../officersTable/OfficersTable';
import Loader from '../loader/Loader';
import css from './Officers.module.css';

const Officers = () => {
   const [checked, setChecked] = useState(false);

   const dispatch = useDispatch();
   const officers = useSelector(state => state.officers);
   const isLoading = useSelector(state => state.isLoading);

   useEffect(() => {
      async function fetchData() {
         const token = localStorage.getItem('token');
         if (token) {
            //GET Запрос для проверки валидности токена.
            dispatch(fetchTokenValidityStarted());
            await createRequest('auth/', 'GET', true, dispatch, fetchTokenValiditySuccess, fetchTokenValidityError)

            //GET Запрос для получения списка всех сотрудников (доступен только авторизованным пользователям):
            dispatch(fetchOfficersGetStarted());
            await createRequest('officers/', 'GET', true, dispatch, fetchOfficersGetSuccess, fetchOfficersGetError)

         } else {
            //вывод сообщения "Token нет в localStorage, авторизуйтесь"
            dispatch(getModal())
            dispatch(tokenError())
         }
      }
      fetchData();
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