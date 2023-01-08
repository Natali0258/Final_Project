const mock = {
   activeOfficerId: 1,
   officers: [
      {
         id: '1',
         lastName: 'Сидоров',
         firstName: 'Петр',
         email: 'Sidorov@mail.ru',
         password: 'SP1991',
         clientId: '995544',
         approved: 'true',
      },
      {
         id: '2',
         lastName: 'Иванов',
         firstName: 'Сергей',
         email: 'Ivanov@mail.ru',
         password: 'IS1993',
         clientId: '995544',
         approved: 'false',
      }
   ],
   cases: [
      {
         id: '1',
         status: 'new',
         licenseNumber: '110012',
         type: 'general',
         ownerFullName: 'Петров Вадим Дмитриевич',
         clientId: '995544',
         createdAd: '2021-07-20',
         updatedAd: '2021-07-30',
         color: 'black',
         date: '2021-07-19',
         officer: 'Сидоров',
         description: 'контакт.телефон:+7(913)222-22-22',
         resolution: '',
      },
      {
         id: '2',
         status: 'new',
         licenseNumber: '110012',
         type: 'sport',
         ownerFullName: 'Смирнова Елена Владимировна',
         clientId: '995544',
         createdAd: '2021-08-05',
         updatedAd: '2021-09-11',
         color: 'blue',
         date: '2021-08-04',
         officer: 'Сидоров',
         description: 'контакт.телефон:+7(913)777-22-33',
         resolution: '',
      }
   ],
}
export default mock;