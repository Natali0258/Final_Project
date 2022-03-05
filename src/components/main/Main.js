import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../mainPage/MainPage';
import Authorization from '../authorization/Authorization';
import CaseForm from '../caseForm/CaseForm';
import Cases from '../cases/Cases';
import DetalCase from '../detalCase/DetalCase';
import Officers from '../officers/Officers';
import DetalOfficer from '../detalOfficer/DetalOfficer';
import css from './Main.module.css';

const Main = (props) => {
   // const { cases, setCases, officers, setOfficers, addNewCase } = props;

   return (
      <main className={css.main} >
         <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/caseform" element={<CaseForm />} />
            <Route exact path="/cases" element={<Cases />} />
            <Route path="/cases/:caseId" element={<DetalCase />} />
            <Route exact path="/officers" element={<Officers />} />
            <Route path="/officers/:officerId" element={<DetalOfficer />} />
            {/* <Route path="*" element={<Error />} /> */}
         </Routes>
      </main >
   )
}
export default Main;