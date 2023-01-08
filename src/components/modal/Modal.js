import { useDispatch } from 'react-redux';
import { closeModal, closeRegistration } from '../../storage/actions/officerActions';
import { closeAuthorization } from '../../storage/actions/authActions';
import css from './Modal.module.css';

const Modal = ({ active, children }) => {
   const dispatch = useDispatch();
   return (
      <div className={active ? css.modalactive : css.modal}
         onClick={() => {
            dispatch(closeModal());
            dispatch(closeRegistration());
            dispatch(closeAuthorization());
         }
         }>
         <div className={active ? css.modal__contentaction : css.modal__content}
            onClick={(e) => { e.stopPropagation() }}>
            {children}
         </div>
      </div >

   );
};

export default Modal;