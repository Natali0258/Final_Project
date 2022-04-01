import React from 'react';
import { Link } from 'react-router-dom';
import css from './OfficersTable.module.css';

const OfficersTable = (props) => {
   const { checked, setChecked, officers } = props;

   const { _id, email, password, firstName, lastName, clientId, approved } = officers.officers;

   const handleChange = () => {
      setChecked(!checked)
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
               <tr className={css.tr} key={officer._id}>
                  <td className={css.lastName}><Link to={`/officers/${officer._id}`}>{officer.lastName}</Link></td>
                  <td className={css.firstName}><Link to={`/officers/${officer._id}`}>{officer.firstName}</Link></td>
                  <td className={css.email}><Link to={`/officers/${officer._id}`}>{officer.email}</Link></td>
                  <td className={css.approved}><Link to={`/officers/${officer._id}`}>{officer.approved ? 'одобрен' : ''}</Link></td>
                  <td className={css.del}><input className={css.delCheck} type='checkbox' name={officer._id} checked={checked} onChange={handleChange} /></td>
                  {/* <td className={css.lastName}>{officer.lastName}</td>
                  <td className={css.firstName}>{officer.firstName}</td>
                  <td className={css.email}>{officer.email}</td>
                  <td className={css.approved}>{officer.approved ? 'одобрен' : ''}</td>
                  <td className={css.del}><input className={css.delCheck} type='checkbox' name={officer._id} checked={checked} onChange={handleChange} /></td>*/}
               </tr>
            ))}
         </tbody>
      </table>)
}
export default OfficersTable;