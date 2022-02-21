import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import Input from '../formElements/input/Input';
import css from './DetalOfficer.module.css';

const DetalOfficer = (props) => {
   const { officers } = props;
   const match = useMatch();
   const officerId = match.params;

   const officer = officers.find(officer => officerId === officer.id)

   const [value, setValue] = useState('');
   const handleChange = (e) => {
      const fieldName = e.target.name;
      setValue({ ...value, [fieldName]: e.target.value });
   }
   return (
      <div className={css.detalOfficer}>
         <div className={css.wrapper}>
            <div className={css.imgOfficer}></div>
            <div className={css.form}>
               <p className={css.title}>Детальная страница сотрудника</p>
               <form className={css.container}>
                  <Input title={'Фамилия сотрудника:'}
                     id={'lastNameDetalOfficer'}
                     type={'text'}
                     name={'lastName'}
                     value={officer.lastName}
                     placeholder={'  Иванов'}
                     onChange={handleChange} />
                  <Input title={'Имя сотрудника:'}
                     id={'firstNameDetalOfficer'}
                     type={'text'}
                     name={'firstName'}
                     value={officer.firstName}
                     placeholder={'  Иван'}
                     onChange={handleChange} />
                  <label className={css.label}>E-mail адрес сотрудника:</label>
                  <input className={css.input}></input>
                  <label className={css.label}>clientId:</label>
                  <input className={css.input}></input>
                  <div className={css.statOfficer}>
                     <p className={css.titleStatus}>Статус сотрудника:</p>
                     <div className={css.checkbox}>
                        <span className={css.radioButton}><input id='status1' type='radio' name='status' value='true' checked={value === 'true' ? true : false} onChange={handleChange}></input>
                           <label for='status1' className={css.radio}>одобрить сотрудника</label></span>
                        <span className={css.radioButton}><input id='status2' type='radio' name='status' value='false' checked={value === 'false' ? true : false} onChange={handleChange}></input>
                           <label for='status1' className={css.radio}>снять одобрение</label></span>
                     </div>
                  </div>
               </form>
            </div>
         </div >
      </div >
   )
}
export default DetalOfficer;