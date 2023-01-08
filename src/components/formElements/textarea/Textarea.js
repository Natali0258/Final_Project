import React from "react";
import css from './Textarea.module.css';

const Textarea = (props) => {
   const { title, id, type, name, value, required, placeholder, onChange, style, isDisabled, isRequired } = props;
   // console.log('isDisabled=', isDisabled)
   return (
      <div className={css.wrapper}>
         <label className={css.label} htmlFor={id}>{title}</label>
         <textarea className={css.textarea}
            id={id}
            type={type}
            name={name}
            style={style}
            value={value}
            required={isRequired}
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={e => onChange(e.target.value)} />
      </div>
   )
}
export default Textarea;