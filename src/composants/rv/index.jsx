import DeleteRvPanel from "../deleteRvPanel";
import { useContext, useState } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";

function Rv({data}){
    const [displayDeletePanel, setDisplayDeletePanel] = useState(false)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)

    function formatString(chaine, end){
        if(chaine.length > end){
            const str = chaine.substring(0, end) + "..."
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        return chaine.charAt(0).toUpperCase() + chaine.slice(1).toLowerCase();
    }

    return(
        <div className="rv">
            <div className="rv__title">Rendez vous</div>
            <div className="rv__item"><span>Avec : </span><span className="rv__prospect">{formatString(data.representant, 8)}</span></div>
            <div className="rv__item"><span>De : </span><span className="rv__entreprise">{formatString(data.prospect.nom_entreprise, 8)}</span></div>
            <div className="rv__item"><span>Prévu : </span><span className="rv__horaire">{new Date(data.dateRv).toLocaleTimeString()}</span></div>
            <div className="rv__bts">
                <div className="rv__bts__delete" onClick={()=>{setDisplayDeletePanel(!displayDeletePanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                    <i class="fa-solid fa-trash"></i>
                </div>
                <div className="rv__bts__edit">
                    <i class="fa-regular fa-calendar-check"></i>
                </div>
            </div>
            { displayDeletePanel && <DeleteRvPanel data={data} setDisplayDeletePanel={setDisplayDeletePanel}/>}
        </div>
    )
}

export default Rv