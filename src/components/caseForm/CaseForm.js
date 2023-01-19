import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchTokenValidityStarted, fetchTokenValiditySuccess, fetchTokenValidityError } from '../../storage/actions/officerActions';
import { fetchOfficersGetStarted, fetchOfficersGetSuccess, fetchOfficersGetError } from '../../storage/actions/officerActions';
import { fetchCaseSendStarted, fetchCaseSendSuccess, fetchCaseSendError } from '../../storage/actions/casesActions';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRequest } from '../../fetch/fetchRequest';
import { createRequest } from '../../fetch/createRequest';
import { getArrayOfficersName } from '../functions/getArrayOfficersName';
import { changeDateFormat } from '../functions/changeDateFormat';
import ButtonClose from '../formElements/buttonClose/ButtonClose';
import Input from '../formElements/input/Input';
import Textarea from '../formElements/textarea/Textarea';
import DropDown from '../formElements/dropDown/DropDown';
import Button from '../formElements/button/Button';
import Loader from '../loader/Loader';
import MessageDataSaved from '../messageDataSaved/MessageDataSaved';
import css from './CaseForm.module.css';
import uniqid from 'uniqid';

const CaseForm = () => {
   const dispatch = useDispatch();
   const cases = useSelector(state => state.cases);
   const officers = useSelector(state => state.officers);
   const auth = useSelector(state => state.auth);
   const [isMessage, setMessage] = useState(false);
   const [isDropDown, setDropDown] = useState(false);

   useEffect(() => {
      async function fetchData() {
         if (auth.isAuth === false) localStorage.removeItem('token');

         const token = localStorage.getItem('token');
         //console.log('token=', token);

         if (token) {
            //вывод на экран DropDown со списком ответственных сотрудников
            setDropDown(!isDropDown)
            //GET Запрос для проверки валидности токена.
            dispatch(fetchTokenValidityStarted());
            await createRequest('auth/', 'GET', true, dispatch, fetchTokenValiditySuccess, fetchTokenValidityError)

            //GET Запрос для получения списка всех сотрудников (доступен только авторизованным пользователям):
            dispatch(fetchOfficersGetStarted());
            await createRequest('officers/', 'GET', true, dispatch, fetchOfficersGetSuccess, fetchOfficersGetError)

         } else {
            //вывод сообщения "Token нет в localStorage, авторизуйтесь"
            // dispatch(getModal())
            // dispatch(tokenError())
         }
      }
      fetchData();
   }, [dispatch])

   const [values, setValues] = useState(
      {
         id: '',
         status: '',
         licenseNumber: '',
         type: '',
         ownerFullName: '',
         clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
         createdAd: '',
         updatedAd: '',
         color: ' ',
         date: '',
         officer: '',
         description: ' ',
         resolution: ' ',
      })

   const [validation, setValidation] = useState(
      {
         licenseNumberValid: false,
         ownerFullNameValid: false,
         formValid: false
      }
   )

   const handleLicenseNumber = (licenseNumber) => {
      setValues({ ...values, licenseNumber });
      //console.log('values1=', values.licenseNumber);
      let isLicenseNumberValid = licenseNumber.trim() !== '';
      setValidation({
         ...validation, licenseNumberValid: isLicenseNumberValid,
         formValid: validation.licenseNumberValid && validation.ownerFullNameValid
      })
   }

   const handleOwnerFullName = (ownerFullName) => {
      setValues({ ...values, ownerFullName });
      //console.log('values2=', values.ownerFullName);
      let isOwnerFullNameValid = ownerFullName.trim() !== '';
      setValidation({
         ...validation, ownerFullNameValid: isOwnerFullNameValid,
         formValid: validation.licenseNumberValid && validation.ownerFullNameValid
      });
   }
   // console.log('licenseNumberValid=', validation.licenseNumberValid)
   // console.log('ownerFullNameValid=', validation.ownerFullNameValid)
   // console.log('formValid=', validation.formValid)

   //Формируем массив officersName из имен ответственных сотрудников, 
   //которые образованны из свойств lastName и firstName
   const officersName = getArrayOfficersName(officers);

   //Изменение формата даты
   let date = new Date();
   const createDate = changeDateFormat(date)

   const handleSubmitCaseForm = async (e) => {
      e.preventDefault();

      const caseObj = {
         id: uniqid(),
         licenseNumber: values.licenseNumber,
         type: values.type,
         ownerFullName: values.ownerFullName,
         color: values.color,
         date: values.date,
         officer: values.officer,
         description: values.description,
         createdAt: createDate,
      };

      const arrName = caseObj.officer.split(' ');

      const findOfficer = officers.officers.find(officer => (officer.lastName === arrName[0] &&
         officer.firstName === arrName[1]))

      const token = localStorage.getItem('token');

      if (token) {
         //Запрос для проверки валидности токена.
         dispatch(fetchTokenValidityStarted());
         await createRequest('auth/', 'GET', true, dispatch, fetchTokenValiditySuccess, fetchTokenValidityError)

         // Запрос для создания нового сообщения о краже (доступен только авторизованным пользователям)
         dispatch(fetchCaseSendStarted());
         //Если ответственный сотрудник (officer) не выбран, то в body запроса поле officer удалено
         if (!caseObj.officer) {
            await fetchRequest('cases/', 'POST',
               {
                  "id": `${caseObj.id}`,
                  "licenseNumber": `${caseObj.licenseNumber}`,
                  "type": `${caseObj.type}`,
                  "ownerFullName": `${caseObj.ownerFullName}`,
                  "color": `${caseObj.color}`,
                  "date": `${caseObj.date}`,
                  "description": `${caseObj.description}`,
                  "createdAt": `${caseObj.createdAt}`,
               }, true, dispatch, fetchCaseSendSuccess, fetchCaseSendError, setMessage)
         } else {
            await fetchRequest('cases/', 'POST',
               {
                  "id": `${caseObj.id}`,
                  "licenseNumber": `${caseObj.licenseNumber}`,
                  "type": `${caseObj.type}`,
                  "ownerFullName": `${caseObj.ownerFullName}`,
                  "color": `${caseObj.color}`,
                  "date": `${caseObj.date}`,
                  "officer": `${findOfficer._id}`,
                  "description": `${caseObj.description}`,
                  "createdAt": `${caseObj.createdAt}`,
               }, true, dispatch, fetchCaseSendSuccess, fetchCaseSendError, setMessage)
         }
         setValues(
            {
               id: '',
               status: '',
               licenseNumber: '',
               type: '',
               ownerFullName: '',
               clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
               createdAt: '',
               updatedAt: '',
               color: ' ',
               date: '',
               officer: '',
               description: ' ',
               resolution: ' ',
            }
         )
      } else {
         //POST Запрос для создания нового сообщения о краже (доступен без авторизации)
         dispatch(fetchCaseSendStarted());
         await fetchRequest('public/report', 'POST',
            {
               "id": `${caseObj.id}`,
               "licenseNumber": `${caseObj.licenseNumber}`,
               "type": `${caseObj.type}`,
               "ownerFullName": `${caseObj.ownerFullName}`,
               "color": `${caseObj.color}`,
               "date": `${caseObj.date}`,
               "description": `${caseObj.description}`,
               "createdAt": `${caseObj.createdAt}`,
               "clientId": 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
            }, false, dispatch, fetchCaseSendSuccess, fetchCaseSendError, setMessage)
         setValues(
            {
               id: '',
               status: '',
               licenseNumber: '',
               type: '',
               ownerFullName: '',
               clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
               createdAt: '',
               updatedAt: '',
               color: ' ',
               date: '',
               officer: '',
               description: ' ',
               resolution: ' ',
            }
         )
      }
   }

   return (
      <div className={css.caseForm}>
         <div className={css.wrapper}>
            <div className={css.formBike}></div>
            {officers.isLoading &&
               <div className={css.loading}>
                  <Loader />
               </div>
            }
            <form className={css.form} onSubmit={handleSubmitCaseForm}>
               <Link to='/'>
                  <ButtonClose />
               </Link>
               <h2 className={css.title}>Информация о краже</h2>
               <p className={css.comment}>* Обязательные поля</p>
               <div className={css.container}>
                  <div className={css.formLeft}>
                     <Input title={'Номер лицензии: *'}
                        id={'licenseNumberCaseForm'}
                        type={'text'}
                        name={'licenseNumber'}
                        value={values.licenseNumber}
                        placeholder={'110012'}
                        required={'required'}
                        onChange={handleLicenseNumber} />
                     <Input title={'ФИО пользователя: *'}
                        id={'ownerFullNameCaseForm'}
                        type={'text'}
                        name={'ownerFullName'}
                        value={values.ownerFullName}
                        required={'required'}
                        placeholder={'Иванов Иван Иванович'}
                        onChange={handleOwnerFullName} />
                     <DropDown title={'Tип велосипеда: *'}
                        id={'bikeTypeCaseForm'}
                        type={'text'}
                        name={'bikeType'}
                        required={'required'}
                        options={cases.bikeType}
                        value={values.type}
                        onChange={type => setValues({ ...values, type })} />
                     <Input title={'Цвет велосипеда:'}
                        id={'colorBikeCaseForm'}
                        type={'text'}
                        name={'color'}
                        value={values.color}
                        placeholder={'black'}
                        onChange={color => setValues({ ...values, color })} />
                  </div>
                  <div className={css.formRight}>
                     <Input title={'Дата кражи:'}
                        id={'dateCaseForm'}
                        type={'date'}
                        name={'date'}
                        value={values.date}
                        onChange={date => setValues({ ...values, date })} />
                     <Textarea title={'Дополнительный комментарий:'}
                        id={'descriptionCaseForm'}
                        type={'text'}
                        name={'description'}
                        value={values.description}
                        onChange={description => setValues({ ...values, description })} />
                     {isDropDown &&
                        <DropDown title={'Ответственный сотрудник:'}
                           id={'officerCaseForm'}
                           type={'text'}
                           name={'officersName'}
                           options={officersName}
                           value={values.officer}
                           onChange={officer => setValues({ ...values, officer })} />
                     }
                  </div>
               </div>
               <div className={css.button}>
                  <Button disabled={!validation.formValid}
                     type={'submit'} name={'Coxранить'} />
               </div>
            </form>
            {isMessage &&
               <MessageDataSaved
                  isMessage={isMessage}
                  setMessage={setMessage}
                  title={`Ваше обращение от ${createDate} зарегистрировано в базе`}
               />
            }
         </div >
      </div >
   )
}
export default CaseForm;