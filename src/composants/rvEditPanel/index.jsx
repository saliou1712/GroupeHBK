import { useContext, useState } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { RvEditPanelContext } from "../../utils/editRvPanelContext";
import { RvContext } from "../../utils/rvContext";
import { UpdateContext } from "../../utils/updateContext";

function RvEditPanel({data}){
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {displayRvEditPanel, setDisplayRvEditPanel} = useContext(RvEditPanelContext)
    const {rvToSee} = useContext(RvContext)
    const token = localStorage.getItem("token")
    const [representant, setRepresentant] = useState(rvToSee.representant)
    const [dayRv, setDayRv] = useState(rvToSee.dateRv.slice(0, 10))
    const [horaireRv, setHoraireRv] = useState(rvToSee.dateRv.slice(11, 16))
    const [description, setDescription] = useState(rvToSee.commentaire)
    const {update, setUpdate} = useContext(UpdateContext)

    async function UpdateRv(){
        const resultDiv = document.getElementById("resultupdate")
        try{
            resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
            const response = await fetch("http://192.168.1.146:3030/groupehbk/updaterv", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    _id: rvToSee._id,
                    representant: representant,
                    dateRv: new Date(dayRv + "T" + horaireRv),
                    description: description
                })
            })
            if(response.status === 200){
                resultDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
                setUpdate(!update)
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="rvPanel">
            <div className="close" onClick={()=>{setDisplayArrierePlan(!displayArrierePlan); setDisplayRvEditPanel(!displayRvEditPanel)}}><i className="fa-regular fa-circle-xmark"></i></div>
            <div className="rvPanel__head">
                Mettre à jour le Rendez-vous prévu avec {rvToSee.representant}
            </div>
            <div className="rvPanel__formulaire">
                <input type="text" placeholder="Nom et prénom du représentant..." defaultValue={rvToSee.representant} onChange={(e)=>{setRepresentant(e.target.value)}}/>
                <input type="date" defaultValue={rvToSee.dateRv.slice(0, 10)} onChange={(e)=>{setDayRv(e.target.value)}}/>
                <input type="time" name="" id="" defaultValue={rvToSee.dateRv.slice(11, 16)} onChange={(e)=>{setHoraireRv(e.target.value)}}/>
                <textarea className="description" name="description" id="description" placeholder="Commentaire..." defaultValue={rvToSee.commentaire} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                <div className="btns">
                    <div className="result" id="resultupdate"></div>
                    <div className="btn_close" onClick={()=>{setDisplayArrierePlan(!displayArrierePlan); setDisplayRvEditPanel(!displayRvEditPanel)}}>Fermer</div>
                    <div className="btn_save" onClick={()=>{UpdateRv()}}>Enregistrer</div>
                </div>
            </div>
        </div>
    )
}

export default RvEditPanel