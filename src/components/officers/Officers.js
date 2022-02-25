import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import css from './Officers.module.css';

const Officers = (props) => {
   const { officers, setOfficers, addNewOfficer } = props;
   const [checked, setChecked] = useState(false);

   console.log('officers=', officers);

   function handleChange() {
      setChecked(checked => {
         return !checked
      })
   }

   // const handleChange = (e) => {
   //const fieldName = e.target.name
   //setChecked([fieldName]: e.target.checked)
   //const { name } = e.target;
   //const { checked } = e.target;
   //setChecked({ [name]: checked });
   //setChecked(checked => { return !checked });
   //console.log('!!!')
   // }

   return (
      <div className={css.officers}>
         <div className={css.wrapper}>
            <div className={css.imgOfficer}></div>
            <div className={css.border}>
               <h3 className={css.title}>Ответственные сотрудники</h3>
               <div className={css.container}>
                  <div className={css.lastName}>Фамилия сотрудника</div>
                  <div className={css.firstName}>Имя сотрудника</div>
                  <div className={css.email}>E-mail адрес сотрудника</div>
                  <div className={css.approved}>Статус сотрудника</div>
                  <div className={css.del}>удалить</div>
                  {officers.map(officer => {
                     return (<>
                        <div><Link to={`/officers/${officer.id}`} key={officer.id} {...props}>{officer.lastName}</Link></div>
                        <div><Link to={`/officers/${officer.id}`} key={officer.id} {...props}>{officer.firstName}</Link></div>
                        <div><Link to={`/officers/${officer.id}`} key={officer.id} {...props}>{officer.email}</Link></div>
                        <div><Link to={`/officers/${officer.id}`} key={officer.id} {...props}>{officer.approved ? 'одобрен' : ''}</Link></div>
                        <div><input className={css.delCheck} type='checkbox' name={officer.id} checked={checked} onChange={handleChange} /></div>
                     </>)
                  })}

               </div>
               <button className={css.btn}>Удалить</button>
            </div>
         </div>
      </div>
   )
}
export default Officers;