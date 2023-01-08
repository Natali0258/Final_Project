import React from 'react';
import css from './Button.module.css';

const Button = (props) => {
   const { type, name, style, onClick, ref } = props;
   return (
      <>
         <button className={css.btn}
            type={type}
            style={style}
            ref={ref}
            onClick={onClick}
         >{name}</button>
      </>
   )
}
export default Button;