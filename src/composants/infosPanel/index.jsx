import { useContext } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { InfosPanelContext } from "../../utils/infosPanelContext";
import { ProspectContext } from "../../utils/prospectContext";

/* eslint-disable react/jsx-no-target-blank */

function InfosPanel(){
    const {prospectToSee} = useContext(ProspectContext)
    const {displayInfosPanel, setDisplayInfosPanel} = useContext(InfosPanelContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)

    function formatString(chaine, end){
        if(chaine){
            if(chaine.length > end){
                const str = chaine.substring(0, end) + "..."
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
            }
            return chaine.charAt(0).toUpperCase() + chaine.slice(1).toLowerCase();
        }
        else{
            return ""
        }
    }
    
    return(
        <div className="infos_panel">
            <div className="close" onClick={()=>{setDisplayInfosPanel(!displayInfosPanel); setDisplayArrierePlan(!displayArrierePlan)}}><i className="fa-regular fa-circle-xmark"></i></div>
            <div className="infos_panel__item">
                <div className="infos_panel__item__title">
                    Nom de l'entreprise
                </div>
                <div className="infos_panel__item__content">
                    { formatString(prospectToSee.nom_entreprise, 25) }
                </div>
            </div>
            <div className="infos_panel__item">
                <div className="infos_panel__item__title">
                    Domaine
                </div>
                <div className="infos_panel__item__content">
                    { formatString(prospectToSee.domaine) }
                </div>
            </div>
            <div className="infos_panel__item">
                <div className="infos_panel__item__title">
                    N° de Téléphone
                </div>
                <div className="infos_panel__item__content">
                    { formatString(prospectToSee.numero, 25) }
                </div>
            </div>
            <div className="infos_panel__item">
                <div className="infos_panel__item__title">
                    Adresse e-mail
                </div>
                <div className="infos_panel__item__content">
                    { formatString(prospectToSee.mail, 25)}
                </div>
            </div>
            <div className="infos_panel__item">
                <div className="infos_panel__item__title">
                    Site web
                </div>
                <div className="infos_panel__item__content">
                    <a href={`https://${ prospectToSee.page_web }`} target="_blank">{ prospectToSee.page_web }</a>
                </div>
            </div>
            <div className="infos_panel__item">
                <div className="infos_panel__item__title">
                    Adresse de l'entreprise
                </div>
                <div className="infos_panel__item__content">
                    { formatString(prospectToSee.adresse, 25) }
                </div>
            </div>
            <div className="infos_panel__description">
                <div className="infos_panel__description__content">
                    <span>Commentaires :</span> { prospectToSee.commentaire }
                </div>
            </div>
        </div>
    )
}

export default InfosPanel