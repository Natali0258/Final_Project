import React from 'react';
import css from './Button.module.css';

const Button = (props) => {
   const { type, name, style, onClick } = props;
   return (
      <>
         <button className={css.btn}
            type={type}
            style={style}
            onClick={onClick}
         >{name}</button>
      </>
   )
}
export default Button;