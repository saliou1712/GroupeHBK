import { useContext, useState } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { ProspectContext } from "../../utils/prospectContext";
import { RvPanelContext } from "../../utils/rvPanelContext";

function RvPanel(){
    const {prospectToSee} = useContext(ProspectContext)
    const {displayRvPanel, setDisplayRvPanel} = useContext(RvPanelContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const [representant, setRepresentant] = useState("")
    const [dayRv, setDayRv] = useState("")
    const [horaireRv, setHoraireRv] = useState("")
    const [description, setDescription] = useState("")
    const token = localStorage.getItem("token")

    async function AddRv(){
        try{
            if(dayRv !== "" && horaireRv !== ""){
                const resultDiv = document.getElementById("result")
                resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                const response = await fetch("http://localhost:3030/groupehbk/addrv", {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        representant: representant,
                        prospect: prospectToSee,
                        dateRv: new Date(dayRv + "T" + horaireRv),
                        description: description
                    })
                })
                if(response.status === 200){
                    resultDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
                }
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="rvPanel">
            <div className="close" onClick={()=>{setDisplayRvPanel(!displayRvPanel); setDisplayArrierePlan(!displayArrierePlan)}}><i className="fa-regular fa-circle-xmark"></i></div>
            <div className="rvPanel__head">
                Veuillez renseigner la date et l'heure du rendez vous avec {prospectToSee.nom_entreprise}
            </div>
            <div className="rvPanel__formulaire">
                <input type="text" placeholder="Nom et prénom du représentant..." onChange={(e)=>{setRepresentant(e.target.value)}}/>
                <input type="date" onChange={(e)=>{setDayRv(e.target.value)}}/>
                <input type="time" name="" id="" onChange={(e)=>{setHoraireRv(e.target.value)}}/>
                <textarea className="description" name="description" id="description" placeholder="Commentaire..." onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                <div className="btns">
                    <div className="result" id="result"></div>
                    <div className="btn_close" onClick={()=>{setDisplayRvPanel(!displayRvPanel); setDisplayArrierePlan(!displayArrierePlan)}}>Fermer</div>
                    <div className="btn_save" onClick={(e)=>{AddRv()}}>Enregistrer</div>
                </div>
            </div>
        </div>
    )
}

export default RvPanel