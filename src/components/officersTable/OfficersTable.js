import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createRequest } from '../../fetch/createRequest';
import { getModal, fetchTokenValidityStarted, fetchTokenValiditySuccess, fetchTokenValidityError } from '../../storage/actions/officerActions';
import { fetchOfficerRemoveStarted, fetchOfficerRemoveSuccess, fetchOfficerRemoveError } from '../../storage/actions/officerActions';
import { tokenError } from '../../storage/actions/authActions';
import Button from '../formElements/button/Button';
import css from './OfficersTable.module.css';

const OfficersTable = () => {
   const dispatch = useDispatch();
   const officers = useSelector(state => state.officers);

   const handleDelete = async (officer) => {
      const token = localStorage.getItem('token');

      if (token) {
         //GET Запрос для проверки валидности токена.
         dispatch(fetchTokenValidityStarted());
         await createRequest('auth/', 'GET', true, dispatch, fetchTokenValiditySuccess, fetchTokenValidityError)

         //DEL Запрос для удаления данных сотрудника (доступен только авторизованным пользователям):
         dispatch(fetchOfficerRemoveStarted());
         const officerId = officer._id;

         await createRequest(`officers/${officerId}`, 'DELETE', true, dispatch, fetchOfficerRemoveSuccess, fetchOfficerRemoveError, officerId)

      } else {
         //вывод сообщения "Token нет в localStorage, авторизуйтесь"
         dispatch(getModal())
         dispatch(tokenError())
      }
   }

   return (
      <table>
         <thead className={css.thead}>
            <tr className={css.th}>
               <th className={css.lastName}>Фамилия сотрудника</th>
               <th className={css.firstName}>Имя сотрудника</th>
               <th className={css.email}>E-mail адрес сотрудника</th>
               <th className={css.approved}>Статус сотрудника</th>
               <th className={css.del}>удалить</th>
            </tr>
         </thead>
         <tbody className={css.tbody}>
            {officers.officers.length && officers.officers.map(officer => (
               <tr className={css.tr} key={officer._id} >
                  <td className={css.lastName}><Link to={`/officers/${officer._id}`}>{officer.lastName}</Link></td>
                  <td className={css.firstName}><Link to={`/officers/${officer._id}`}>{officer.firstName}</Link></td>
                  <td className={css.email}><Link to={`/officers/${officer._id}`}>{officer.email}</Link></td>
                  <td className={css.approved}><Link to={`/officers/${officer._id}`}>{officer.approved ? 'одобрен' : ''}</Link></td>
                  <td className={css.del}>
                     <Button type={'button'}
                        name={'удалить'}
                        style={{ fontSize: "18px", padding: "3px 8px 4px", lineHeight: "100%" }}
                        onClick={() => handleDelete(officer)} />
                  </td>
               </tr>
            ))}
         </tbody>
      </table>)
}
export default OfficersTable;