import React, { useState } from 'react';
import css from './DetalOfficer.module.css';

const DetalOfficer = (props) => {
   const [value, setValue] = useState('');
   const handleChange = (event) => {
      setValue({ value: event.target.value });
   }
   return (
      <div className={css.detalOfficer}>
         <div className={css.wrapper}>
            <div className={css.imgOfficer}></div>
            <div className={css.form}>
               <p className={css.title}>Детальная страница сотрудника</p>
               <form className={css.container}>
                  <label className={css.label}>Фамилия сотрудника:</label>
                  <input className={css.label}></input>
                  <label className={css.label}>Имя сотрудника:</label>
                  <input className={css.input}></input>
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