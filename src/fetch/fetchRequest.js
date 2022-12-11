export const fetchRequest = (url, method, bodyData, isAuth, dispatch, actionsSuccess, actionsError, setMessage,
   // isBurgerMenu, actionsBurgerMenu, 
   setFormError, isFormError) => {
   return (
      fetch(`https://sf-final-project-be.herokuapp.com/api/${url}`,
         {
            method: method,
            body: JSON.stringify(bodyData),
            headers: isAuth ? {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${localStorage.getItem('token')}`
            } : {
               "Content-Type": "application/json"
            }
         })
         .then((response) => {
            console.log(response);
            //console.log('fetchIsFormError=', isFormError);
            if (!response.ok) {
               console.log('!okIsFormError=', isFormError);
               response.text()
                  .then(text => { return JSON.parse(text) })
                  .then(text => {
                     const message = text.message;
                     localStorage.setItem('message', message)
                     console.log('textMessage=', message)
                     // dispatch(actionsBurgerMenu);
                     // console.log('isBurgerMenu=', isBurgerMenu)
                     setFormError(!isFormError);
                  })
               return Promise.reject(new Error(response.status))
            }
            return Promise.resolve(response)
         })
         .then((response) => { return response.json() })
         .then((data) => {
            if (url === 'auth/sign_in') {
               localStorage.setItem('token', data.data.token);
               localStorage.setItem('firstName', data.data.user.firstName);
            }
            dispatch(actionsSuccess(data));
            if (url === 'auth/sign_in' || url === 'cases/' || url === 'public/report') {
               setMessage(true);
            } else if (url === 'auth/sign_up') {
               setMessage(false);
            }
            // if (!isBurgerMenu) dispatch(actionsBurgerMenu)
            // console.log('isBurgerMenu=', isBurgerMenu)
         })
         .catch(error => {
            console.log('error', error)
            dispatch(actionsError(error))
            //localStorage.setItem('message', error);
            // setFormError(!isFormError);
         })
   )
}