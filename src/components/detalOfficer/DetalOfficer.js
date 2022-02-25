import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../formElements/button/Button';
import Input from '../formElements/input/Input';
import css from './DetalOfficer.module.css';

const DetalOfficer = (props) => {
   const { officers, setOfficers, addNewOfficer } = props;
   const [isEdit, setEdit] = useState(true);
   const [isButton, setButton] = useState(false);
   const params = useParams();
   const { officerId } = params;

   const officer = officers.find(officer => officerId === officer.id)
   console.log('officer.id=', officer.id);
   console.log('officerId=', officerId);

   const handleChange = (e) => {
      const newOfficer = {
         id: officer.id,
         lastName: e.target.value,
         firstName: e.target.value,
         email: officer.email,
         password: officer.password,
         approved: e.target.checked,
      };
      const index = officers.indexOf(officer)
      setOfficers([...officers.slice(0, index), newOfficer, ...officers.slice((index + 1), officers.length)])
   }
   const [value, setValue] = useState('1');
   //const handleChange = (e) => {   
   //const fieldName = e.target.name;
   //setValue({ ...value, [fieldName]: e.target.value });
   //}
   const handleChecked = (e) => {
      setValue(e.target.checked);
   }

   const handleClick = () => {
      setButton(!isButton);
      setEdit(!isEdit);
   }

   return (
      <div className={css.detalOfficer}>
         <div className={css.wrapper}>
            <div className={css.imgOfficer}></div>
            <div className={css.form}>
               <p className={css.title}>Детальная страница сотрудника</p>
               <form className={css.container} onClick={handleClick}>
                  {!isEdit && (
                     <div>
                        <h3 className={css.label}>{'Фамилия сотрудника:'}</h3>
                        <p className={css.input}>{officer.lastName || 'Фамилия не указана'}</p>
                        <h3 className={css.label}>{'Имя сотрудника:'}</h3>
                        <p className={css.input}>{officer.firstName || 'Имя не указано'}</p>
                     </div>
                  )}
                  {isEdit && (<>
                     <Input title={'Фамилия сотрудника:'}
                        id={'lastNameDetalOfficer'}
                        type={'text'}
                        name={'lastName'}
                        value={officer.lastName}
                        onChange={handleChange} />
                     <Input title={'Имя сотрудника:'}
                        id={'firstNameDetalOfficer'}
                        type={'text'}
                        name={'firstName'}
                        value={officer.firstName}
                        onChange={handleChange} />
                  </>)}
                  <h3 className={css.label}>E-mail адрес сотрудника:</h3>
                  <p className={css.input}>{officer.email}</p>
                  <h3 className={css.label}>clientId:</h3>
                  <p className={css.input}>{officer.clientId}</p>
                  <div className={css.statOfficer}>
                     <p className={css.titleStatus}>Статус сотрудника:</p>
                     <div className={css.checkbox}>
                        <span className={css.radioButton}><input id='status1' type='radio' name='status' value='1' checked={value === '1' ? true : false} onChange={handleChecked}></input>
                           <label for='status1' className={css.radio}>одобрить сотрудника</label></span>
                        <span className={css.radioButton}><input id='status2' type='radio' name='status' value='2' checked={value === '2' ? true : false} onChange={handleChecked}></input>
                           <label for='status1' className={css.radio}>снять одобрение</label></span>
                     </div>
                  </div>
                  <div className={css.btn}>
                     <Button name={'Изменить'} />
                  </div>
               </form>
            </div>
         </div >
      </div >
   )
}
export default DetalOfficer;