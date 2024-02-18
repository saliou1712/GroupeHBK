import { useContext, useState } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { UpdateContext } from "../../utils/updateContext";

function Add_panel({panelDisplay, setPanelDisplay}){
    const [nom_entreprise, setNomEntreprise] = useState("")
    const [domaine, setDomaine] = useState("")
    const [numero, setNumero] = useState("")
    const [page_web, setPage_web] = useState("")
    const [adresse, setAdresse] = useState("")
    const [mail, setMail] = useState("")
    const [commentaire, setCommentaire] = useState("")
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {update, setUpdate} = useContext(UpdateContext)
    const token = localStorage.getItem("token")

    async function AddProspect(){
        if(nom_entreprise !== "" && domaine !== "" && numero !== "" && mail !== ""){
            try{
                const resultDiv = document.getElementById("result")
                resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                const response = await fetch("http://localhost:3030/groupehbk/addprospect", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        nom_entreprise: nom_entreprise,
                        domaine: domaine,
                        numero: numero,
                        mail: mail,
                        page_web: page_web,
                        adresse: adresse,
                        commentaire: commentaire
                    })
                })
                if(response.status === 200){
                    resultDiv.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
                    setUpdate(!update)
                }
                if(response.status === 400){
                    const responseData = await response.json()
                    resultDiv.innerHTML = responseData.message
                }
            }
            catch(err){
                console.log(err)
            }
        }
    }

    return(
        <div className="add_panel">
            <div className="close" onClick={() => {setPanelDisplay(!panelDisplay); setDisplayArrierePlan(!displayArrierePlan)}}><i className="fa-regular fa-circle-xmark"></i></div>
            <div className="add_panel__head">
                Veuillez renseigner les informations du prospect
            </div>
            <div className="add_panel__formulaire">
                <input type="text" placeholder="Nom de l'entreprise" autoCapitalize="on" autoComplete="off" onChange={(e)=>{setNomEntreprise(e.target.value)}}/>
                <select onChange={(e)=>{setDomaine(e.target.value)}}>
                    <option value="">Domaine d'activité</option>
                    <option value="Agro-alimentaire">Agro-alimentaire</option>
                    <option value="Fabrication">Fabrication</option>
                    <option value="Services financiers">Services financiers</option>
                    <option value="Tourisme">Tourisme</option>
                    <option value="Transport">Transport</option>
                    <option value="Sport">Sport</option>
                    <option value="Energie">Energie</option>
                    <option value="Immobilier">Immobilier</option>
                    <option value="Santé">Santé</option>
                    <option value="Education">Education</option>
                    <option value="TIC">TIC</option>
                    <option value="BTP">BTP</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Industriel">Industriel</option>
                </select>
                <input type="text" placeholder="Numéro de téléphone" autoCapitalize="on" autoComplete="off" onChange={(e)=>{setNumero(e.target.value)}}/>
                <input type="mail" placeholder="Adresse mail" autoCapitalize="on" autoComplete="off" onChange={(e)=>{setMail(e.target.value)}}/>
                <input type="text" placeholder="Adresse web" autoCapitalize="on" autoComplete="off" onChange={(e)=>{setPage_web(e.target.value)}}/>
                <input type="text" placeholder="Adresse de l'entreprise" autoCapitalize="on" autoComplete="off" onChange={(e)=>{setAdresse(e.target.value)}}/>
                <textarea className="description" name="description" id="description" placeholder="Description de l'entreprise..." onChange={(e) => {setCommentaire(e.target.value)}}></textarea>
                <div className="btns">
                    <div className="btn_close" onClick={() => {setPanelDisplay(!panelDisplay); setDisplayArrierePlan(!displayArrierePlan)}}>Fermer</div>
                    <div className="btn_save" onClick={()=>{AddProspect()}}>Enregistrer</div>
                    <div className="result" id="result"></div>
                </div>
            </div>
        </div>
    )
}

export default Add_panel;