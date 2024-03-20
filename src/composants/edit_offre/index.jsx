import { useContext, useState } from "react"
import { EditOffreContext } from "../../utils/editOffreContext"
import { ArrierePlanContext } from "../../utils/arrierePlanContext"
import { UpdateContext } from "../../utils/updateContext"

function EditOffre(){
    const {displayEditOffre, setDisplayEditOffre} = useContext(EditOffreContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {update, setUpdate} = useContext(UpdateContext)

    const token = localStorage.getItem("token")

    const [entreprise, setEntreprise] = useState("")
    const [objet, setObjet] = useState("")
    const [montant, setMontant] = useState("")
    const [details, setDetails] = useState("")
    const [statut, setStatut] = useState("")

    async function AddOffre(){
        try{
            const resultDiv = document.getElementById("result")
            if(entreprise !== "" && objet !== "" && montant !== "" && details !== "" && statut !== ""){
                resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                const response = await fetch("http://192.168.1.146:3030/groupehbk/addoffre", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        entreprise: entreprise,
                        objet: objet,
                        montant: montant,
                        details: details,
                        statut: statut
                    })
                })
                if(response.status === 201){
                    await setUpdate(!update)
                    setDisplayEditOffre(!displayEditOffre)
                    setDisplayArrierePlan(!displayArrierePlan)
                }
            }
            else{
                resultDiv.innerHTML = "Données Manquantes..."
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="edit_offre">
            <div className="edit_offre__close" onClick={()=>{setDisplayArrierePlan(!displayArrierePlan); setDisplayEditOffre(!displayEditOffre)}}>
                <i class="fa-regular fa-circle-xmark"></i>
            </div>
            <div className="edit_offre__head">
                Veuillez renseigner les détails de l'offre et le montant de votre proposition
            </div>
            <div className="edit_offre__form">
                <input type="text" placeholder="Nom de l'entreprise" onChange={(e)=>{setEntreprise(e.target.value)}}/>
                <input type="text" placeholder="Objet" onChange={(e)=>{setObjet(e.target.value)}}/>
                <input type="text" placeholder="Montant de l'offre en FCFA" onChange={(e)=>{setMontant(e.target.value)}}/>
                <textarea placeholder="Détails de l'offre" onChange={(e)=>{setDetails(e.target.value)}}></textarea>
                <select name="statut" id="statut" onChange={(e)=>{setStatut(e.target.value)}}>
                    <option value="">Statut de l'offre</option>
                    <option value="Active">Active</option>
                    <option value="Cloturée">Cloturée</option>
                    <option value="Deal">Deal</option>
                </select>
            </div>
            <div className="edit_offre__btns">
                <div className="edit_offre__result" id="result"></div>
                <div className="edit_offre__btns__close" onClick={()=>{setDisplayArrierePlan(!displayArrierePlan); setDisplayEditOffre(!displayEditOffre)}}>
                    Fermer
                </div>
                <div className="edit_offre__btns__save" onClick={()=>{AddOffre()}}>
                    Enregistrer
                </div>
            </div>
        </div>
    )
}

export default EditOffre