import React, { useEffect } from 'react';
import { useState } from 'react';
import { fatchTokenValidityStarted, fatchTokenValiditySuccess, fatchTokenValidityError } from '../../storage/actions/officerActions';
import { fatchOfficersGetStarted, fatchOfficersGetSuccess, fatchOfficersGetError } from '../../storage/actions/officerActions';
import { fatchCaseSendStarted, fatchCaseSendSuccess, fatchCaseSendError } from '../../storage/actions/casesActions';
import { useSelector, useDispatch } from 'react-redux';
import { addToCas } from '../../storage/actions/casesActions';
import Input from '../formElements/input/Input';
import Textarea from '../formElements/textarea/Textarea';
import DropDovn from '../formElements/dropDown/DropDown';
import Button from '../formElements/button/Button';
import css from './CaseForm.module.css';
import uniqid from 'uniqid';

const CaseForm = () => {
   const dispatch = useDispatch();
   const cases = useSelector(state => state.cases);
   const officers = useSelector(state => state.officers);
   const isLoading = useSelector(state => state.isLoading);

   // const handleChange = (e) => {
   //    const fieldName = e.target.name;
   //    setValues({ ...values, [fieldName]: e.target.value });
   // }

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
         checkedDelet: '',
      })

   //console.log('officers=', officers);
   const bikeType = ['general', 'sport'];
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
   const officersName = filterOfficers.map(officer => {
      return `${officer.lastName} ${officer.firstName}`;
   })
   console.log('officersName=', officersName, 'bikeType=', bikeType);

   const handleSubmitCaseForm = async (e) => {
      e.preventDefault();
      console.log('officersName=', officersName, 'bikeType=', bikeType);
      const caseObj = {
         id: uniqid(),
         licenseNumber: values.licenseNumber,
         type: values.type,
         ownerFullName: values.ownerFullName,
         //clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
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
      //const findType=bikeType.find(type=>{})

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

         console.log('findOfficer._id=', findOfficer._id, 'token=', token)
         // Запрос для создания нового сообщения о краже (доступен только авторизованным пользователям)
         dispatch(fatchCaseSendStarted());
         await fetch('https://sf-final-project.herokuapp.com/api/cases/',
            {
               method: 'POST',
               body: JSON.stringify({
                  "id": `${caseObj.id}`,
                  "licenseNumber": `${caseObj.licenseNumber}`,
                  "type": `${caseObj.type}`,
                  "ownerFullName": `${caseObj.ownerFullName}`,
                  //clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
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
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchCaseSendError(error))
            })

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
                        onChange={licenseNumber => setValues({ ...values, licenseNumber })} />
                     <Input title={'ФИО пользователя: *'}
                        id={'ownerFullNameCaseForm'}
                        type={'text'}
                        name={'ownerFullName'}
                        value={values.ownerFullName}
                        placeholder={'Иванов Иван Иванович'}
                        onChange={ownerFullName => setValues({ ...values, ownerFullName })} />
                     <DropDovn title={'Tип велосипеда: *'}
                        id={'bikeTypeCaseForm'}
                        type={'text'}
                        name={'bikeType'}
                        options={bikeType}
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
         </div >
      </div >
   )
}
export default CaseForm;