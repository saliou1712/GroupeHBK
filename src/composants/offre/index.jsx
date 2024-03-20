import { useContext } from "react";
import { InfosOffresPanelContext } from "../../utils/infosOffrePanelContext";
import { OffreContext } from "../../utils/offreContext";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";

function Offre({ data }) {    
    function formatString(str, maxLength) {
        if (str.length > maxLength) {
            const trimmedString = str.substring(0, maxLength).trim();
            const lastSpaceIndex = trimmedString.lastIndexOf(" ");
            return trimmedString.substring(0, lastSpaceIndex) + "...";
        }
        return str;
    }

    function renderDetails() {
        return (
            <>
                <div className="offre__objet">{formatString(data.objet, 25)}</div>
                <div className="offre__entreprise">
                    <div className="title">Entreprise : </div>
                    <div className="nom_entreprise">{formatString(data.entreprise, 15)}</div>
                </div>
                <div className="offre__statut">
                    <div className="title">Statut : </div>
                    <div className="statut">{data.statut}</div>
                </div>
                <div className="offre__montant">
                    <div className="title">Montant : </div>
                    <div className="montant">{data.montant} FCFA</div>
                </div>
            </>
        )
    }

    const offreClass = `offre ${data.statut === "Deal" ? "offre--deal" : data.statut === "Cloturée" ? "offre--cloturee" : "offre--active"}`
    const {displayInfosOffresPanel, setDisplayInfosOffresPanel} = useContext(InfosOffresPanelContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {setOffreToSee} = useContext(OffreContext)

    return (
        <div className={offreClass} onClick={()=>{setOffreToSee(data) ; setDisplayInfosOffresPanel(!displayInfosOffresPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
            {renderDetails()}
        </div>
    )
}

export default Offre
