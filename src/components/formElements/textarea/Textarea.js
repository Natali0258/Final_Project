import React from "react";
import css from './Textarea.module.css';

const Textarea = (props) => {
   const { title, id, type, name, value, placeholder, handleChange } = props;
   return (
      <div className={css.wrapper}>
         <label className={css.label} htmlFor={id}>{title}</label>
         <textarea className={css.textarea}
            id={id}
            type={type}
            name={name}
            value={value.name}
            placeholder={placeholder}
            handleChange={handleChange} />
      </div>
   )
}
export default Textarea;