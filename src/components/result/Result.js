import { useDispatch, useSelector } from 'react-redux';
import { closeRegistration, closeResultRegistration, closeModal } from '../../storage/actions/officerActions';
import { closeAuthorization, closeResultAuthorization } from '../../storage/actions/authActions';
import line1 from '../../images/line1.svg';
import line2 from '../../images/line2.svg';
import css from './Result.module.css';
import { output } from '../../storage/actions/authActions';
import { useNavigate } from 'react-router-dom';

const Result = ({ children }) => {
   const isError = useSelector(state => state.auth.isError)
   const isAuthResult = useSelector(state => state.auth.isAuthResult)
   const isRegResult = useSelector(state => state.officers.isRegResult)
   const isRegistration = useSelector(state => state.officers.isRegistration)
   const isAuthorization = useSelector(state => state.auth.isAuthorization)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const clickClose = () => {
      if (isError) {
         dispatch(output())
         dispatch(closeModal())
         navigate("/");
      } else if (!isRegResult && isRegistration) {
         dispatch(closeRegistration())
         dispatch(closeModal())
      } else if (isRegResult && isRegistration) {
         dispatch(closeRegistration())
         dispatch(closeResultRegistration())
         dispatch(closeModal())
      } else if (!isAuthResult && isAuthorization) {
         dispatch(closeAuthorization());
         dispatch(closeModal());
      } else if (isAuthResult && isAuthorization) {
         dispatch(closeAuthorization());
         dispatch(closeResultAuthorization());
         dispatch(closeModal());
      }
   }
   return (
      <div className={css.wrapp}>
         <div className={css.cross}
            onClick={clickClose}
         >
            <img className={css.line1} src={line1} alt='' />
            <img className={css.line2} src={line2} alt='' />
         </div>
         {children}
      </div>
   )
}
export default Result;