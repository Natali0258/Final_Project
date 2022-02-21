import React from 'react';
import { useMatch } from 'react-router-dom';
import css from './DetalCase.module.css';

const DetalCase = (props) => {
   const { cases } = props;
   const match = useMatch();
   const { caseId } = match.params;

   const cas = cases.find(cas => caseId === cas.id)

   return (
      <div className={css.detalCase}>
         <div className={css.wrapper}>
            <div className={css.caseBike}></div>
            <div className={css.border}>
               <h2 className={css.title}>Детальная страница сообщения</h2>
               <div className={css.container}>
                  <div className={css.formLeft}>
                     <p className={css.label}>Номер лицензии</p>
                     <p className={css.input}>{cas.licenseNumber}</p>
                     <p className={css.label}>ФИО пользователя</p>
                     <p className={css.input}>{cas.ownerFullName}</p>
                     <p className={css.label}>Тип велосипеда</p>
                     <p className={css.input}>{cas.type}</p>
                     <p className={css.label}>Цвет велосипеда</p>
                     <p className={css.input}>{cas.color}</p>
                     <p className={css.label}>Дата кражи</p>
                     <p className={css.input}>{cas.date}</p>
                     <p className={css.label}>clientId, уникальный для каждого студента</p>
                     <p className={css.input}>{cas.clientId}</p>
                  </div>
                  <div className={css.formRight}>
                     <p className={css.label}>Статус сообщения</p>
                     <p className={css.input}>{cas.status}</p>
                     <p className={css.label}>Дата создания сообщения</p>
                     <p className={css.input}>{cas.createdAd}</p>
                     <p className={css.label}>Дата последнего обновления сообщения</p>
                     <p className={css.input}>{cas.updatedAd}</p>
                     <p className={css.label}>Ответственный сотрудник</p>
                     <p className={css.input}>{cas.officer}</p>
                     <p className={css.label}>Дополнительный комментарий</p>
                     <p className={css.input}>{cas.description}</p>
                     <p className={css.label}>Завершающий комментарий</p>
                     <p className={css.input}>{cas.resolution}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
export default DetalCase;