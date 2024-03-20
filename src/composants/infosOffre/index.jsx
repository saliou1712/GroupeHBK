import { useContext } from "react"
import { OffreContext } from "../../utils/offreContext"
import { InfosOffresPanelContext } from "../../utils/infosOffrePanelContext"
import { ArrierePlanContext } from "../../utils/arrierePlanContext"
import { UpdateContext } from "../../utils/updateContext"
import { UpdateOffrePanelContext } from "../../utils/updateOffrePanelContext"

function InfosOffres(){
    const {offreToSee} = useContext(OffreContext)
    const {displayInfosOffresPanel, setDisplayInfosOffresPanel} = useContext(InfosOffresPanelContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {update, setUpdate} = useContext(UpdateContext)
    const {displayUpdateOffrePanel, setDisplayUpdateOffrePanel} = useContext(UpdateOffrePanelContext)
    const token = localStorage.getItem("token")

    async function DeleteOffre() {
        const loader = document.getElementById("load")
        try{
            loader.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
            const response = await fetch("http://192.168.1.146:3030/groupehbk/deleteoffre", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    _id: offreToSee._id
                })
            })
            if(response.status === 200){
                loader.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
                setUpdate(!update)
                setDisplayInfosOffresPanel(!displayInfosOffresPanel)
                setDisplayArrierePlan(!displayArrierePlan)
            }
        }
        catch(err){
            loader.innerHTML = "Erreur lors de la suppression"
            console.log(err)
        }
    }

    return(
        <div className="infos_offre">
            <div className="infos_offre__close" onClick={()=>{setDisplayInfosOffresPanel(!displayInfosOffresPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                <i class="fa-regular fa-circle-xmark"></i>
            </div>
            <div className="infos_offre__objet">
                {offreToSee.objet}
            </div>
            <div className="infos_offre__entreprise">
                <div className="title">Entreprise :</div>
                <div className="nom_entreprise">{offreToSee.entreprise}</div>
            </div>
            <div className="infos_offre__statut">
                <div className="title">Statut de l'offre :</div>
                <div className="statut">{offreToSee.statut}</div>
            </div>
            <div className="infos_offre__details">
                <span>Details :</span> 
                {offreToSee.details}
            </div>
            <div className="infos_offre__montant">
                <div className="title">Montant de la proposition</div>
                <div className="montant">{offreToSee.montant} FCFA</div>
            </div>
            <div className="infos_offre__btns">
                <div className="infos_offre__loading" id="load"></div>
                <div className="infos_offre__btns__close" onClick={()=>{setDisplayInfosOffresPanel(!displayInfosOffresPanel); setDisplayArrierePlan(!displayArrierePlan)}}>
                    Fermer
                </div>
                <div className="infos_offre__btns__delete" onClick={()=>DeleteOffre()}>
                    Supprimer
                </div>
                <div className="infos_offre__btns__update" onClick={()=>{setDisplayInfosOffresPanel(!displayInfosOffresPanel); setDisplayUpdateOffrePanel(!displayUpdateOffrePanel)}}>
                    Modifier
                </div>
            </div>
        </div>
    )
}

export default InfosOffres