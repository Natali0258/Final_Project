import React from 'react';
import css from './Loader.module.css';

const Loader = () => {
   console.log('loader');
   return (<div className={css.lds_spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
   </div>)
}
export default Loader;