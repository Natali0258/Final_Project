import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOfficerSendStarted, fetchOfficerSendSuccess, fetchOfficerSendError } from '../../storage/actions/officerActions';
import Input from '../formElements/input/Input';
import Button from '../formElements/button/Button';
import uniqid from 'uniqid';
import Loader from '../loader/Loader';
import css from './Registration.module.css';
import RegistrationResult from '../registrationResult/RegistrationResult';
import { fetchRequest } from '../../fetch/fetchRequest';

const Registration = (props) => {
   const { isFormRegistration, setFormRegistration } = props;
   const [isFormOpen, setFormOpen] = useState(true);
   const [isFormError, setFormError] = useState(false);
   //const [isFormRegistration, setFormRegistration] = useState(true);
   const dispatch = useDispatch();
   const officers = useSelector(state => state.officers);

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

   const handleSubmitRegistration = async (e) => {
      e.preventDefault();

      const officer = {
         id: uniqid(),
         lastName: values.lastName,
         firstName: values.firstName,
         email: values.email,
         password: values.password,
         clientId: 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
         approved: `${officers.length !== 1 ? 'false' : 'true'}`,
      };

      //Запрос для создания новой учетной записи:
      dispatch(fetchOfficerSendStarted())
      await fetchRequest('auth/sign_up', 'POST',
         {
            "id": `${officer.id}`,
            "lastName": `${officer.lastName}`,
            "firstName": `${officer.firstName}`,
            "email": `${officer.email}`,
            "password": `${officer.password}`,
            "clientId": 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
         }, false, dispatch, fetchOfficerSendSuccess, fetchOfficerSendError, setFormOpen, setFormError, isFormError)

   }

   return (
      <>
         {officers.isLoading &&
            (<div className={css.wrap}>
               <Loader />
            </div>)
         }
         <div className={css.form} id="entry">

            {isFormOpen && !isFormError
               //  && !officers.isLoading
               ?
               (<form form onSubmit={handleSubmitRegistration}>
                  <div className={css.container}>
                     <p className={css.comment}>* Обязательные поля</p>
                     <Input title={'Фамилия: *'}
                        id={'lastNameRegistration'}
                        type={'text'}
                        name={'lastName'}
                        value={values.lastName}
                        required={'required'}
                        placeholder='Иванов'
                        onChange={lastName => setValues({ ...values, lastName })} />
                     <Input title={'Имя:  *'}
                        id={'firstNameRegistration'}
                        type={'text'}
                        name={'firstName'}
                        value={values.firstName}
                        placeholder='Иван'
                        required={'required'}
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