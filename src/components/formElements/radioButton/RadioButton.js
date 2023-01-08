import React from 'react';
import css from './RadioButton.module.css';

const RadioButton = (props) => {
   const { title, id, type, name, value, checked, onChange } = props;
   return (
      <>
         <span className={css.radioButton}>
            <input id={id}
               type={type}
               name={name}
               value={value}
               checked={checked}
               onChange={onChange}>
            </input>
            <label className={css.radio}>
               {title}
            </label>
         </span>
      </>
   )
}
export default RadioButton; 