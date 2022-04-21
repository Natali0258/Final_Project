import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Button from '../formElements/button/Button';
import Input from '../formElements/input/Input';
import css from './CaseDetal.module.css';

const CaseDetal = (props) => {
   const { cases } = props;
   const params = useParams();
   const { caseId } = params;

   const caseObj = cases.find(cas => caseId === caseObj.id)

   const [value, setValue] = useState(caseObj);
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
                              value={caseObj.licenseNumber}
                              onChange={handleChange} />
                           <Input title={'ФИО пользователя:'}
                              id={'ownerFullNameDetalCase'}
                              type={'text'}
                              name={'ownerFullName'}
                              value={caseObj.ownerFullName}
                              onChange={handleChange} />
                           <Input title={'Тип велосипеда:'}
                              id={'typeDetalCase'}
                              type={'text'}
                              name={'type'}
                              value={caseObj.type}
                              onChange={handleChange} />
                           <Input title={'Цвет велосипеда:'}
                              id={'colorDetalCase'}
                              type={'text'}
                              name={'type'}
                              value={caseObj.type}
                              onChange={handleChange} />
                           <Input title={'Дата кражи:'}
                              id={'dateDetalCase'}
                              type={'text'}
                              name={'date'}
                              value={caseObj.date}
                              onChange={handleChange} />
                           <Input title={'Статус сообщения:'}
                              id={'statusDetalCase'}
                              type={'text'}
                              name={'status'}
                              value={caseObj.status}
                              onChange={handleChange} />
                        </>) : (<>
                           <p className={css.label}>Номер лицензии:</p>
                           <p className={css.input}>{caseObj.licenseNumber}</p>
                           <p className={css.label}>ФИО пользователя:</p>
                           <p className={css.input}>{caseObj.ownerFullName}</p>
                           <p className={css.label}>Тип велосипеда:</p>
                           <p className={css.input}>{caseObj.type}</p>
                           <p className={css.label}>Цвет велосипеда:</p>
                           <p className={css.input}>{caseObj.color}</p>
                           <p className={css.label}>Дата кражи:</p>
                           <p className={css.input}>{caseObj.date}</p>
                           <p className={css.label}>Статус сообщения:</p>
                           <p className={css.input}>{caseObj.status}</p>
                        </>)}
                  </div>

                  <div className={css.formRight}>

                     <p className={css.label}>Дата создания сообщения:</p>
                     <p className={css.input}>{caseObj.createdAd}</p>
                     <p className={css.label}>Дата последнего обновления сообщения:</p>
                     <p className={css.input}>{caseObj.updatedAd}</p>
                     <p className={css.label}>clientId, уникальный для каждого студента:</p>
                     <p className={css.input}>{caseObj.clientId}</p>
                     {isEdit ?
                        (<>
                           <Input title={'Ответственный сотрудник:'}
                              id={'officerDetalCase'}
                              type={'text'}
                              name={'officer'}
                              value={caseObj.officer}
                              onChange={handleChange} />
                           <Input title={'Дополнительный комментарий:'}
                              id={'descriptionDetalCase'}
                              type={'text'}
                              name={'description'}
                              value={caseObj.description}
                              onChange={handleChange} />
                           <Input title={'Завершающий комментарий:'}
                              id={'resolutionDetalCase'}
                              type={'tresolution'}
                              value={caseObj.resolution}
                              onChange={handleChange} />
                        </>) : (<>
                           <p className={css.label}>Ответственный сотрудник:</p>
                           <p className={css.input}>{caseObj.officer}</p>
                           <p className={css.label}>Дополнительный комментарий:</p>
                           <p className={css.input}>{caseObj.description}</p>
                           <p className={css.label}>Завершающий комментарий:</p>
                           <p className={css.input}>{caseObj.resolution}</p>
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
export default CaseDetal;