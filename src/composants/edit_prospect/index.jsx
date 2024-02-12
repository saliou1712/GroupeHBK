import { useContext, useState } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { UpdateContext } from "../../utils/updateContext";
import { EditPanelContext } from "../../utils/editPanelContext";
import { ProspectContext } from "../../utils/prospectContext";

function EditProspect(){
    const {prospectToSee} = useContext(ProspectContext)
    const [nom_entreprise, setNomEntreprise] = useState(prospectToSee.nom_entreprise)
    const [domaine, setDomaine] = useState(prospectToSee.domaine)
    const [numero, setNumero] = useState(prospectToSee.numero)
    const [page_web, setPage_web] = useState(prospectToSee.page_web)
    const [adresse, setAdresse] = useState(prospectToSee.adresse)
    const [mail, setMail] = useState(prospectToSee.mail)
    const [commentaire, setCommentaire] = useState(prospectToSee.commentaire)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {update, setUpdate} = useContext(UpdateContext)
    const {displayEditPanel, setEditDisplayPanel} = useContext(EditPanelContext)

    async function Edit(){
        if(nom_entreprise !== "" && domaine !== "" && numero !== "" && mail !== ""){
            try{
                const resultDiv = document.getElementById("result")
                resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                const response = await fetch("http://localhost:3030/groupehbk/updateprospect", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        _id: prospectToSee._id,
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
            }
            catch(err){
                console.log(err)
            }
        }
    }

    async function Delete(){
        try {
            const resultDiv = document.getElementById("result")
            resultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
            const response = await fetch("http://localhost:3030/groupehbk/deleteprospect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: prospectToSee._id
                })
            })
            if(response.status === 200){
                await setUpdate(!update)
                setEditDisplayPanel(!displayEditPanel)
                setDisplayArrierePlan(!displayArrierePlan)
            }
        } 
        catch (err) {
            console.log(err)
        }
    }

    return(
        <div className="add_panel">
            <div className="close" onClick={() => {setEditDisplayPanel(!displayEditPanel); setDisplayArrierePlan(!displayArrierePlan)}}><i className="fa-regular fa-circle-xmark"></i></div>
            <div className="add_panel__head">
                Vous allez modifier les informations de ce prospect
            </div>
            <div className="add_panel__formulaire">
                <input type="text" placeholder="Nom de l'entreprise" autoCapitalize="on" autoComplete="off" defaultValue={prospectToSee.nom_entreprise} onChange={(e)=>{setNomEntreprise(e.target.value)}}/>
                <select defaultValue={prospectToSee.domaine} onChange={(e)=>{setDomaine(e.target.value)}}>
                    <option value="">Domaine d'activité</option>
                    <option value="Agro-alimentaire">Agro-alimentaire</option>
                    <option value="Construction">Construction</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Automatisation">Automatisation</option>
                    <option value="BTP">BTP</option>
                    <option value="Electricité">Electricité</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Industriel">Industriel</option>
                </select>
                <input type="text" placeholder="Numéro de téléphone" autoCapitalize="on" autoComplete="off" defaultValue={prospectToSee.numero} onChange={(e)=>{setNumero(e.target.value)}}/>
                <input type="mail" placeholder="Adresse mail" autoCapitalize="on" autoComplete="off" defaultValue={prospectToSee.mail} onChange={(e)=>{setMail(e.target.value)}}/>
                <input type="text" placeholder="Adresse web" autoCapitalize="on" autoComplete="off" defaultValue={prospectToSee.page_web} onChange={(e)=>{setPage_web(e.target.value)}}/>
                <input type="text" placeholder="Adresse de l'entreprise" autoCapitalize="on" autoComplete="off" defaultValue={prospectToSee.adresse} onChange={(e)=>{setAdresse(e.target.value)}}/>
                <textarea className="description" name="description" id="description" placeholder="Description de l'entreprise..." defaultValue={prospectToSee.commentaire} onChange={(e) => {setCommentaire(e.target.value)}}></textarea>
                <div className="btns">
                    <div className="btn_close" onClick={() => {setEditDisplayPanel(!displayEditPanel); setDisplayArrierePlan(!displayArrierePlan)}}>Fermer</div>
                    <div className="btn_delete" onClick={()=>{Delete()}}>Supprimer</div>
                    <div className="btn_save" onClick={()=>{Edit()}}>Modifier</div>
                    <div className="result" id="result"></div>
                </div>
            </div>
        </div>
    )
}

export default EditProspect