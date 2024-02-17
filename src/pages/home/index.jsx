import "../../style/style.css";
import Add_panel from "../../composants/add_panel";
import Navbar from "../../composants/navbar";
import { useContext } from "react";
import { AddPanelContext } from "../../utils/addPanelContext";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";

/* eslint-disable react/jsx-pascal-case */

function Home(){
    const {panelDisplay, setPanelDisplay} = useContext(AddPanelContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)

    return(
        <div className="container">
            <div className="base">
                <div className="base__quote">
                    Au service du développement socio-économique
                </div>
                <div className="fliales">
                    <div className="fliale1"></div>
                    <div className="fliale2"></div>
                    <div className="fliale3"></div>
                    <div className="fliale4"></div>
                </div>
                <div className="add_prospect" onClick={() => {setPanelDisplay(!panelDisplay); setDisplayArrierePlan(!displayArrierePlan)}}>
                    <i className="fa-solid fa-plus"></i>
                </div>
            </div>
            { panelDisplay && <Add_panel panelDisplay={panelDisplay} setPanelDisplay={setPanelDisplay}/> }
            <Navbar/>
        </div>
    )
}

export default Home;