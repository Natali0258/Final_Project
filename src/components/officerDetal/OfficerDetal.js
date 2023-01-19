import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createRequest } from '../../fetch/createRequest';
import { fetchRequest } from '../../fetch/fetchRequest';
import { getModal, fetchOfficerGetStarted, fetchOfficerGetSuccess, fetchOfficerGetError } from '../../storage/actions/officerActions';
import { fetchTokenValidityStarted, fetchTokenValiditySuccess, fetchTokenValidityError } from '../../storage/actions/officerActions';
import { fetchOfficerEditStarted, fetchOfficerEditSuccess, fetchOfficerEditError } from '../../storage/actions/officerActions';
import { tokenError } from '../../storage/actions/authActions';
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
   const params = useParams();
   const { officerId } = params;

   const dispatch = useDispatch();
   const officers = useSelector(state => state.officers);

   useEffect(() => {
      async function fetchData() {
         const token = localStorage.getItem('token');
         if (token) {
            //Запрос для проверки валидности токена.
            dispatch(fetchTokenValidityStarted());
            await createRequest('auth/', 'GET', true, dispatch, fetchTokenValiditySuccess, fetchTokenValidityError)

            // Запрос для получения данных об одном сотруднике (доступен только авторизованным пользователям):
            dispatch(fetchOfficerGetStarted());
            await createRequest(`officers/${officerId}`, 'GET', true, dispatch, fetchOfficerGetSuccess, fetchOfficerGetError)

         } else {
            //вывод сообщения "Token нет в localStorage, авторизуйтесь"
            dispatch(getModal())
            dispatch(tokenError())
         }
      }
      fetchData();
   }, [dispatch])

   const handleClick = (e) => {
      e.preventDefault();
      setEdit(!isEdit);
   }

   const officer = officers.officers.find(officer => officerId == officer._id)

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
      if (token) {
         //Запрос для проверки валидности токена.
         dispatch(fetchTokenValidityStarted());
         await createRequest('auth/', 'GET', true, dispatch, fetchTokenValiditySuccess, fetchTokenValidityError)

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

         dispatch(fetchOfficerEditStarted());
         await fetchRequest(`officers/${officerId}`, 'PUT', data, true, dispatch, fetchOfficerEditSuccess, fetchOfficerEditError)

      } else {
         //вывод сообщения "Token нет в localStorage, авторизуйтесь"
         dispatch(getModal())
         dispatch(tokenError())
      }
   }

   return (
      <div className={css.detalOfficer}>
         <div className={css.wrapper}>
            <div className={css.imgOfficer}></div>
            <div className={css.container}>
               <Link to='/officers'>
                  <ButtonClose />
               </Link>
               <p className={css.title}>Детальная страница сотрудника</p>
               <form className={css.form} onSubmit={handleSubmit}>
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
                           <Button name={'Изменить пароль'} type={'button'}
                              onClick={handleClick} />
                        </div>
                     </>}
                  <h3 className={css.label}>E-mail адрес сотрудника:</h3>
                  <p className={css.input}>{officer.email}</p>
                  <h3 className={css.label}>clientId:</h3>
                  <p className={css.input}>{officer.clientId}</p>
                  <div className={css.statusOfficer}>
                     <div className={css.approved}>
                        <p className={css.titleStatus}>Статус сотрудника:</p>
                        <p className={css.inputStatus}>{officer.approved ? 'одобрен' : 'не одобрен'}</p>
                     </div>
                     <div className={css.radioButtons}>
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