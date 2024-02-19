import { useContext } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { EditPanelContext } from "../../utils/editPanelContext";
import { InfosPanelContext } from "../../utils/infosPanelContext";
import { ProspectContext } from "../../utils/prospectContext";
import { RvPanelContext } from "../../utils/rvPanelContext";
import { UpdateContext } from "../../utils/updateContext";

function Prospect({data}){
    const {displayInfosPanel, setDisplayInfosPanel} = useContext(InfosPanelContext)
    const {setProspectToSee} = useContext(ProspectContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {displayRvPanel, setDisplayRvPanel} = useContext(RvPanelContext)
    const {displayEditPanel, setEditDisplayPanel} = useContext(EditPanelContext)
    const {update, setUpdate} = useContext(UpdateContext)
    const token = localStorage.getItem("token")

    function formatString(chaine, end){
        if(chaine.length > end){
            const str = chaine.substring(0, end) + "..."
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        return chaine.charAt(0).toUpperCase() + chaine.slice(1).toLowerCase();
    }

    async function SetProspectIsContacted(){
        try{
            const response = await fetch("http://192.168.1.146:3030/groupehbk/prospectcontacted", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    prospect: data
                })
            })
            if(response.status === 200){
                setUpdate(!update)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        data.isContacted ? (
            <div className="prospect prospect--contacted">
                <div className="entreprise" onClick={()=>{setProspectToSee(data); setEditDisplayPanel(!displayEditPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                    {formatString(data.nom_entreprise, 12)}
                </div>
                <div className="domaine">
                    <i class="fa-solid fa-industry"></i> {formatString(data.domaine, 16)}
                </div>
                <div className="representant">
                    <i class="fa-solid fa-user-tie"></i> {formatString(data.numero, 16)}
                </div>
                <div className="contacts">
                    <div className="contacter" onClick={()=>{setProspectToSee(data); setDisplayInfosPanel(!displayInfosPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                        <i className="fa-solid fa-eye"></i>
                    </div>
                    <div className="contacter contacter--mail" onClick={()=>{SetProspectIsContacted()}}>
                        <a href={`mailto:${data.mail}?subject=Opportunité d'investissement au Sénégal`}><i class="fa-solid fa-paper-plane"></i></a>
                    </div>
                    <div className="contacter" onClick={()=>{setProspectToSee(data); setDisplayRvPanel(!displayRvPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                        <i class="fa-solid fa-calendar-check"></i>
                    </div>
                </div>
            </div>
        ) : (
            <div className="prospect">
                <div className="entreprise" onClick={()=>{setProspectToSee(data); setEditDisplayPanel(!displayEditPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                    {formatString(data.nom_entreprise, 12)}
                </div>
                <div className="domaine">
                    <i class="fa-solid fa-industry"></i> {formatString(data.domaine, 16)}
                </div>
                <div className="representant">
                    <i class="fa-solid fa-user-tie"></i> {formatString(data.numero, 16)}
                </div>
                <div className="contacts">
                    <div className="contacter" onClick={()=>{setProspectToSee(data); setDisplayInfosPanel(!displayInfosPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                        <i className="fa-solid fa-eye"></i>
                    </div>
                    <div className="contacter contacter--mail" onClick={()=>{SetProspectIsContacted()}}>
                        <a href={`mailto:${data.mail}?subject=Opportunité d'investissement au Sénégal`}><i class="fa-solid fa-paper-plane"></i></a>
                    </div>
                    <div className="contacter" onClick={()=>{setProspectToSee(data); setDisplayRvPanel(!displayRvPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                        <i class="fa-solid fa-calendar-check"></i>
                    </div>
                </div>
            </div>
        )
    )
}

export default Prospect