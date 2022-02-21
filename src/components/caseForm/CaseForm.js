import React from 'react';
import Input from '../formElements/input/Input';
import Textarea from '../formElements/textarea/Textarea';
import DropDovn from '../formElements/dropDown/DropDown';
import Button from '../formElements/button/Button';
import css from './CaseForm.module.css';
import { useState } from 'react';

const CaseForm = (props) => {
   const { cases, addNewCase } = props;

   const [values, setValues] = useState({
      status: '',
      licenseNumber: '',
      type: '',
      ownerFullName: '',
      clientId: '',
      createdAd: '',
      updatedAd: '',
      color: '',
      date: '',
      officer: '',
      description: '',
      resolution: '',
   })
   const bikeType = ['general', 'sport'];

   const handleChange = (e) => {
      const fieldName = e.target.name;
      setValues({ ...values, [fieldName]: e.target.value });
   }

   const handleSubmitMessageForm = (e) => {
      e.preventDefault();
      addNewCase(values.licenseNumber, values.ownerFullName, values.type, values.color, values.date, values.description, values.officer);
   }

   return (
      <div className={css.caseForm}>
         <div className={css.wrapper}>
            <div className={css.formBike}></div>
            <form className={css.form} onSubmit={handleSubmitMessageForm}>
               <h2 className={css.title}>Информация о краже</h2>
               <div className={css.container}>
                  <div className={css.formLeft}>
                     <Input title={'Номер лицензии:'}
                        id={'licenseNumberCaseForm'}
                        type={'number'}
                        name={'licenseNumber'}
                        value={values.licenseNumber}
                        placeholder={'  110012'}
                        onChange={handleChange} />
                     <Input title={'ФИО пользователя:'}
                        id={'ownerFullNameCaseForm'}
                        type={'text'}
                        name={'ownerFullName'}
                        value={values.ownerFullName}
                        placeholder={'  Иванов Иван Иванович'}
                        onChange={handleChange} />
                     <DropDovn title={'Tип велосипеда:'}
                        id={'typeBikeCaseForm'}
                        type={'text'}
                        name={'type'}
                        options={bikeType}
                        value={values.type}
                        onChange={handleChange} />
                     <Input title={'Цвет велосипеда:'}
                        id={'colorBikeCaseForm'}
                        type={'text'}
                        name={'color'}
                        value={values.color}
                        placeholder={'  black'}
                        onChange={handleChange} />
                  </div>
                  <div className={css.formRight}>
                     <Input title={'Дата кражи:'}
                        id={'dateCaseForm'}
                        type={'date'}
                        name={'date'}
                        value={values.date}
                        onChange={handleChange} />
                     <Textarea title={'Дополнительный комментарий:'}
                        id={'descriptionCaseForm'}
                        type={'text'}
                        name={'description'}
                        value={values.description}
                        onChange={handleChange} />
                     <Input title={'Ответственный сотрудник:'}
                        id={'officerCaseForm'}
                        type={'text'}
                        name={'officer'}
                        value={values.officer}
                        onChange={handleChange} />
                  </div>
               </div>
               <div className={css.button}>
                  <Button type={'submit'} name={'Coxранить'} />
               </div>
            </form>
         </div >
      </div >
   )
}
export default CaseForm;