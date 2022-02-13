import React from 'react';
import css from './MessageForm.module.css';

const MessageForm = (props) => {
   return (
      <div className={css.messageForm}>
         <div className={css.wrapper}>
            <div className={css.formBike}></div>
            <div className={css.form}>
               <p className={css.title}>Информация о краже</p>
               <div className={css.container}>
                  <form className={css.formLeft}>
                     <label className={css.label}>Номер лицензии</label>
                     <input className={css.input}></input>
                     <label className={css.label}>ФИО пользователя</label>
                     <input className={css.input}></input>
                     <label className={css.label}>Тип велосипеда</label>
                     <input className={css.input}></input>
                     <label className={css.label}>Цвет велосипеда</label>
                     <input className={css.input}></input>

                  </form>
                  <form className={css.formRight}>
                     <label className={css.label}>Дата кражи</label>
                     <input className={css.input}></input>
                     <label className={css.label}>Дополнительный комментарий</label>
                     <inputarea className={css.inputarea}></inputarea>
                     <label className={css.label}>Ответственный сотрудник</label>
                     <input className={css.input}></input>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}
export default MessageForm;