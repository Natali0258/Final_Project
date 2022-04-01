import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToOfficer, fatchOfficerSendStarted, fatchOfficerSendSuccess, fatchOfficerSendError } from '../../storage/actions/officerActions';
import Input from '../formElements/input/Input';
import Button from '../formElements/button/Button';
import AuthorizationResult from '../authorizationResult/AuthorizationResult';
import line1 from '../../images/line1.svg';
import line2 from '../../images/line2.svg';
import uniqid from 'uniqid';
import Loader from '../loader/Loader';
import css from './Registration.module.css';
import RegistrationResult from '../registrationResult/RegistrationResult';

const Registration = (props) => {
   const { isResult, setResult, addNewOfficer, isFormRegistration, setFormRegistration } = props;
   const [isFormOpen, setFormOpen] = useState(true);
   const [isFormError, setFormError] = useState(false);
   const [isStatus, setStatus] = useState('ERR');
   const [isMessage, setMessage] = useState();
   const dispatch = useDispatch();
   const officers = useSelector(state => state.officers);
   const isLoading = useSelector(state => state.isLoading);

   const [values, setValues] = useState(
      {
         id: '',
         lastName: '',
         firstName: '',
         email: '',
         password: '',
         clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
         approved: true,
         isLoading: false,
      }
   )

   const handleSubmitRegistration = (e) => {
      e.preventDefault(); //чтобы форма не обнавлялась и страница не перезагружалась
      const officer = {
         id: uniqid(),
         lastName: values.lastName,
         firstName: values.firstName,
         email: values.email,
         password: values.password,
         clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
         approved: `${officers.length !== 1 ? 'false' : 'true'}`,
         isLoading: false,
      };

      const options = {
         method: 'POST',
         body: JSON.stringify({
            "id": `${officer.id}`,
            "lastName": `${officer.lastName}`,
            "firstName": `${officer.firstName}`,
            "email": `${officer.email}`,
            "password": `${officer.password}`,
            "clientId": 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
            //"approved": `${officer.approved}`,
         }),
         headers: { "content-type": "application/json" }
      }

      dispatch(fatchOfficerSendStarted())

      //лоудер:
      // let myVar;
      // const myFunction = () => {
      //    myVar = setTimeout(showPage, 3000);
      // }

      // function showPage() {
      //    ReactDOM.render(element, document.getElementById('root'));
      //    document.getElementById("loader").style.display = "none";
      //    document.getElementById("myDiv").style.display = "block";
      // }

      //Запрос для создания новой учетной записи:
      fetch('https://sf-final-project.herokuapp.com/api/auth/sign_up', options)
         .then((response) => {
            if (response.status !== 200) {
               return Promise.reject(new Error(response.message))
            }
            return Promise.resolve(response)
         })
         .then((response) => response.json())
         .then(data => {
            dispatch(fatchOfficerSendSuccess(officer.id))
            console.log('dataRegistration=', data);
            dispatch(addToOfficer(officer.id, officer.email, officer.password, officer.firstName, officer.lastName, officer.clientId, officer.approved));
            setFormOpen(!isFormOpen);
         })
         .catch((error) => {
            dispatch(fatchOfficerSendError(officer.id))
            localStorage.setItem('message', error);
            console.log(localStorage.getItem('message'))
            setFormError(!isFormError);
         })

      console.log('id=', officer.id, 'email=', officer.email, 'password=', officer.password, 'firstName=', officer.firstName, 'lastName=', officer.lastName, 'clientId=', officer.clientId, 'approved=', officer.approved);

      setValues(
         {
            id: '',
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
            approved: 'false',
         }
      )
   }

   return (
      <>
         <div className={css.form} id="entry">

            {isLoading &&
               <Loader />
            }

            {isFormOpen && !isFormError && !isLoading ?
               (<form form onSubmit={handleSubmitRegistration}>
                  <div className={css.container}>
                     <p className={css.comment}>* Обязательные поля</p>
                     <Input title={'Фамилия:'}
                        id={'lastNameRegistration'}
                        type={'text'}
                        name={'lastName'}
                        value={values.lastName}
                        placeholder='Иванов'
                        onChange={lastName => setValues({ ...values, lastName })} />
                     <Input title={'Имя:   '}
                        id={'firstNameRegistration'}
                        type={'text'}
                        name={'firstName'}
                        value={values.firstName}
                        placeholder='Иван'
                        onChange={firstName => setValues({ ...values, firstName })} />
                     <Input title={'E - mail: *'}
                        id={'emailRegistration'}
                        type={'email'}
                        name={'email'}
                        value={values.email}
                        placeholder={'IvanovIvan@mail.ru'}
                        required={'required'}
                        onChange={email => setValues({ ...values, email })} />
                     <Input title={'Пароль: *'}
                        id={'passwordRegistration'}
                        type={'password'}
                        name={'password'}
                        value={values.password}
                        placeholder={'********'}
                        minlength={'8'} //минимальное кол-во знаков
                        required={'required'}
                        onChange={password => setValues({ ...values, password })} />
                     <div className={css.btn}>
                        <Button type={'submit'} name={'Сохранить'} />
                     </div>
                  </div >
               </form >
               ) : (
                  <RegistrationResult
                     isFormOpen={isFormOpen}
                     isFormError={isFormError}
                     isFormRegistration={isFormRegistration}
                     setFormRegistration={setFormRegistration} />
               )}
         </div >


      </>
   )
}
export default Registration;