import React from 'react';
import ButtonClose from '../formElements/buttonClose/ButtonClose';
import css from './MessageDataSaved.module.css';

const MessageDataSaved = (props) => {
   const { isMessage, setMessage, title } = props;

   const handleClose = () => {
      setMessage(!isMessage)
   }

   return (
      <>
         <div className={css.message}>
            <ButtonClose onClick={handleClose} />
            <h2 className={css.save}>{title}</h2>
         </div>
      </>
   )
}
export default MessageDataSaved;