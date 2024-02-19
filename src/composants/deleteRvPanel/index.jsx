import { useContext } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { UpdateContext } from "../../utils/updateContext";

function DeleteRvPanel({data, setDisplayDeletePanel}){
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {update, setUpdate} = useContext(UpdateContext)
    const token = localStorage.getItem("token")

    async function SetRvDone(){
        const resultDiv = document.getElementById("result_delete")
        resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
        try{
            const response = await fetch("http://192.168.1.146:3030/groupehbk/setrvdone", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    rv: data
                })
            })
            if(response.status === 200){
                resultDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
                setUpdate(!update)
                setDisplayDeletePanel(false)
                setDisplayArrierePlan(!displayArrierePlan)
            }
            else{
                const responseData = await response.json()
                resultDiv.innerHTML = responseData.message
            }
        }
        catch(err){
            console.log(err)
            resultDiv.innerHTML = `Erreur lors de la suppression du RV`
        }
    }

    async function delelerv(){
        const resultDiv = document.getElementById("result_delete")
        try{
            resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
            const response = await fetch("http://192.168.1.146:3030/groupehbk/deleterv", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    rv: data
                })
            })
            if(response.status === 200){
                resultDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
                setUpdate(!update)
                setDisplayDeletePanel(false)
                setDisplayArrierePlan(!displayArrierePlan)
            }
            else{
                const responseData = await response.json()
                resultDiv.innerHTML = responseData.message
            }
        }
        catch(err){
            console.log(err)
            resultDiv.innerHTML = `Erreur lors de la suppression du RV`
        }
    }

    return(
        <div className="delete_rv_panel">
            <div className="delete_rv_panel__head">
                Voulez vous annuler ou marquer le rendez-vous avec {data.representant} comme terminé
            </div>
            <div className="delete_rv_panel__content">
                <div className="delete_rv_panel__content__close" onClick={()=>{setDisplayDeletePanel(false); setDisplayArrierePlan(!displayArrierePlan)}}>
                    Fermer
                </div>
                <div className="delete_rv_panel__content__continue" onClick={()=>{delelerv()}}>
                    Annuler
                </div>
                <div className="delete_rv_panel__content__done" onClick={()=>{SetRvDone()}}>
                    Terminer
                </div>
            </div>
            <div className="result_delete" id="result_delete">

            </div>
        </div>
    )
}

export default DeleteRvPanel