import React from 'react';
import { useState } from 'react';
import Button from '../formElements/button/Button';
import css from './Messages.module.css';

const Messages = (props) => {
   const { messages } = props;
   const [checked, setChecked] = useState(false);

   const chengeCheckbox = () => {
      setChecked(checked => {
         return !checked
      });
   }

   return (
      <div className={css.messages}>
         <div className={css.wrapper}>
            <div className={css.messageBike}></div>
            <table className={css.table}>
               <tr className={css.tr}>
                  <th>ФИО пользователя</th>
                  <th>Дата создания сообщения</th>
                  <th>Дата кражи</th>
                  <th>Номер лицензии</th>
                  <th>Тип велосипеда</th>
                  <th>Цвет</th>
                  <th>Ответственный сотрудник</th>
                  <th>Статус сообщения</th>
                  <th>Удалить сообщение</th>
               </tr>
               {messages.map(message => {
                  return (
                     <tr>
                        <td>{message.ownerFullName}</td>
                        <td>{message.createdAd}</td>
                        <td>{message.date}</td>
                        <td>{message.licenseNumber}</td>
                        <td>{message.type}</td>
                        <td>{message.color}</td>
                        <td>{message.officer}</td>
                        <td>{message.status}</td>
                        <td className={css.delCheck}><input type='checkbox' name='del' onChange={chengeCheckbox} /></td>
                     </tr>
                  )
               })
               }
            </table>
            <Button name={'Удалить'} />
         </div>
      </div >
   )
}
export default Messages;