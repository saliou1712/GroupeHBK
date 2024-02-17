import { useContext } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { EditPanelContext } from "../../utils/editPanelContext";
import { InfosPanelContext } from "../../utils/infosPanelContext";
import { ProspectContext } from "../../utils/prospectContext";
import { RvPanelContext } from "../../utils/rvPanelContext";

function Prospect({data}){
    const {displayInfosPanel, setDisplayInfosPanel} = useContext(InfosPanelContext)
    const {setProspectToSee} = useContext(ProspectContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {displayRvPanel, setDisplayRvPanel} = useContext(RvPanelContext)
    const {displayEditPanel, setEditDisplayPanel} = useContext(EditPanelContext)

    function formatString(chaine, end){
        if(chaine.length > end){
            const str = chaine.substring(0, end) + "..."
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        return chaine.charAt(0).toUpperCase() + chaine.slice(1).toLowerCase();
    }

    return(
        <div className="prospect">
            <div className="entreprise" onClick={()=>{setProspectToSee(data); setEditDisplayPanel(!displayEditPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                {formatString(data.nom_entreprise, 12)}
            </div>
            <div className="domaine">
                <i class="fa-solid fa-industry"></i> {formatString(data.domaine, 18)}
            </div>
            <div className="representant">
                <i class="fa-solid fa-user-tie"></i> {formatString(data.numero, 16)}
            </div>
            <div className="contacts">
                <div className="contacter" onClick={()=>{setProspectToSee(data); setDisplayInfosPanel(!displayInfosPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                    <i className="fa-solid fa-phone"></i>
                </div>
                <div className="contacter" onClick={()=>{setProspectToSee(data); setDisplayRvPanel(!displayRvPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                    <i class="fa-solid fa-calendar-check"></i>
                </div>
            </div>
        </div>
    )
}

export default Prospect