import React from 'react';
import css from './Input.module.css';

const Input = (props) => {
   const { title, id, type, name, value, required, placeholder, minLength, onChange } = props;
   function checkSpaces(value) {
      if (value === '' || value.trim() !== '') {
         return false;
      } else {
         return true;
      }
   }

   return (
      <div className={css.wrapper}>
         <label className={css.label} htmlFor={id}>{title}</label>
         {<input className={css.input}
            id={id}
            type={type}
            name={name}
            value={value}
            required={required}
            placeholder={placeholder}
            minLength={minLength}
            onChange={e => onChange(e.target.value)}
         >{value.name === null ? '' : value.name}</input>}

         {/* Проверка поля на ввод одних пробелов */}
         {(checkSpaces(value) === true) && required &&
            (<div className={css.checkSpaces}>Поле не должно содержать одни пробелы </div>)}

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