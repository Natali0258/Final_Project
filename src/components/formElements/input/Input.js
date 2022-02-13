import React from 'react';
import css from './Input.module.css';

const Input = (props) => {
   const { title, id, type, name, value, required, placeholder, minlength, handleChange } = props;
   return (
      <div className={css.wrapper}>
         <label className={css.label} htmlFor={id}>{title}</label>
         <input className={css.input}
            id={id}
            type={type}
            name={name}
            value={value.name}
            required={required}
            placeholder={placeholder}
            minlength={minlength}
            handleChange={handleChange}
         ></input>
         {type == 'password' &&
            (<span className={css.hint}>Пароль должен содержать восемь или более символов.</span>)
         }
         {type == 'email' &&
            (<span className={css.hint}>Адрес электронной почты должен содержать символ "@".</span>)
         }
      </div>
   )
}
export default Input;