export const changeDateFormat = (date) => {
   const Year = date.getFullYear();
   const getDayMonth = (date) => {
      const dateDay = date.getDate()
      const dateMonth = date.getMonth()
      let result;
      if (dateDay < 10 && dateMonth < 9) {
         result = 0 + `${dateDay}` + "." + 0 + `${dateMonth + 1}`
         //console.log('result1=', result)
         return result
      } else if (dateDay < 10 && dateMonth >= 9) {
         result = 0 + `${dateDay}` + "." + `${dateMonth + 1}`
         //console.log('result2=', result)
         return result
      } else if (dateDay >= 10 && dateMonth < 9) {
         result = `${dateDay}` + "." + 0 + `${dateMonth + 1}`
         //console.log('result3=', result)
         return result
      } else {
         result = `${dateDay}` + "." + `${dateMonth + 1}`
         //console.log('result4=', result)
         return result
      }
   };
   const DayAndMonth = getDayMonth(date);

   const Hour = date.getHours();
   const Minutes = date.getMinutes();
   const Seconds = date.getSeconds();
   const editDate = DayAndMonth + '.' + Year + ' ' + Hour + ':' + Minutes + ':' + Seconds
   //console.log('editDate=', editDate)
   return editDate;
}