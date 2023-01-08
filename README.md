# Getting Started with Create React App

![Коллаж](https://user-images.githubusercontent.com/83341999/185465189-4dd1be6a-b6fa-41b9-bf41-ab691439bd10.png)

Привет!

Это мой учебный финальный проект "Сервис проката велосипедов".  Приложение предназначено для учета случаев кражи велосипедов.

Рядовому пользователю приложения доступна ограниченная часть функционала: главная страница и страница с возможностью сообщить о новом случае кражи.

Для сотрудников компании, после регистрации и авторизации, доступны: страница со списком всех известных случаев кражи и страница со списком сотрудников компании. Списки выведены на экран в виде таблицы. 

При клике по любому элементу списка осуществляется переход на детальную страницу, где можно просмотреть подробную информацию о каждом случае кражи и о каждом сотруднике. 

В таблицах предусмотрена возможность удаления сообщения и удаления сотрудника, а на детальной странице предусмотрена возможность редактирования полей. Также на детальной странице сотрудника предусмотрена возможность одобрить сотрудника/снять одобрение при помощи радио кнопок. 

К каждому сообщению о краже можно закрепить определенного сотрудника из списка одобренных сотрудников. 

У каждого сообщения о краже возможны три статуса: new, in_progress и done. При выборе статуса “done” становится доступным и обязательным для заполнения поле завершающего комментария.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
