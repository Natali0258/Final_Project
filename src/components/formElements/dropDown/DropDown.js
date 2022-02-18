import React from 'react';
import css from './DropDown.module.css';

const DropDown = (props) => {
   const { title, id, type, name, options, value } = props;
   return (
      <div className={css.wrap}>
         <label className={css.label} htmlFor={id}> {title}</label>
         <select className={css.select} value={value} id={id}>
            {
               options.map((item, index) => {
                  <option className={css.option} value={index}>{item}</option>
               })
            }
         </select>
      </div>
   )
}
export default DropDown;