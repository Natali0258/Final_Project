import React from 'react';
import { useState } from 'react';
import Input from '../formElements/input/Input';
import Button from '../formElements/button/Button';
import AuthorizationResult from '../authorizationResult/AuthorizationResult';
import css from './Registration.module.css';

const Registration = (props) => {
   const { isResult, setResult, addNewOfficer, isFormRegistration, setFormRegistration } = props;
   const [values, setValues] = useState({
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      clientId: '995544',
      approved: true,
   })
   console.log('isFormRegistration=', isFormRegistration)
   const handleChange = (e) => {
      const fieldName = e.target.name;  //свойство name соответствующего элемента
      setValues({ ...values, [fieldName]: e.target.value }) //в поле, которое меняет пользователь записали значение, которое меняет пользователь   }
      console.log('value_Chang_Registration=', values)
   }
   const handleSubmitRegistration = (e) => {
      e.preventDefault(); //чтобы форма не обнавлялась и страница не перезагружалась

      addNewOfficer(values.lastName, values.firstName, values.email, values.password);
      console.log('values_Registration1=', values.lastName, values.firstName, values.email, values.password)
      setValues({
         lastName: '',
         firstName: '',
         email: '',
         password: '',
      })//сброс данных формы

      setFormRegistration(!isFormRegistration); //закрыли форму регистрации
      console.log('values_Registration2=', values)
   }

   return (
      <>
         {isResult ?
            (<AuthorizationResult />) :
            (<div className={css.form} id="entry">
               <form onSubmit={handleSubmitRegistration}>
                  <div className={css.container}>
                     <p className={css.comment}>* Обязательные поля</p>
                     <Input title={'Фамилия:'}
                        id={'lastNameRegistration'}
                        type={'text'}
                        name={'lastName'}
                        value={values.lastName}
                        placeholder='Иванов'
                        onChange={handleChange} />
                     <Input title={'Имя:   '}
                        id={'firstNameRegistration'}
                        type={'text'}
                        name={'FirstName'}
                        value={values.firstName}
                        placeholder='Иван'
                        onChange={handleChange} />
                     <Input title={'E - mail: *'}
                        id={'emailRegistration'}
                        type={'email'}
                        name={'email'}
                        value={values.email}
                        placeholder={'IvanovIvan@mail.ru'}
                        required={'required'}
                        onChange={handleChange} />
                     <Input title={'Пароль: *'}
                        id={'passwordRegistration'}
                        type={'password'}
                        name={'password'}
                        value={values.password}
                        placeholder={'********'}
                        minlength={'8'} //минимальное кол-во знаков
                        required={'required'}
                        onChange={handleChange} />
                     <div className={css.btn}>
                        <Button type={'submit'} name={'Сохранить'} />
                     </div>
                  </div >
               </form >
            </div >)}
      </>
   )
}
export default Registration;