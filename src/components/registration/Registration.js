import React from 'react';
import { useState } from 'react';
import Input from '../formElements/input/Input';
import Button from '../formElements/button/Button';
import AuthorizationResult from '../authorizationResult/AuthorizationResult';
import css from './Registration.module.css';

const Registration = (props) => {
   const { isResult, setResult } = props;
   const [values, setValues] = useState({
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      clientId: '995544',
      approved: true,
   })

   const handleChange = (e) => {
      const fieldName = e.target.name  //свойство name соответствующего элемента
      setValues({ ...values, [fieldName]: e.target.value }) //в поле, которое меняет пользователь записали значение, которое меняет пользователь   }
   }
   const handleSubmitRegistration = () => {
      setResult(!isResult);
      console.log('values=', values);
   }

   return (
      <>
         {isResult ?
            (<AuthorizationResult />) :
            (<div className={css.form} id="entry">
               <form onSubmit={handleSubmitRegistration}>
                  <div className={css.container}>
                     <p className={css.comment}>* Обязательные поля</p>
                     <Input title={'Фамилия:'} id={'lastNameRegistration'}
                        id={'lastNameRegistration'}
                        type={'text'}
                        name={'lastName'}
                        value={values.lastName}
                        placeholder='Иванов'
                        onChange={handleChange} />
                     <Input title={'Имя:   '} id={'firstNameRegistration'}
                        id={'firstNameRegistration'}
                        type={'text'}
                        name={'FirstName'}
                        value={values.firstName}
                        placeholder='Иван'
                        onChange={handleChange} />
                     <Input title={'E - mail: *'} id={'emailRegistration'}
                        id={'emailRegistration'}
                        type={'email'}
                        name={'email'}
                        value={values.email}
                        placeholder={'IvanovIvan@mail.ru'}
                        required={'required'}
                        onChange={handleChange} />
                     <Input title={'Пароль: *'} id={'passwordRegistration'}
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