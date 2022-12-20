import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createRequest } from '../../fetch/createRequest';
import { fetchRequest } from '../../fetch/fetchRequest';
import { fetchTokenValidityStarted, fetchTokenValiditySuccess, fetchTokenValidityError, getModal } from '../../storage/actions/officerActions';
import { fetchCaseGetStarted, fetchCaseGetSuccess, fetchCaseGetError } from '../../storage/actions/casesActions';
import { fetchCaseEditStarted, fetchCaseEditSuccess, fetchCaseEditError } from '../../storage/actions/casesActions';
import { fetchOfficersGetStarted, fetchOfficersGetSuccess, fetchOfficersGetError } from '../../storage/actions/officerActions';
import { tokenError } from '../../storage/actions/authActions';
import { getOfficersName } from '../getOfficersName';
import { getArrayOfficersName } from '../getArrayOfficersName';
import Button from '../formElements/button/Button';
import ButtonClose from '../formElements/buttonClose/ButtonClose';
import Input from '../formElements/input/Input';
import DropDown from '../formElements/dropDown/DropDown';
import Textarea from '../formElements/textarea/Textarea';
import MessageDataSaved from '../messageDataSaved/MessageDataSaved';
import Loader from '../loader/Loader';
import css from './CaseDetal.module.css';

const CaseDetal = (props) => {
   const [isMessage, setMessage] = useState(false);
   const ref = useRef(null);
   const [isDisabled, setDisabled] = useState(true);
   const [isRequired, setRequired] = useState(false)
   const params = useParams();
   const { caseId } = params;

   const dispatch = useDispatch();
   const cases = useSelector(state => state.cases);
   const officers = useSelector(state => state.officers);

   useEffect(() => {
      async function fetchData() {

         //localStorage.removeItem('token')
         const token = localStorage.getItem('token');
         console.log('token=', token);

         if (token) {
            //Запрос для проверки валидности токена.
            dispatch(fetchTokenValidityStarted());
            await createRequest('auth/', 'GET', true, dispatch, fetchTokenValiditySuccess, fetchTokenValidityError)

            //GET Запрос для получения данных одного сообщения о краже (доступен только авторизованным пользователям):
            dispatch(fetchCaseGetStarted());
            await createRequest(`cases/${caseId}`, 'GET', true, dispatch, fetchCaseGetSuccess, fetchCaseGetError)

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

   //Получим список сотрудников со статусом "одобрен":
   const officersName = getOfficersName(officers);

   //Находим по id объект (случай кражи)
   const caseObj = cases.cases.find(caseObj => caseId === caseObj._id)
   console.log('caseObj=', caseObj)
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
         createdAt: caseObj.createdAt,
         updatedAt: caseObj.updatedAt,
      }
   );

   //Формируем массив arrayOfficersName из имен ответственных сотрудников, 
   //которые образованны из свойств lastName и firstName
   const arrayOfficersName = getArrayOfficersName(officers);

   //находим у объекта officersName ключ (id), зная значение (name)
   function getOfficerId(officersName) {
      for (let key in officersName) {
         if (officersName[key] === values.officer) {
            return key;
         }
      }
   }
   const officerId = getOfficerId(officersName);

   const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if (token) {
         //Запрос для проверки валидности токена.
         dispatch(fetchTokenValidityStarted());
         await createRequest('auth/', 'GET', false, dispatch, fetchTokenValiditySuccess, fetchTokenValidityError)

         //PUT Запрос для редактирования сообщения о краже 
         //(доступен только авторизованным пользователям):
         let date = new Date();
         let Year = date.getFullYear();
         let Month = date.getMonth();
         let Day = date.getDate();
         let Hour = date.getHours();
         let Minutes = date.getMinutes();
         let Seconds = date.getSeconds();
         let editDate = Day + '.' + Month + '.' + Year + ' ' + Hour + ':' + Minutes + ':' + Seconds
         console.log('editDate=', editDate)

         const data = {
            "licenseNumber": `${values.licenseNumber}`,
            "ownerFullName": `${values.ownerFullName}`,
            "type": `${values.type}`,
            "color": `${values.color}`,
            "date": `${values.date}`,
            "status": `${values.status}`,
            "officer": officerId,
            "description": `${values.description}`,
            "resolution": `${values.resolution}`,
            "updatedAt": `${editDate}`,
            //"createdAt": `${values.createdAt}`,
         }

         dispatch(fetchCaseEditStarted());
         console.log('caseObj._id', caseObj._id, 'caseId=', caseId, 'data=', data)
         await fetchRequest(`cases/${caseId}`, 'PUT', data, true, dispatch, fetchCaseEditSuccess, fetchCaseEditError, setMessage)

      } else {
         //вывод сообщения "Token нет в localStorage, авторизуйтесь"
         dispatch(getModal())
         dispatch(tokenError())
      }
   }

   const handleChange = (status) => {
      if (status === 'done') {
         setDisabled(false)
         setRequired(true)
         console.log('isDisabled1=', isDisabled)
         console.log('isRequired1=', isRequired)
         setValues({ ...values, status })
      } else {
         setDisabled(true)
         setRequired(false)
         console.log('isDisabled2=', isDisabled)
         console.log('isRequired2=', isRequired)
         setValues({ ...values, status })
      }
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
                           onChange={handleChange} />
                     </div>

                     <div className={css.formRight}>
                        <p className={css.label}>Дата создания сообщения:</p>
                        <p className={css.input}>{caseObj.createdAt}</p>
                        <p className={css.label}>Дата последнего обновления сообщения:</p>
                        <p className={css.input}>{caseObj.updatedAt}</p>
                        <p className={css.label}>clientId, уникальный для каждого студента:</p>
                        <p className={css.input}>{caseObj.clientId}</p>
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
                           value={values.description === "null" ? '' : values.description}
                           onChange={description => setValues({ ...values, description })} />
                        <Textarea title={'Завершающий комментарий:'}
                           id={'resolutionDetalCase'}
                           type={'text'}
                           name={'resolution'}
                           isDisabled={isDisabled}
                           isRequired={isRequired}
                           style={{ height: "30px" }}
                           value={values.resolution === "null" ? '' : values.resolution}
                           onChange={resolution => setValues({ ...values, resolution })} />
                     </div>
                  </div>
                  <div className={css.btn}>
                     <Button name={'Изменить'} type={'submit'} />
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