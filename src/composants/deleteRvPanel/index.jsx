import { useContext } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";

function DeleteRvPanel({data, setDisplayDeletePanel}){
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)

    return(
        <div className="delete_rv_panel">
            <div className="delete_rv_panel__head">
                Vous allez annuler le rendez-vous prévu avec {data.representant}
            </div>
            <div className="delete_rv_panel__content">
                <div className="delete_rv_panel__content__close" onClick={()=>{setDisplayDeletePanel(false); setDisplayArrierePlan(!displayArrierePlan)}}>
                    Fermer
                </div>
                <div className="delete_rv_panel__content__continue">
                    Continuer
                </div>
            </div>
        </div>
    )
}

export default DeleteRvPanel