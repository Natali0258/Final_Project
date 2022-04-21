import React from "react";
import css from './ButtonClose.module.css';
import line1 from '../../../images/line1.svg';
import line2 from '../../../images/line2.svg';

const ButtonClose = (props) => {
   const { onClick } = props;
   return (
      <div className={css.cross} onClick={onClick}>
         <img className={css.line1} src={line1} alt='' />
         <img className={css.line2} src={line2} alt='' />
      </div>
   )
}
export default ButtonClose;