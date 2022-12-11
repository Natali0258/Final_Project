export const getOfficersName = (officers) => {
   const approvedOfficers = officers.officers.filter(officer => {
      if (officer.approved) {
         return officer;
      }
   })
   console.log('approvedOfficers=', approvedOfficers);

   let officersName = {};
   approvedOfficers.map(officer => {
      return officersName[`${officer._id}`] = `${officer.lastName} ${officer.firstName}`;
   })
   console.log('officersName=', officersName);
   return officersName;
}