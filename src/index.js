import AddPanelContextProvider from "./utils/addPanelContext";
import ArrierePlanContextProvider from "./utils/arrierePlanContext";
import Home from "./pages/home";
import InfosPage from "./pages/infosPage";
import InfosPanelContextProvider from "./utils/infosPanelContext";
import List_prospect from "./pages/list_prospect";
import Navbar from "./composants/navbar";
import ProspectContextProvider from "./utils/prospectContext";
import React from "react";
import ReactDOM from "react-dom/client";
import RendezVous from "./pages/RendezVous";
import RvPanelContextProvider from "./utils/rvPanelContext";
import UpdateContextProvider from "./utils/updateContext";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditPanelContextProvider from "./utils/editPanelContext";

/* eslint-disable react/jsx-pascal-case */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UpdateContextProvider>
    <ArrierePlanContextProvider>
    <ProspectContextProvider>
    <EditPanelContextProvider>
    <InfosPanelContextProvider>
    <AddPanelContextProvider>
    <RvPanelContextProvider>
      <Navbar/>
      <Router>
        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="/groupehbk" element={<Home/>}/>
          <Route path="/groupehbk/list_prospect" element={<List_prospect/>}/>
          <Route path="/groupehbk/infos_page" element={<InfosPage/>}/>
          <Route path="/groupehbk/rendez_vous" element={<RendezVous/>}/>
        </Routes>
      </Router>
    </RvPanelContextProvider>
    </AddPanelContextProvider>
    </InfosPanelContextProvider>
    </EditPanelContextProvider>
    </ProspectContextProvider>
    </ArrierePlanContextProvider>
    </UpdateContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
