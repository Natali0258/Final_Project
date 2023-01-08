import React from 'react';
import Button from '../formElements/button/Button';
import Input from '../formElements/input';
import css from './AuthorizationForm.module.css';

const AuthorizationForm = (props) => {
   const { handleSubmit, values, setValues } = props;
   return (
      <form className={css.form} onSubmit={handleSubmit}>
         <div className={css.container}>
            <Input title={'Введите e-mail:'} id={'emailAuthorization'}
               type={'email'}
               name={'email'}
               value={values.email}
               required={'required'}
               placeholder={'IvanovIvan@mail.ru'}
               onChange={email => setValues({ ...values, email })} />
            <div className={css.blank}></div>
            <Input title={'Введите пароль:'} id={'passwordAuthorization'}
               type={'password'}
               name={'password'}
               value={values.password}
               required={'required'}
               placeholder={'********'}
               minLength={'8'}
               onChange={password => setValues({ ...values, password })} />
            <div className={css.blank}></div>
            <div className={css.btn}>
               <Button type={'submit'} name={'Авторизация'} />
            </div>
         </div>
      </form>
   )
}
export default AuthorizationForm;