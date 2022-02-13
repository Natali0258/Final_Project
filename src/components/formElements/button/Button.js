import React from 'react';
import css from './Button.module.css';

const Button = (props) => {
   const { type, name } = props;
   return (
      <button className={css.btn} type={'type'}>{name}</button>
   )
}
export default Button;