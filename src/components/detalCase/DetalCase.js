import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Button from '../formElements/button/Button';
import Input from '../formElements/input/Input';
import css from './DetalCase.module.css';

const DetalCase = (props) => {
   const { cases } = props;
   const params = useParams();
   const { caseId } = params;

   const cas = cases.find(cas => caseId === cas.id)

   const [value, setValue] = useState(cas);
   const [isEdit, setEdit] = useState(true);

   const handleChange = (e) => {
      const fieldName = e.target.name;
      setValue({ ...value, [fieldName]: e.target.value })
   }

   return (
      <div className={css.detalCase}>
         <div className={css.wrapper}>
            <div className={css.caseBike}></div>
            <div className={css.border}>
               <h2 className={css.title}>Детальная страница сообщения</h2>
               <form className={css.container}>
                  <div className={css.formLeft}>
                     {isEdit ?
                        (<>
                           <Input title={'Номер лицензии:'}
                              id={'licenseNumberDetalCase'}
                              type={'text'}
                              name={'licenseNumber'}
                              value={cas.licenseNumber}
                              onChange={handleChange} />
                           <Input title={'ФИО пользователя:'}
                              id={'ownerFullNameDetalCase'}
                              type={'text'}
                              name={'ownerFullName'}
                              value={cas.ownerFullName}
                              onChange={handleChange} />
                           <Input title={'Тип велосипеда:'}
                              id={'typeDetalCase'}
                              type={'text'}
                              name={'type'}
                              value={cas.type}
                              onChange={handleChange} />
                           <Input title={'Цвет велосипеда:'}
                              id={'colorDetalCase'}
                              type={'text'}
                              name={'type'}
                              value={cas.type}
                              onChange={handleChange} />
                           <Input title={'Дата кражи:'}
                              id={'dateDetalCase'}
                              type={'text'}
                              name={'date'}
                              value={cas.date}
                              onChange={handleChange} />
                           <Input title={'Статус сообщения:'}
                              id={'statusDetalCase'}
                              type={'text'}
                              name={'status'}
                              value={cas.status}
                              onChange={handleChange} />
                        </>) : (<>
                           <p className={css.label}>Номер лицензии:</p>
                           <p className={css.input}>{cas.licenseNumber}</p>
                           <p className={css.label}>ФИО пользователя:</p>
                           <p className={css.input}>{cas.ownerFullName}</p>
                           <p className={css.label}>Тип велосипеда:</p>
                           <p className={css.input}>{cas.type}</p>
                           <p className={css.label}>Цвет велосипеда:</p>
                           <p className={css.input}>{cas.color}</p>
                           <p className={css.label}>Дата кражи:</p>
                           <p className={css.input}>{cas.date}</p>
                           <p className={css.label}>Статус сообщения:</p>
                           <p className={css.input}>{cas.status}</p>
                        </>)}
                  </div>

                  <div className={css.formRight}>

                     <p className={css.label}>Дата создания сообщения:</p>
                     <p className={css.input}>{cas.createdAd}</p>
                     <p className={css.label}>Дата последнего обновления сообщения:</p>
                     <p className={css.input}>{cas.updatedAd}</p>
                     <p className={css.label}>clientId, уникальный для каждого студента:</p>
                     <p className={css.input}>{cas.clientId}</p>
                     {isEdit ?
                        (<>
                           <Input title={'Ответственный сотрудник:'}
                              id={'officerDetalCase'}
                              type={'text'}
                              name={'officer'}
                              value={cas.officer}
                              onChange={handleChange} />
                           <Input title={'Дополнительный комментарий:'}
                              id={'descriptionDetalCase'}
                              type={'text'}
                              name={'description'}
                              value={cas.description}
                              onChange={handleChange} />
                           <Input title={'Завершающий комментарий:'}
                              id={'resolutionDetalCase'}
                              type={'tresolution'}
                              value={cas.resolution}
                              onChange={handleChange} />
                        </>) : (<>
                           <p className={css.label}>Ответственный сотрудник:</p>
                           <p className={css.input}>{cas.officer}</p>
                           <p className={css.label}>Дополнительный комментарий:</p>
                           <p className={css.input}>{cas.description}</p>
                           <p className={css.label}>Завершающий комментарий:</p>
                           <p className={css.input}>{cas.resolution}</p>
                        </>)}
                  </div>
               </form>
               <div className={css.btn}>
                  <Button name={'Изменить'} />
               </div>
            </div>
         </div>
      </div>
   )
}
export default DetalCase;