export const getArrayOfficersName = (officers) => {
   const approvedOfficers = officers.officers.filter(officer => {
      if (officer.approved) {
         return officer;
      }
   })

   let arrayOfficersName = [' '];
   approvedOfficers.map(officer => {
      return arrayOfficersName.push(`${officer.lastName} ${officer.firstName}`);
   })
   return arrayOfficersName;
}