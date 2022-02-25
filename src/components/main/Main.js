import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import MainPage from '../mainPage/MainPage';
import Authorization from '../authorization/Authorization';
import CaseForm from '../caseForm/CaseForm';
import Cases from '../cases/Cases';
import DetalCase from '../detalCase/DetalCase';
import Officers from '../officers/Officers';
import DetalOfficer from '../detalOfficer/DetalOfficer';
import css from './Main.module.css';
//import { Router } from 'react-router-dom';

const Main = (props) => {
   const { cases, setCases, officers, setOfficers, addNewCase } = props;

   return (
      <main className={css.main}>
         <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/caseform" element={<CaseForm addNewCase={addNewCase} cases={cases} />} />
            <Route exact path="/cases" element={<Cases cases={cases} />} />
            <Route path="/cases/:caseId" element={<DetalCase cases={cases} />} />
            <Route exact path="/officers" element={<Officers officers={officers} setOfficers={setOfficers} />} />
            <Route path="/officers/:officerId" element={<DetalOfficer officers={officers} setOfficers={setOfficers} />} />
         </Routes>
      </main >
   )
}
export default Main;