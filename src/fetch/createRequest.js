export const createRequest = (url, method, isAuth, dispatch, actionsSuccess, actionsError, id) => {
   return (
      // fetch(`https://skillfactory-final-project.herokuapp.com/api/${url}`,
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
            console.log(response);
            if (response.status !== 200) {
               return Promise.reject(new Error(response.status))
            }
            return Promise.resolve(response)
         })
         .then((response) => { return response.json(); })
         .then((data) => {
            console.log("data=", data);
            if (method === 'POST' || method === 'GET') {
               console.log("method === POST || GET");
               dispatch(actionsSuccess(data));
            } else {
               console.log("method === DELETE");
               dispatch(actionsSuccess(id));
            }
         })
         .catch(error => {
            console.log('error', error)
            dispatch(actionsError(error))
         })
   )
}