import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation, Redirect } from 'react-router-dom';
//import { PrivateRoute } from '../privateRoute/PrivateRoute';
import MainPage from '../mainPage/MainPage';
import CaseForm from '../caseForm/CaseForm';
import Cases from '../cases/Cases';
import DetalCase from '../detalCase/DetalCase';
import Officers from '../officers/Officers';
import DetalOfficer from '../detalOfficer/DetalOfficer';
import OfficerDetal from '../officerDetal/OfficerDetal';
import css from './Main.module.css';

const Main = () => {
   return (
      <main className={css.main} >
         <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/caseform" element={<CaseForm />} />
            <Route exact path="/cases" element={<Cases />} />
            <Route path="/cases/:caseId" element={<DetalCase />} />
            <Route exact path="/officers" element={<Officers />} />
            <Route path="/officers/:officerId" element={<OfficerDetal />} />
            {/* <Route path="/officers/:officerId" element={<DetalOfficer />} /> */}
            {/* <Redirect to="/" /> */}
            {/* <Route path="*" element={<Error />} /> */}
         </Routes>
      </main >
   )
}
export default Main;