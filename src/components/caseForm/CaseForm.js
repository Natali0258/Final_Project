import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCase } from '../../storage/actions/casesActions';
import Input from '../formElements/input/Input';
import Textarea from '../formElements/textarea/Textarea';
import DropDovn from '../formElements/dropDown/DropDown';
import Button from '../formElements/button/Button';
import css from './CaseForm.module.css';
import uniqid from 'uniqid';

const CaseForm = () => {
   const dispatch = useDispatch();
   const cases = useSelector(state => state.cases);

   const [values, setValues] = useState({
      id: '',
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

   // const handleChange = (e) => {
   //    const fieldName = e.target.name;
   //    setValues({ ...values, [fieldName]: e.target.value });
   // }

   const handleSubmitCaseForm = (e) => {
      e.preventDefault();
      const cas = {
         id: uniqid(),
         status: 'nev',
         licenseNumber: values.licenseNumber,
         type: values.type,
         ownerFullName: values.ownerFullName,
         clientId: '995544',
         createdAd: values.createdAd,
         updatedAd: values.updatedAd,
         color: values.color,
         date: values.date,
         officer: values.officer,
         description: values.description,
         resolution: '',
      }
      dispatch(addToCase(cas.id, cas.status, cas.licenseNumber, cas.ownerFullName, cas.clientId, cas.createdAd, cas.updatedAd, cas.type, cas.color, cas.date, cas.description, cas.officer, cas.resolution));
   }

   return (
      <div className={css.caseForm}>
         <div className={css.wrapper}>
            <div className={css.formBike}></div>
            <form className={css.form} onSubmit={handleSubmitCaseForm}>
               <h2 className={css.title}>Информация о краже</h2>
               <p className={css.comment}>* Обязательные поля</p>
               <div className={css.container}>
                  <div className={css.formLeft}>
                     <Input title={'Номер лицензии: *'}
                        id={'licenseNumberCaseForm'}
                        type={'number'}
                        name={'licenseNumber'}
                        value={values.licenseNumber}
                        placeholder={'110012'}
                        onChange={licenseNumber => setValues({ ...values, licenseNumber })} />
                     <Input title={'ФИО пользователя: *'}
                        id={'ownerFullNameCaseForm'}
                        type={'text'}
                        name={'ownerFullName'}
                        value={values.ownerFullName}
                        placeholder={'Иванов Иван Иванович'}
                        onChange={ownerFullName => setValues({ ...values, ownerFullName })} />
                     <DropDovn title={'Tип велосипеда: *'}
                        id={'typeBikeCaseForm'}
                        type={'text'}
                        name={'type'}
                        options={bikeType}
                        value={values.type}
                        onChange={option => setValues({ ...values, option })} />
                     <Input title={'Цвет велосипеда:'}
                        id={'colorBikeCaseForm'}
                        type={'text'}
                        name={'color'}
                        value={values.color}
                        placeholder={'black'}
                        onChange={color => setValues({ ...values, color })} />
                  </div>
                  <div className={css.formRight}>
                     <Input title={'Дата кражи:'}
                        id={'dateCaseForm'}
                        type={'date'}
                        name={'date'}
                        value={values.date}
                        onChange={date => setValues({ ...values, date })} />
                     <Textarea title={'Дополнительный комментарий:'}
                        id={'descriptionCaseForm'}
                        type={'text'}
                        name={'description'}
                        value={values.description}
                        onChange={description => setValues({ ...values, description })} />
                     <Input title={'Ответственный сотрудник:'}
                        id={'officerCaseForm'}
                        type={'text'}
                        name={'officer'}
                        value={values.officer}
                        onChange={officer => setValues({ ...values, officer })} />
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