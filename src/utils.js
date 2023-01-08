const formatDate = (stringDate) => {
   const date = newDate(stringDate)
   return Date.toLocaleString('ru-RU')
}
export { formatDate }