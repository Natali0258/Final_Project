//функция для отправки fetch-запроса без тела (GET, DELETE)
export const createRequest = (url, method, isAuth, dispatch, actionsSuccess, actionsError, id) => {
   return (
      fetch(`https://sf-final-project-be.herokuapp.com/api/${url}`,
         {
            method: method,
            headers: isAuth ? {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${localStorage.getItem('token')}`
            } : {
               "Content-Type": "application/json"
            }
         })
         .then((response) => {
            if (response.status !== 200) {
               return Promise.reject(new Error(response.status))
            }
            return Promise.resolve(response)
         })
         .then((response) => { return response.json(); })
         .then((data) => {
            if (method === 'POST' || method === 'GET') {
               dispatch(actionsSuccess(data));
            } else {
               dispatch(actionsSuccess(id));
            }
         })
         .catch(error => {
            dispatch(actionsError(error))
         })
   )
}