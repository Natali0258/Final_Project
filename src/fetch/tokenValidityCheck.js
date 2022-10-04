import React from "react";
import { useDispatch } from "react-redux";
import { fatchTokenValidityStarted, fatchTokenValiditySuccess, fatchTokenValidityError } from '../storage/actions/officerActions';


export const useTokenValidityCheck = (token) => {
   const dispatch = useDispatch();
   //Запрос для проверки валидности токена.
   dispatch(fatchTokenValidityStarted());
   fetch('https://sf-final-project.herokuapp.com/api/auth/', { headers: { "Authorization": `Bearer ${token}` } })
      .then((response) => {
         if (response.status !== 200) {
            return Promise.reject(new Error(response.status))
         }
         return Promise.resolve(response)
      })
      .then((response) => { return response.json(); })
      .then((data) => {
         console.log("data=", data);
         dispatch(fatchTokenValiditySuccess(data.officer))
      })
      .catch(error => {
         console.log('error', error)
         dispatch(fatchTokenValidityError(error))
      })
}