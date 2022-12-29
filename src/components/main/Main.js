import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../mainPage/MainPage';
import CaseForm from '../caseForm/CaseForm';
import Cases from '../cases/Cases';
import CaseDetal from '../caseDetal/CaseDetal';
import Officers from '../officers/Officers';
import OfficerDetal from '../officerDetal/OfficerDetal';
import Error from '../Error/Error';
import css from './Main.module.css';

const Main = () => {
   return (
      <main className={css.main} >
         <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/caseform" element={<CaseForm />} />
            <Route exact path="/cases" element={<Cases />} />
            <Route path="/cases/:caseId" element={<CaseDetal />} />
            <Route exact path="/officers" element={<Officers />} />
            <Route path="/officers/:officerId" element={<OfficerDetal />} />
            <Route path="*" element={<Error />} />
         </Routes>
      </main >
   )
}
export default Main;