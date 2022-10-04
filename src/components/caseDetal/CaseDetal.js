import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fatchTokenValidityStarted, fatchTokenValiditySuccess, fatchTokenValidityError } from '../../storage/actions/officerActions';
import { fatchCaseGetStarted, fatchCaseGetSuccess, fatchCaseGetError } from '../../storage/actions/casesActions';
import { fatchCasesGetStarted, fatchCasesGetSuccess, fatchCasesGetError } from '../../storage/actions/casesActions';
import { fatchCaseEditStarted, fatchCaseEditSuccess, fatchCaseEditError } from '../../storage/actions/casesActions';
import { fatchOfficersGetStarted, fatchOfficersGetSuccess, fatchOfficersGetError } from '../../storage/actions/officerActions';
import Button from '../formElements/button/Button';
import ButtonClose from '../formElements/buttonClose/ButtonClose';
import Input from '../formElements/input/Input';
import DropDown from '../formElements/dropDown/DropDown';
import Textarea from '../formElements/textarea/Textarea';
import MessageDataSaved from '../messageDataSaved/MessageDataSaved';
import Loader from '../loader/Loader';
import css from './CaseDetal.module.css';

const CaseDetal = (props) => {
   //const { cases } = props;
   const [isEdit, setEdit] = useState(false);
   const [isMessage, setMessage] = useState(false);
   const ref = useRef(null);
   const params = useParams();
   const { caseId } = params;

   const dispatch = useDispatch();
   const cases = useSelector(state => state.cases);
   const bikeType = useSelector(state => state.bikeType);
   const caseStatus = useSelector(state => state.caseStatus);
   const officers = useSelector(state => state.officers);

   // console.log('caseId=', caseId)
   // console.log('caseStatus=', cases.caseStatus);

   useEffect(() => {
      async function fetchData() {

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
            //GET Запрос для получения данных одного сообщения о краже (доступен только авторизованным пользователям):
            dispatch(fatchCaseGetStarted());
            await fetch(`https://sf-final-project.herokuapp.com/api/cases/${caseId}`,
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
                  dispatch(fatchCaseGetSuccess(data));
               })
               .catch(error => {
                  console.log('error', error)
                  dispatch(fatchCaseGetError(error))
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
      }
      fetchData();
   }, [dispatch])

   //Формируем объект officersName с ключом - id и значением - имя, образованное из lastName и firstName
   function getObjOfficersName(officers) {
      const approvedOfficers = officers.officers.map(officer => {
         if (officer.approved) {
            return officer;
         }
      })
      //console.log('approvedOfficers=', approvedOfficers);

      const filterOfficers = approvedOfficers.filter(officer => {
         return officer;
      })
      //console.log('filterOfficers=', filterOfficers);

      let officersName = {};
      filterOfficers.map(officer => {
         return officersName[`${officer._id}`] = `${officer.lastName} ${officer.firstName}`;
      })
      //console.log('officersName=', officersName);
      return officersName;
   }
   const officersName = getObjOfficersName(officers);
   //console.log('officersName1=', officersName);

   //Находим по id объект (случай кражи)
   const caseObj = cases.cases.find(caseObj => caseId === caseObj._id)
   // console.log('cases=', cases);
   //console.log('caseObj._id=', caseObj._id, caseObj);
   const [values, setValues] = useState(
      {
         licenseNumber: caseObj.licenseNumber,
         ownerFullName: caseObj.ownerFullName,
         type: caseObj.type,
         color: caseObj.color,
         date: caseObj.date,
         status: caseObj.status,
         officer: officersName[caseObj.officer],
         description: caseObj.description,
         resolution: caseObj.resolution,
      }
   );

   //Формируем массив arrayOfficersName из имен ответственных сотрудников, 
   //которые образованны из свойств lastName и firstName
   function getArrayOfficersName(officers) {
      const approvedOfficers = officers.officers.map(officer => {
         if (officer.approved) {
            return officer;
         }
      })
      //console.log('approvedOfficers=', approvedOfficers);

      const filterOfficers = approvedOfficers.filter(officer => {
         return officer;
      })
      //console.log('filterOfficers=', filterOfficers);

      let arrayOfficersName = [' '];
      filterOfficers.map(officer => {
         return arrayOfficersName.push(`${officer.lastName} ${officer.firstName}`);
      })
      //console.log('arrayOfficersName=', arrayOfficersName);
      return arrayOfficersName;
   }
   const arrayOfficersName = getArrayOfficersName(officers);
   //console.log('arrayOfficersName1=', arrayOfficersName);

   //находим у объекта officersName ключ (id), зная значение (name)
   function getOfficerId(officersName) {
      for (let key in officersName) {
         if (officersName[key] === values.officer) {
            return key;
         }
      }
   }
   const officerId = getOfficerId(officersName);
   //console.log('officerId=', officerId);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
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
         //PUT Запрос для редактирования сообщения о краже 
         //(доступен только авторизованным пользователям):
         const data = {
            "licenseNumber": `${values.licenseNumber}`,
            "ownerFullName": `${values.ownerFullName}`,
            "type": `${values.type}`,
            "color": `${values.color}`,
            "date": `${values.date}`,
            "status": `${values.status}`,
            "officer": "officerId",
            "description": `${values.description}`,
            "resolution": `${values.resolution}`,
         }
         const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
               "Content-Type": "application/json; charset=utf-8",
               "Authorization": `Bearer ${token}`
            }
         }
         dispatch(fatchCaseEditStarted());
         console.log('caseObj._id', caseObj._id, 'caseId', caseId, 'data=', data)
         await fetch(`https://sf-final-project.herokuapp.com/api/cases/${caseId}`,
            options)
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
               dispatch(fatchCaseEditSuccess(data));
            })
            .catch(error => {
               console.log('error', error)
               dispatch(fatchCaseEditError(error))
            })

      } else {
         console.log('token нет в localStorage, авторизуйтесь')
      }
   }

   const handleClick = () => {
      ref.current.submit();
      console.log('1=')
   }

   return (
      <div className={css.detalCase}>
         <div className={css.wrapper}>
            <div className={css.caseBike}></div>
            <div className={css.border}>
               <Link to='/cases'>
                  <ButtonClose />
               </Link>
               <h2 className={css.title}>Детальная страница сообщения</h2>
               <form className={css.form} id='btn' ref={ref} onSubmit={handleSubmit}>
                  <div className={css.container}>
                     <div className={css.formLeft}>
                        <Input title={'Номер лицензии:'}
                           id={'licenseNumberDetalCase'}
                           type={'text'}
                           name={'licenseNumber'}
                           value={values.licenseNumber}
                           onChange={licenseNumber => setValues({ ...values, licenseNumber })} />
                        <Input title={'ФИО пользователя:'}
                           id={'ownerFullNameDetalCase'}
                           type={'text'}
                           name={'ownerFullName'}
                           value={values.ownerFullName}
                           onChange={ownerFullName => setValues({ ...values, ownerFullName })} />
                        <DropDown title={'Тип велосипеда:'}
                           id={'typeDetalCase'}
                           type={'text'}
                           name={'type'}
                           options={cases.bikeType}
                           value={values.type}
                           onChange={type => setValues({ ...values, type })} />
                        <Input title={'Цвет велосипеда:'}
                           id={'colorDetalCase'}
                           type={'text'}
                           name={'color'}
                           value={values.color}
                           onChange={color => setValues({ ...values, color })} />
                        <Input title={'Дата кражи:'}
                           id={'dateDetalCase'}
                           type={'text'}
                           name={'date'}
                           value={values.date}
                           onChange={date => setValues({ ...values, date })} />
                        <DropDown title={'Статус сообщения:'}
                           id={'statusDetalCase'}
                           type={'text'}
                           name={'status'}
                           options={cases.caseStatus}
                           value={values.status}
                           onChange={status => setValues({ ...values, status })} />
                     </div>

                     <div className={css.formRight}>
                        <p className={css.label}>Дата создания сообщения:</p>
                        <p className={css.input}>{caseObj.createdAd}</p>
                        <p className={css.label}>Дата последнего обновления сообщения:</p>
                        <p className={css.input}>{caseObj.updatedAd}</p>
                        <p className={css.label}>clientId, уникальный для каждого студента:</p>
                        <p className={css.input}>{caseObj.clientId}</p>
                        {/* {isEdit ?
                        (<> */}
                        <DropDown title={'Ответственный сотрудник:'}
                           id={'officerDetalCase'}
                           type={'text'}
                           name={'officer'}
                           options={arrayOfficersName}
                           value={values.officer}
                           onChange={officer => setValues({ ...values, officer })} />
                        <Textarea title={'Дополнительный комментарий:'}
                           id={'textareaDetalCase'}
                           type={'text'}
                           name={'description'}
                           style={{ height: "30px" }}
                           value={values.description}
                           onChange={description => setValues({ ...values, description })} />
                        <p className={css.label}>Завершающий комментарий:</p>
                        <textarea className={css.textarea}>{caseObj.resolution}</textarea>
                     </div>
                  </div>
                  <div className={css.btn}>
                     <Button name={'Изменить'} type={'submit'} /*form='btn' ref={ref} onClick={handleClick}*/ />
                  </div>
               </form>
            </div>
            {isMessage &&
               <MessageDataSaved
                  isMessage={isMessage}
                  setMessage={setMessage}
                  title={'Данные сохранены'} />
            }
            {cases.isLoading &&
               (<>
                  <div className={css.loading}>
                     <Loader />
                  </div>
               </>)
            }
         </div>
      </div>
   )
}
export default CaseDetal;