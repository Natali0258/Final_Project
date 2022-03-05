import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToOfficer } from '../../storage/actions/officerActions';
import Input from '../formElements/input/Input';
import Button from '../formElements/button/Button';
import AuthorizationResult from '../authorizationResult/AuthorizationResult';
import line1 from '../../images/line1.svg';
import line2 from '../../images/line2.svg';
import uniqid from 'uniqid';
import css from './Registration.module.css';

const Registration = (props) => {
   const { isResult, setResult, addNewOfficer, isFormRegistration, setFormRegistration } = props;
   const [isFormOpen, setFormOpen] = useState(true);
   const dispatch = useDispatch();
   const officers = useSelector(state => state.officers);

   const [values, setValues] = useState(
      {
         lastName: '',
         firstName: '',
         email: '',
         password: '',
         clientId: '995544',
         approved: true,
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
         clientId: '995544',
         approved: `${officers.length !== 1 ? 'false' : 'true'}`,
      };
      console.log('id=', officer.id, 'email=', officer.email, 'password=', officer.password, 'firstName=', officer.firstName, 'lastName=', officer.lastName, 'clientId=', officer.clientId, 'approved=', officer.approved);
      dispatch(addToOfficer(officer.id, officer.email, officer.password, officer.firstName, officer.lastName, officer.clientId, officer.approved));

      setValues(
         {
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            clientId: '995544',
            approved: 'false',
         }
      )
      setFormOpen(!isFormOpen);
   }

   return (
      <>
         {isResult ?
            (<AuthorizationResult />) :

            (<div className={css.form} id="entry">
               {isFormOpen ?
                  (<form onSubmit={handleSubmitRegistration}>
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
                  </form >) : (
                     <>
                        <div className={css.cross} onClick={() => setFormRegistration(!isFormRegistration)}>
                           <img className={css.line1} src={line1} alt='' />
                           <img className={css.line2} src={line2} alt='' />
                        </div>
                        <p className={css.success}>{`Пользователь ${values.lastName} ${values.firstName}`} </p>
                        <p className={css.success}>{`с логином:${values.email}`} </p>
                        <p className={css.success}>{'зарегистрирован!'}</p>
                     </>
                  )}
            </div >
            )
         }
      </>
   )
}
export default Registration;