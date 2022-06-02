import React, { useEffect } from 'react';
import { useState } from 'react';
import { fatchTokenValidityStarted, fatchTokenValiditySuccess, fatchTokenValidityError } from '../../storage/actions/officerActions';
import { fatchOfficersGetStarted, fatchOfficersGetSuccess, fatchOfficersGetError } from '../../storage/actions/officerActions';
import { addToCase, fatchCaseSendStarted, fatchCaseSendSuccess, fatchCaseSendError } from '../../storage/actions/casesActions';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../formElements/input/Input';
import Textarea from '../formElements/textarea/Textarea';
import DropDovn from '../formElements/dropDown/DropDown';
import Button from '../formElements/button/Button';
import MessageDataSaved from '../messageDataSaved/MessageDataSaved';
import css from './CaseForm.module.css';
import uniqid from 'uniqid';

const CaseForm = () => {
   const dispatch = useDispatch();
   const cases = useSelector(state => state.cases);
   const officers = useSelector(state => state.officers);
   const isLoading = useSelector(state => state.isLoading);
   const bikeType = useSelector(state => state.bikeType);
   const [isMessage, setMessage] = useState(false);

   //этот useEffect скопирован из компонента Officer
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
         color: '',
         date: '',
         officer: '',
         description: '',
         resolution: '',
      })

   // const bikeType = ['', 'general', 'sport'];
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

   let officersName = [' '];
   filterOfficers.map(officer => {
      return officersName.push(`${officer.lastName} ${officer.firstName}`);
   })
   console.log('officersName=', officersName);
   // console.log('bikeType=', bikeType);

   const handleSubmitCaseForm = async (e) => {
      e.preventDefault();
      console.log('officersName=', officersName, 'bikeType=', bikeType);
      const caseObj = {
         id: uniqid(),
         licenseNumber: values.licenseNumber,
         type: values.type,
         ownerFullName: values.ownerFullName,
         color: values.color,
         date: values.date,
         officer: values.officer,
         description: values.description,
      };
      console.log('caseObj=', caseObj);

      const arrName = caseObj.officer.split(' ');
      console.log('arrName=', arrName);
      const findOfficer = officers.officers.find(officer => (officer.lastName === arrName[0] &&
         officer.firstName === arrName[1]))
      console.log('findOfficer=', findOfficer, 'caseObj.type=', caseObj.type);

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

         // Запрос для создания нового сообщения о краже (доступен только авторизованным пользователям)
         dispatch(fatchCaseSendStarted());
         //Если ответственный сотрудник (officer) не выбран, то в body запроса поле officer удалено
         if (!caseObj.officer) {
            await fetch('https://sf-final-project.herokuapp.com/api/cases/',
               {
                  method: 'POST',
                  body: JSON.stringify({
                     "id": `${caseObj.id}`,
                     "licenseNumber": `${caseObj.licenseNumber}`,
                     "type": `${caseObj.type}`,
                     "ownerFullName": `${caseObj.ownerFullName}`,
                     "color": `${caseObj.color}`,
                     "date": `${caseObj.date}`,
                     "description": `${caseObj.description}`,
                  }),
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
                  dispatch(fatchCaseSendSuccess(data));
                  dispatch(addToCase(data.data._id, data.data.status, data.data.licenseNumber, data.data.type, data.data.ownerFullName, data.data.clientId, data.data.createdAd, data.data.updatedAd, data.data.color, data.data.date, data.data.officer, data.data.description, data.data.resolution))
                  console.log("data.data._id=", data.data._id);
                  setMessage(true);
                  console.log("values=", values)
               })
               .catch(error => {
                  console.log('error', error)
                  dispatch(fatchCaseSendError(error))
               })
         } else {
            await fetch('https://sf-final-project.herokuapp.com/api/cases/',
               {
                  method: 'POST',
                  body: JSON.stringify({
                     "id": `${caseObj.id}`,
                     "licenseNumber": `${caseObj.licenseNumber}`,
                     "type": `${caseObj.type}`,
                     "ownerFullName": `${caseObj.ownerFullName}`,
                     "color": `${caseObj.color}`,
                     "date": `${caseObj.date}`,
                     "officer": `${findOfficer._id}`,
                     "description": `${caseObj.description}`,
                  }),
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
                  dispatch(fatchCaseSendSuccess(data));
                  dispatch(addToCase(data.data._id, data.data.status, data.data.licenseNumber, data.data.type, data.data.ownerFullName, data.data.clientId, data.data.createdAd, data.data.updatedAd, data.data.color, data.data.date, data.data.officer, data.data.description, data.data.resolution))
                  console.log("data.data._id=", data.data._id);
                  setMessage(true);
                  console.log("values=", values)
               })
               .catch(error => {
                  console.log('error', error)
                  dispatch(fatchCaseSendError(error))
               })
         }
         setValues(
            {
               id: '',
               status: '',
               licenseNumber: '',
               type: '',
               ownerFullName: '',
               clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
               createdAd: '',
               updatedAd: '',
               color: '',
               date: '',
               officer: '',
               description: '',
               resolution: '',
            }
         )
         console.log("cases=", cases);
      } else {
         console.log('token нет в localStorage, авторизуйтесь')
      }
   }

   return (
      <div className={css.caseForm}>
         <div className={css.wrapper}>
            <div className={css.formBike}></div>
            <form className={css.form} onSubmit={handleSubmitCaseForm}>
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
                        onChange={licenseNumber => setValues({ ...values, licenseNumber })} />
                     <Input title={'ФИО пользователя: *'}
                        id={'ownerFullNameCaseForm'}
                        type={'text'}
                        name={'ownerFullName'}
                        value={values.ownerFullName}
                        required={'required'}
                        placeholder={'Иванов Иван Иванович'}
                        onChange={ownerFullName => setValues({ ...values, ownerFullName })} />
                     <DropDovn title={'Tип велосипеда: *'}
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
                     <DropDovn title={'Ответственный сотрудник:'}
                        id={'officerCaseForm'}
                        type={'text'}
                        name={'officersName'}
                        options={officersName}
                        value={values.officer}
                        onChange={officer => setValues({ ...values, officer })} />
                  </div>
               </div>
               <div className={css.button}>
                  <Button type={'submit'} name={'Coxранить'} />
               </div>
            </form>
            {isMessage &&
               <MessageDataSaved
                  isMessage={isMessage}
                  setMessage={setMessage}
                  title={'Данные сохранены'} />
            }
         </div >
      </div >
   )
}
export default CaseForm;