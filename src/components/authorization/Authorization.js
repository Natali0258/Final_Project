import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fatchAuthOfficerStarted, fatchAuthOfficerSuccess, fatchAuthOfficerError, } from '../../storage/actions/officerActions';
import Loader from '../loader/Loader';
import AuthorizationResult from '../authorizationResult';
import AuthorizationForm from '../authorizationForm/AuthorizationForm';
import css from './Authorization.module.css';

const Authorization = (props) => {
   const { isLogged, setLogged, isResult, setResult, isFormAuthorization, setFormAuthorization } = props;
   const [isFormError, setFormError] = useState(false);

   const dispatch = useDispatch();
   const isLoading = useSelector(state => state.isLoading);

   const [values, setValues] = useState({
      email: '',
      password: '',
   })

   const handleChange = (e) => {
      console.log('value1=', values);
      const fieldName = e.target.name;
      setValues({ ...values, [fieldName]: e.target.value });
      console.log('value2=', values);
   }


   const handleSubmit = async (event) => {
      //отправляем запрос с паролем и ждем данные о пользователе
      event.preventDefault(); //чтобы страница не перезагружалась

      const officer = {
         email: values.email,
         password: values.password,
         clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
      };

      const options = {
         method: 'POST',
         body: JSON.stringify({
            "email": `${officer.email}`,
            "password": `${officer.password}`,
            "clientId": 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
         }),
         headers: { "content-type": "application/json" }
      }

      dispatch(fatchAuthOfficerStarted())
      console.log('Запрос авторизации сотрудника')

      await fetch('https://sf-final-project.herokuapp.com/api/auth/sign_in', options)
         .then((response) => {
            if (response.status !== 200) {
               return Promise.reject(new Error(response.statusText))
            }
            return Promise.resolve(response)
         })
         .then((response) => response.json())
         .then(data => {
            console.log(data);
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('firstName', data.data.user.firstName);
            // localStorage.getItem('token');
            console.log(localStorage.getItem('firstName'));
            console.log(localStorage.getItem('token'));
            //const firstName = localStorage.getItem('firstName');
            dispatch(fatchAuthOfficerSuccess());
            console.log('Авторизации завершена успешно');

            setLogged(!isLogged);
            console.log('isLoggedAuthorization=', isLogged)
         })
         .catch(error => {
            setFormError(!isFormError);
            // const messageError = error.message;
            // setMessage(isMessage => ({ isMessage: messageError }));
            //console.log('ERROR', error)
            dispatch(fatchAuthOfficerError(error));
         })

      //setResultat(!isResult);
   }

   return (
      <>
         {((isLogged || isFormError) && !isLoading) ?
            (<AuthorizationResult
               isLogged={isLogged} isFormError={isFormError}
               isResult={isResult} setResult={setResult}
               isFormAuthorization={isFormAuthorization}
               setFormAuthorization={setFormAuthorization} />) :
            (<AuthorizationForm
               values={values} setValues={setValues}
               handleSubmit={handleSubmit}
               handleChange={handleChange} />)}
         {isLoading &&
            (<>
               <Loader />
               <p>{'Авторизация...'}</p>
            </>)
         }
      </>
   )
}
export default Authorization;