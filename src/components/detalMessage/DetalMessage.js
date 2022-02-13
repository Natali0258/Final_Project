import React from 'react';
import css from './DetalMessage.module.css';

const DetalMessage = (props) => {
   return (
      <div className={css.detalMessage}>
         <div className={css.wrapper}>
            <div className={css.messageBike}></div>
            <div className={css.border}>
               <p className={css.title}>Детальная страница сообщения</p>
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
                     <label className={css.label}>Дата кражи</label>
                     <input className={css.input}></input>
                     <label className={css.label}>clientId, уникальный для каждого студента</label>
                     <input className={css.input}></input>
                  </form>
                  <form className={css.formRight}>
                     <label className={css.label}>Статус сообщения</label>
                     <input className={css.input}></input>
                     <label className={css.label}>Дата создания сообщения</label>
                     <input className={css.input}></input>
                     <label className={css.label}>Дата последнего обновления сообщения</label>
                     <input className={css.input}></input>
                     <label className={css.label}>Ответственный сотрудник</label>
                     <input className={css.input}></input>
                     <label className={css.label}>Дополнительный комментарий</label>
                     <input className={css.input}></input>
                     <label className={css.label}>Завершающий комментарий</label>
                     <input className={css.input}></input>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}
export default DetalMessage;