import React from 'react';
import Button from '../formElements/button/Button';
import css from './Messages.module.css';

const Messages = (props) => {
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
               <tr>
                  <td>Иванов</td>
                  <td>30.07.2021</td>
                  <td>29.07.2021</td>
                  <td>2200000022222</td>
                  <td>sport</td>
                  <td>фиолетовый</td>
                  <td>Петров А.В.</td>
                  <td>одобрен</td>
                  <td className={css.delCheck}><input type='checkbox' name='del' /></td>
               </tr>
               <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className={css.delCheck}><input type='checkbox' name='del' /></td>
               </tr>
               <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className={css.delCheck}><input type='checkbox' name='del' /></td>
               </tr>
               <tr></tr>
            </table>
            <Button name={'Удалить'} />
         </div>
      </div>
   )
}
export default Messages;