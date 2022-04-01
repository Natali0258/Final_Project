import React from 'react';
import css from './DropDown.module.css';

const DropDown = (props) => {
   const { title, id, type, name, options, value } = props;
   return (
      <div className={css.wrap}>
         <label className={css.label} htmlFor={id}> {title}</label>
         <select className={css.select} id={id}
            type={type}
            name={name}
            value={value.name}
            onChange={e => e.target.value}>
            {
               options.map((option, index) => {
                  return <option className={css.option} key={index} value={index}>{option}</option>
               })
            }
         </select>
      </div>
   )
}
export default DropDown;