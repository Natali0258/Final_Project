import css from './Error.module.css';

const Error = () => {
   return (
      <div className={css.wrapper} >
         <div className={css.error} >
            <h1 className={css.title}>404</h1>
            <p className={css.text}>Страница не существует.</p>
            <p className={css.text}>Кликните пункт меню "О нас".</p>
         </div>
      </div >
   )
}
export default Error;