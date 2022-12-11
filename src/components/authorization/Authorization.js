import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAuthStarted, fetchAuthSuccess, fetchAuthError } from '../../storage/actions/authActions';
import { closeAuthorization, closeBurgerMenu } from '../../storage/actions/authActions';
import Loader from '../loader/Loader';
import AuthorizationResult from '../authorizationResult';
import AuthorizationForm from '../authorizationForm/AuthorizationForm';
import css from './Authorization.module.css';
import { fetchRequest } from '../../fetch/fetchRequest';

const Authorization = (props) => {
   const {
      // isLogged, setLogged,
      isResult, setResult, isFormAuthorization, setFormAuthorization } = props;
   const [isFormError, setFormError] = useState(false);
   const [isLogged, setLogged] = useState(false)

   const dispatch = useDispatch();
   //const officers = useSelector(state => state.officers)
   const auth = useSelector(state => state.auth)

   const [values, setValues] = useState({
      email: '',
      password: '',
   })

   const handleChange = (e) => {
      const fieldName = e.target.name;
      setValues({ ...values, [fieldName]: e.target.value });
   }

   const handleSubmit = async (event) => {
      //POST Запрос авторизации сотрудника
      event.preventDefault();

      const officer = {
         email: values.email,
         password: values.password,
         clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
      };

      dispatch(fetchAuthStarted())
      console.log('Запрос авторизации сотрудника');
      await fetchRequest('auth/sign_in', 'POST',
         {
            "email": `${officer.email}`,
            "password": `${officer.password}`,
            "clientId": 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
         }, false, dispatch, fetchAuthSuccess, fetchAuthError,
         setLogged,
         // false, closeBurgerMenu,
         setFormError, isFormError
      )

      //setResultat(!isResult);
   }

   return (
      <>
         {!isLogged && !isFormError ?
            (<AuthorizationForm
               values={values} setValues={setValues}
               handleSubmit={handleSubmit}
               handleChange={handleChange} />) :
            (<AuthorizationResult
               isLogged={isLogged}
               isFormError={isFormError}
               isResult={isResult} setResult={setResult}
               isForm={isFormAuthorization}
               setForm={setFormAuthorization}
            />)}
         {auth.isLoading &&
            (<>
               <div className={css.wrap}>
                  <Loader />
               </div>

            </>)
         }
      </>
   )
}
export default Authorization;