import React from 'react';
import { useLocation, Redirect, Route } from 'react-router-dom';

const PrivateRoute = (props) => {
   const token = localStorage.getItem('token');
   const location = useLocation();

   if (token) {
      fetch('https://sf-final-project.herokuapp.com/api/auth/', {
         method: 'GET',
         headers: { 'Authorization': `${token}` }
      })
         //    .then(response => {
         //       console.log('response=', response);
         //       response.json();  
         // })
         .then((response) => {
            if (response.status !== 200) {
               return Promise.reject(new Error(response.status))
            }
            return Promise.resolve(response)
         })
         .then((response) => response.json())
         .then(data => {
            console.log('data=', data);
         })
         .catch(error => {
            return (
               <Redirect to={{ pathname: '/', state: { from: location } }} />
            );
         })
   } //else {
   //    fetch('https://sf-final-project.herokuapp.com/api/auth/sign_in', {
   //       method: 'POST',
   //       body: JSON.stringify({
   //          // "email": `${officer.email}`,
   //          //"password": `${officer.password}`,
   //          "clientId": 'b4609e1b-9a39-46ed-b198-aca28359c8e2',
   //       }),
   //       headers: { "content-type": "application/json" }
   //    })
   //       .then(response => console.log('response=', response))
   // }

}
export default PrivateRoute;