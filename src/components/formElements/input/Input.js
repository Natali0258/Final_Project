import React from 'react';
import css from './Input.module.css';

const Input = (props) => {
   const { title, id, type, name, value, required, placeholder, minlength, onChange } = props;
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
            onChange={e => onChange(e.target.value)}
         ></input>
         {type === 'password' &&
            (<div className={css.hint}>Пароль должен содержать восемь или более символов.</div>)
         }
         {type === 'email' &&
            (<div className={css.hint}>Адрес электронной почты должен содержать символ "@".</div>)
         }
         {type !== 'password' && type !== 'email' &&
            (<div className={css.none}></div>)}
      </div>
   )
}
export default Input;