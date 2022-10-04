import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fatchOfficerGetStarted, fatchOfficerGetSuccess, fatchOfficerGetError } from '../../storage/actions/officerActions';
import { fatchTokenValidityStarted, fatchTokenValiditySuccess, fatchTokenValidityError } from '../../storage/actions/officerActions';
import { fatchOfficerEditStarted, fatchOfficerEditSuccess, fatchOfficerEditError } from '../../storage/actions/officerActions';
import Button from '../formElements/button/Button';
import ButtonClose from '../formElements/buttonClose';
import MessageDataSaved from '../messageDataSaved/MessageDataSaved';
import Input from '../formElements/input/Input';
import RadioButton from '../formElements/radioButton';
import css from './OfficerDetal.module.css';
import Loader from '../loader/Loader';

const OfficerDetal = () => {
   const [isEdit, setEdit] = useState(true);
   const [isMessage, setMessage] = useState(false);
   const [checked, setChecked] = useState('true');
   const ref = useRef();
   const params = useParams();
   const { officerId } = params;

   const dispatch = useDispatch();
   const officers = useSelector(state => state.officers);

   console.log('officerId=', officerId);
   console.log('state.officers=', officers);
   useEffect(() => {
      async function fetchData() {
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
      }
      fetchData();
   }, [dispatch])

   const handleClick = (e) => {
      e.preventDefault();
      setEdit(!isEdit);
      console.log('isEdit=', isEdit)
   }

   console.log('officers=', officers);
   const officer = officers.officers.find(officer => officerId == officer._id)
   console.log('officer._id=', officer._id);

   const [values, setValues] = useState(
      {
         lastName: officer.lastName,
         firstName: officer.firstName,
         password: '',
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
               dispatch(fatchTokenValiditySuccess(data.data));
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchTokenValidityError(error))
            })
         // Запрос для редактирования данных о сотруднике (доступен только авторизованным пользователям):
         let data;
         if (`${values.password}`) {
            data = {
               "lastName": `${values.lastName}`,
               "firstName": `${values.firstName}`,
               "password": `${values.password}`,
               "approved": `${checked}`,
            }
         } else {
            data = {
               "lastName": `${values.lastName}`,
               "firstName": `${values.firstName}`,
               "approved": `${checked}`,
            }
         }
         console.log('values.approved=', values.approved);
         const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
               "Content-Type": "application/json; charset=utf-8",
               "Authorization": `Bearer ${token}`
            }
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
               console.log('isMessage1.1=', isMessage)
               dispatch(fatchOfficerEditSuccess(data));
               setMessage(true);
               console.log('isMessage1.2=', isMessage)
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
               <Link to='/officers'>
                  <ButtonClose />
               </Link>
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
                     onChange={firstName => setValues({ ...values, firstName })} />

                  {!isEdit &&
                     (<Input title={'Пароль: *'}
                        id={'passwordDetalOfficer'}
                        type={'password'}
                        name={'password'}
                        value={values.password}
                        placeholder={'********'}
                        minlength={'8'} //минимальное кол-во знаков
                        required={'required'}
                        onChange={password => setValues({ ...values, password })} />
                     )}
                  {isEdit &&
                     <>
                        <h3 className={css.label}>Пароль: *</h3>
                        <div className={css.btn}>
                           <Button name={'Изменить пароль'} type={'button'} ref={ref} onClick={handleClick} />
                        </div>
                     </>}
                  <h3 className={css.label}>E-mail адрес сотрудника:</h3>
                  <p className={css.input}>{officer.email}</p>
                  <h3 className={css.label}>clientId:</h3>
                  <p className={css.input}>{officer.clientId}</p>
                  <div className={css.statOfficer}>
                     <p className={css.titleStatus}>Статус сотрудника:</p>
                     <div className={css.checkbox}>
                        <RadioButton title={'одобрить'}
                           id={'approve'}
                           type={'radio'}
                           name={'radio'}
                           value={'true'}
                           checked={checked === 'true' ? true : false}
                           onChange={(e) => setChecked(e.target.value)} />
                        <RadioButton title={'снять одобрение'}
                           id={'dispprove'}
                           type={'radio'}
                           name={'radio'}
                           value={'false'}
                           checked={checked === 'false' ? true : false}
                           onChange={(e) => setChecked(e.target.value)} />
                     </div>
                  </div>
                  <div className={css.btn}>
                     <Button name={'Сохранить'} type={'submit'} />
                  </div>
               </form>
            </div >
            {isMessage &&
               <MessageDataSaved
                  isMessage={isMessage}
                  setMessage={setMessage}
                  title={'Данные сохранены'} />
            }
            {officers.isLoading &&
               (<>
                  <div className={css.loading}>
                     <Loader />
                  </div>
               </>)
            }
         </div >
      </div >
   )
}
export default OfficerDetal;