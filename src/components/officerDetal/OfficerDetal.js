import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fatchOfficerGetStarted, fatchOfficerGetSuccess, fatchOfficerGetError } from '../../storage/actions/officerActions';
import { fatchTokenValidityStarted, fatchTokenValiditySuccess, fatchTokenValidityError } from '../../storage/actions/officerActions';
import { fatchOfficerEditStarted, fatchOfficerEditSuccess, fatchOfficerEditError } from '../../storage/actions/officerActions';
import Button from '../formElements/button/Button';
import Input from '../formElements/input/Input';
import css from './OfficerDetal.module.css';

const OfficerDetal = () => {
   // const [isEdit, setEdit] = useState(true);
   const params = useParams();
   const { officerId } = params;

   const dispatch = useDispatch();
   const officers = useSelector(state => state.officers);
   const isLoading = useSelector(state => state.isLoading);

   console.log('officerId=', officerId);
   console.log('state.officers=', officers);
   useEffect(async () => {
      const token = localStorage.getItem('token');
      console.log('token=', token);
      if (token) {
         //Запрос для проверки валидности токена.
         dispatch(fatchTokenValidityStarted());
         await fetch('https://sf-final-project.herokuapp.com/api/auth/', { headers: { "Authorization": `Bearer ${token}` } })
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
         // Запрос для получения данных об одном сотруднике (доступен только авторизованным пользователям):
         dispatch(fatchOfficerGetStarted());
         await fetch(`https://sf-final-project.herokuapp.com/api/officers/${officerId}`, { headers: { "Authorization": `Bearer ${token}` } })
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
               dispatch(fatchOfficerGetSuccess(data));
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchOfficerGetError(error))
            })

      } else {
         console.log('token нет в localStorage, авторизуйтесь')
      }
   }, [dispatch])

   // const handleClick = (e) => {
   //    e.preventDefault();
   //    setEdit(!isEdit);
   //    console.log('isEdit=', isEdit)
   // }

   const [value, setValue] = useState('1');

   const handleChecked = (e) => {
      setValue(e.target.value);
   }

   console.log('officers=', officers);
   const officer = officers.officers.find(officer => officerId == officer._id)
   console.log('officer._id=', officer._id);

   const [values, setValues] = useState(
      {
         lastName: officer.lastName,
         firstName: officer.firstName,
         password: officer.password,
         approved: officer.approved,
      })

   const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      console.log('token=', token);
      if (token) {
         //Запрос для проверки валидности токена.
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
         // Запрос для редактирования данных о сотруднике (доступен только авторизованным пользователям):
         const options = {
            method: 'PUT',
            body: JSON.stringify({
               //"id": `${officer._id}`,
               "lastName": `${values.lastName}`,
               "firstName": `${values.firstName}`,
               // "email": `${officer.email}`,
               "password": `${values.password}`,
               //"clientId": 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
               "approved": `${values.approved}`,
            }),
            headers: { "Authorization": `Bearer ${token}` }
         }
         dispatch(fatchOfficerEditStarted());
         console.log('!!!', officer._id, officerId)
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
               dispatch(fatchOfficerEditSuccess(data.data))
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchOfficerEditError(error))
            })

      } else {
         console.log('token нет в localStorage, авторизуйтесь')
      }
   }

   return (
      <div className={css.detalOfficer}>
         <div className={css.wrapper}>
            <div className={css.imgOfficer}></div>
            <div className={css.form}>
               <p className={css.title}>Детальная страница сотрудника</p>
               <form className={css.container} onSubmit={handleSubmit}>
                  <Input title={'Фамилия сотрудника:'}
                     id={'lastNameDetalOfficer'}
                     type={'text'}
                     name={'lastName'}
                     value={values.lastName}
                     onChange={lastName => setValues({ ...values, lastName })} />
                  <Input title={'Имя сотрудника:'}
                     id={'firstNameDetalOfficer'}
                     type={'text'}
                     name={'firstName'}
                     value={values.firstName}
                     onChange={firstName => setValues({ ...values, firstName })} /><Input title={'Пароль: *'}
                        id={'passwordDetalOfficer'}
                        type={'password'}
                        name={'password'}
                        value={values.password}
                        placeholder={'********'}
                        minlength={'8'} //минимальное кол-во знаков
                        required={'required'}
                        onChange={password => setValues({ ...values, password })} />
                  <h3 className={css.label}>E-mail адрес сотрудника:</h3>
                  <p className={css.input}>{officer.email}</p>
                  <h3 className={css.label}>clientId:</h3>
                  <p className={css.input}>{officer.clientId}</p>
                  <div className={css.statOfficer}>
                     <p className={css.titleStatus}>Статус сотрудника:</p>
                     <div className={css.checkbox}>
                        <span className={css.radioButton}><input id='status1' type='radio' name='status' value='1' checked={value === '1' ? true : false} onChange={handleChecked}></input>
                           <label for='status1' className={css.radio}>одобрить сотрудника</label></span>
                        <span className={css.radioButton}><input id='status2' type='radio' name='status' value='2' checked={value === '2' ? true : false} onChange={handleChecked}></input>
                           <label for='status1' className={css.radio}>снять одобрение</label></span>
                     </div>
                  </div>
                  <div className={css.btn}>
                     <Button name={'Сохранить'} type={'submit'} />
                  </div>
               </form>
            </div>
         </div >
      </div >
   )
}
export default OfficerDetal;