import React, { useEffect } from 'react';
import { useState } from 'react';
import { fatchOfficersGetStarted, fatchOfficersGetSuccess, fatchOfficersGetError, fatchTokenValidityStarted, fatchTokenValiditySuccess, fatchTokenValidityError } from '../../storage/actions/officerActions';
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

   //этот useEffect скопирован из компонента Officer
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
         // Запрос для получения списка всех сотрудников (доступен только авторизованным пользователям):
         dispatch(fatchOfficersGetStarted());
         await fetch('https://sf-final-project.herokuapp.com/api/officers/', { headers: { "Authorization": `Bearer ${token}` } })
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

   console.log('officersName=', officers);
   const bikeType = ['general', 'sport'];
   const officersName = officers.officers.map(officer => {
      return `${officer.lastName} ${officer.firstName}`
   })
   console.log('officersName=', officersName);

   // const handleChange = (e) => {
   //    const fieldName = e.target.name;
   //    setValues({ ...values, [fieldName]: e.target.value });
   // }
   let today = new Date();
   //today.setFullYear(year, [month], [date]);
   const handleSubmitCaseForm = (e) => {
      e.preventDefault();
      console.log('!')
      const cas = {
         id: uniqid(),
         status: 'nev',
         type: values.type,
         ownerFullName: values.ownerFullName,
         clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
         createdAd: today.setFullYear(),
         updatedAd: today.setFullYear(),
         color: values.color,
         date: values.date,
         officer: values.officer,
         description: values.description,
         resolution: '',
      }
      console.log('cases1=', cases, cases.langth)
      dispatch(addToCas(cas.id, cas.status, cas.licenseNumber, cas.type, cas.ownerFullName, cas.clientId, cas.createdAd, cas.updatedAd, cas.color, cas.date, cas.officer, cas.description, cas.resolution));
      console.log('cases2=', cases, cases.langth)
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
      console.log('cases3=', cases, cases.langth)
   }

   //https://www.youtube.com/watch?v=uM3RycN_k3c
   // const sendData = async (url, data) => {
   //    const response = await fetch(url, {
   //       method: 'POST',
   //       body: JSON.stringify(data),
   //    })
   //    if (response.status !== 'OK') {
   //       throw new Error(`Ошибка! Код ошибки ${response.errCode}, описание ошибки: ${response.message} `)
   //    }
   //    return await response.json()
   // }

   // const sendCase = () => {
   //    const caseForm = document.querySelector('.form');
   //    const data = {
   //       id: uniqid(),
   //       status: 'nev',
   //       type: values.type,
   //       ownerFullName: values.ownerFullName,
   //       clientId: '995544',
   //       createdAd: today.setFullYear(),
   //       updatedAd: today.setFullYear(),
   //       color: values.color,
   //       date: values.date,
   //       officer: values.officer,
   //       description: values.description,
   //       resolution: '',
   //    };
   //    caseForm.addEventListener('submit', e => {
   //       today.preventDefault();
   //       const formData = new FormData(caseForm);
   //       formData.set('order', JSON.stringify(data));

   //       sendData('https://sf-final-project.herokuapp.com/api/public/report', formData)
   //          .then(() => {
   //             caseForm.reset() //очистить форму
   //          })
   //          .catch((err) => {
   //             console.log(Error)
   //          })
   //    });
   // }

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
                        id={'typeBikeCaseForm'}
                        type={'text'}
                        name={'typeBike'}
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
                        value={values.type}
                        onChange={type => setValues({ ...values, type })} />
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