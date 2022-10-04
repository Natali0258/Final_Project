export const createRequest = (url, method, bodyData, isAuth) => {
   return (
      fetch(`https://sf-final-project.herokuapp.com/api/auth/${url}`,
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
   )
}