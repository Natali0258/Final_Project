import React from 'react';
import css from './DropDown.module.css';

const DropDown = (props) => {
   const { title, id, type, name, required, options, value, onChange } = props;
   return (
      <div className={css.wrap}>
         <label className={css.label} htmlFor={id}> {title}</label>
         <select className={css.select} id={id}
            type={type}
            name={name}
            value={value}
            required={required}
            onChange={e => onChange(e.target.value)}>
            {
               options.map((option, index) => {
                  return <option className={css.option}
                     key={index} value={option}>
                     {option}</option>
               })
            }
         </select>
      </div >
   )
}
export default DropDown;