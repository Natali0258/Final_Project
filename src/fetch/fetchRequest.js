//функция для отправки fetch-запроса c телом (POST, PUT)
export const fetchRequest = (url, method, bodyData, isAuth, dispatch, actionsSuccess,
   actionsError, setMessage, setFormError, isFormError) => {
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
            if (!response.ok) {
               response.text()
                  .then(text => { return JSON.parse(text) })
                  .then(text => {
                     const message = text.message;
                     localStorage.setItem('message', message)
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
            if (url === 'auth/sign_in' || url === 'cases/' ||
               url === 'public/report' || url === 'auth/sign_up') {
               setMessage(true);
            }
         })
         .catch(error => {
            dispatch(actionsError(error))
         })
   )
}