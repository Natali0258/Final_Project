import React from 'react';
import css from './Loader.module.css';

const Loader = () => {
   console.log('loader');
   return (<div class="lds-spinner">
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