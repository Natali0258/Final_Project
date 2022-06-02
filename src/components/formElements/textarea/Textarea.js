import React from "react";
import css from './Textarea.module.css';

const Textarea = (props) => {
   const { title, id, type, name, value, placeholder, onChange, style } = props;
   return (
      <div className={css.wrapper}>
         <label className={css.label} htmlFor={id}>{title}</label>
         <textarea className={css.textarea}
            id={id}
            type={type}
            name={name}
            style={style}
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)} />
      </div>
   )
}
export default Textarea;