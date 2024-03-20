import { useContext, useState } from "react"
import { OffreContext } from "../../utils/offreContext"
import { UpdateOffrePanelContext } from "../../utils/updateOffrePanelContext"
import { ArrierePlanContext } from "../../utils/arrierePlanContext"
import { UpdateContext } from "../../utils/updateContext"

function UpdateOffre() {
    const {offreToSee} = useContext(OffreContext)
    const {displayUpdateOffrePanel, setDisplayUpdateOffrePanel} = useContext(UpdateOffrePanelContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {update, setUpdate} = useContext(UpdateContext)

    const token = localStorage.getItem("token")

    const [entreprise, setEntreprise] = useState(offreToSee.entreprise)
    const [objet, setObjet] = useState(offreToSee.objet)
    const [montant, setMontant] = useState(offreToSee.montant)
    const [details, setDetails] = useState(offreToSee.details)
    const [statut, setStatut] = useState(offreToSee.statut)

    async function Update() {
        const resultDiv = document.getElementById("result")
        try{
            if(entreprise !== "" && objet !== "" && montant !== "" && details !== "" && statut !== ""){
                resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                const response = await fetch("http://192.168.1.146:3030/groupehbk/updateoffre", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        offre: offreToSee,
                        entreprise: entreprise,
                        objet: objet,
                        montant: montant,
                        details: details,
                        statut: statut
                    })
                })
                if(response.status === 200){
                    await setUpdate(!update)
                    setDisplayUpdateOffrePanel(!displayUpdateOffrePanel)
                    setDisplayArrierePlan(!displayArrierePlan)
                }
            }
            else{
                resultDiv.innerHTML = "Données Manquantes..."
            }
        }
        catch(err){
            console.log(err)
            resultDiv.innerHTML = "Erreur lors de la mis a jour de l'offre"
        }
    }

    return(
        <div className="update_offre">
            <div className="update_offre__close" onClick={()=>{setDisplayUpdateOffrePanel(!displayUpdateOffrePanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                <i class="fa-regular fa-circle-xmark"></i>
            </div>
            <div className="update_offre__head">
                Veuillez renseigner les détails de l'offre à modifier
            </div>
            <div className="update_offre__form">
                <input type="text" placeholder="Nom de l'entreprise" defaultValue={offreToSee.entreprise} onChange={(e)=>{setEntreprise(e.target.value)}}/>
                <input type="text" placeholder="Objet" defaultValue={offreToSee.objet} onChange={(e) => {setObjet(e.target.value)}}/>
                <input type="text" placeholder="Montant de l'offre en FCFA" defaultValue={offreToSee.montant} onChange={(e) => {setMontant(e.target.value)}}/>
                <textarea placeholder="Détails de l'offre" defaultValue={offreToSee.details} onChange={(e) => {setDetails(e.target.value)}}></textarea>
                <select name="statut" id="statut" defaultValue={offreToSee.statut} onChange={(e) => {setStatut(e.target.value)}}>
                    <option value="">Statut de l'offre</option>
                    <option value="Active">Active</option>
                    <option value="Cloturée">Cloturée</option>
                    <option value="Deal">Deal</option>
                </select>
            </div>
            <div className="update_offre__btns">
                <div className="update_offre__result" id="result"></div>
                <div className="update_offre__btns__close" onClick={()=>{setDisplayUpdateOffrePanel(!displayUpdateOffrePanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                    Fermer
                </div>
                <div className="update_offre__btns__save" onClick={()=>{Update()}}>
                    Enregistrer
                </div>
            </div>
        </div>
    )
}

export default UpdateOffre