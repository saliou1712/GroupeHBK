import AddPanelContextProvider from "./utils/addPanelContext";
import ArrierePlanContextProvider from "./utils/arrierePlanContext";
import EditPanelContextProvider from "./utils/editPanelContext";
import EmailConfirmationPage from "./pages/emailConfirmationPage";
import Home from "./pages/home";
import ImportFilePanelContextProvider from "./utils/importFilePanelContext";
import InfosPanelContextProvider from "./utils/infosPanelContext";
import List_prospect from "./pages/list_prospect";
import LoginPage from "./pages/loginPage";
import PageMail from "./pages/pageMail";
import ProspectContextProvider from "./utils/prospectContext";
import React from "react";
import ReactDOM from "react-dom/client";
import RendezVous from "./pages/RendezVous";
import RvContextProvider from "./utils/rvContext";
import RvEditPanelContextProvider from "./utils/editRvPanelContext";
import RvPanelContextProvider from "./utils/rvPanelContext";
import SignupPage from "./pages/signupPage";
import UpdateContextProvider from "./utils/updateContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Offres from "./pages/offres";
import EditOffreContextProvider from "./utils/editOffreContext";
import InfosOffresPanelContextProvider from "./utils/infosOffrePanelContext";
import OffreContextProvider from "./utils/offreContext";
import UpdateOffrePanelContextProvider from "./utils/updateOffrePanelContext";
import Chat from "./pages/chat";

/* eslint-disable react/jsx-pascal-case */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UpdateContextProvider>
    <ArrierePlanContextProvider>
    <ProspectContextProvider>
    <RvContextProvider>
    <OffreContextProvider>
    <ImportFilePanelContextProvider>
    <EditPanelContextProvider>
    <EditOffreContextProvider>
    <InfosPanelContextProvider>
    <InfosOffresPanelContextProvider>
    <UpdateOffrePanelContextProvider>
    <AddPanelContextProvider>
    <RvPanelContextProvider>
    <RvEditPanelContextProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<LoginPage/>}/>
          <Route path="/groupehbk/" element={<LoginPage/>}/>
          <Route path="/groupehbk/login" element={<LoginPage/>}/>
          <Route path="/groupehbk/signup" element={<SignupPage/>}/>
          <Route path="/groupehbk/confirm-email" element={<EmailConfirmationPage />} />
          <Route path="/groupehbk/home" element={<Home/>}/>
          <Route path="/groupehbk/list_prospect" element={<List_prospect/>}/>
          <Route path="/groupehbk/rendez_vous" element={<RendezVous/>}/>
          <Route path="/groupehbk/page_mail" element={<PageMail/>}/>
          <Route path="/groupehbk/offres" element={<Offres/>}/>
          <Route path="/groupehbk/chat" element={<Chat/>}/>
        </Routes>
      </Router>
    </RvEditPanelContextProvider>
    </RvPanelContextProvider>
    </AddPanelContextProvider>
    </UpdateOffrePanelContextProvider>
    </InfosOffresPanelContextProvider>
    </InfosPanelContextProvider>
    </EditOffreContextProvider>
    </EditPanelContextProvider>
    </ImportFilePanelContextProvider>
    </OffreContextProvider>
    </RvContextProvider>
    </ProspectContextProvider>
    </ArrierePlanContextProvider>
    </UpdateContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
