import React, { useEffect, useState } from 'react';
import Button from '../formElements/button/Button';
import Input from '../formElements/input';
import AuthorizationResult from '../authorizationResult';
import css from './Authorization.module.css';

const Authorization = (props) => {
   const { isResult, setResultat } = props;
   console.log('isResult in Aut=', isResult);

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


   const handleSubmit = (event) => {
      //отправляем запрос с паролем и ждем данные о пользователе
      event.preventDefault(); //чтобы страница не перезагружалась

      // let userData = this.state.newUser;

      // fetch('//example.com', {
      //    method: "POST",
      //    body: JSON.stringify(userData),
      //    headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //    },
      // }).then(response => {
      //    response.json().then(data => {
      //       console.log("Successful" + data);
      //    })
      // })

      console.log('isResult1=', isResult);
      setResultat(!isResult);
      console.log('isResult2=', isResult);
   }


   // useEffect(() => {
   //    if
   // })

   return (
      <>
         {isResult ?
            (<AuthorizationResult />) :
            (<form className={css.form} onSubmit={handleSubmit}>
               <div className={css.container}>
                  <Input title={'Введите e-mail:'} id={'emailAuthorization'}
                     type={'email'}
                     name={'email'}
                     value={values.email}
                     required={'required'}
                     placeholder={'IvanovIvan@mail.ru'}
                     onChange={handleChange} />
                  <Input title={'Введите пароль:'} id={'passwordAuthorization'}
                     type={'password'}
                     name={'password'}
                     value={values.password}
                     required={'required'}
                     placeholder={'********'}
                     minlength={'8'}
                     onChange={handleChange} />

                  <div className={css.btn}>
                     <Button type={'submit'} name={'Авторизация'} />
                  </div>
               </div>
            </form>)}
      </>
   )
}
export default Authorization;

/*<div className={css.authorization}>
<div className={css.wrapper}>
   <div className={css.imgAuthorization}></div>

   
         </div>
      </div>*/