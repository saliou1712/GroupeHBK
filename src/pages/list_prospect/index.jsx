import Add_panel from "../../composants/add_panel";
import ArrierePlan from "../../composants/arrierePlan";
import EditProspect from "../../composants/edit_prospect";
import ImportFilePanel from "../../composants/importFilePanel";
import InfosPanel from "../../composants/infosPanel";
import Navbar from "../../composants/navbar";
import Prospect from "../../composants/prospect";
import RvPanel from "../../composants/rvPanel";
import { useContext, useEffect, useState } from "react";
import { AddPanelContext } from "../../utils/addPanelContext";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { EditPanelContext } from "../../utils/editPanelContext";
import { ImportFilePanelContext } from "../../utils/importFilePanelContext";
import { InfosPanelContext } from "../../utils/infosPanelContext";
import { RvPanelContext } from "../../utils/rvPanelContext";
import { UpdateContext } from "../../utils/updateContext";

/* eslint-disable react/jsx-no-comment-textnodes */

/* eslint-disable react/jsx-pascal-case */

function List_prospect(){
    const [allProspects, setAllProspects] = useState([])
    const {panelDisplay, setPanelDisplay} = useContext(AddPanelContext)
    const {displayInfosPanel, setDisplayInfosPanel} = useContext(InfosPanelContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {displayRvPanel, setDisplayRvPanel} = useContext(RvPanelContext)
    const {update} = useContext(UpdateContext)
    const [filteredProspect, setFilteredProspect] = useState([])
    const {displayEditPanel, setEditDisplayPanel} = useContext(EditPanelContext)
    const {displayFilePanelImport, setDisplayFilePanelImport} = useContext(ImportFilePanelContext)
    const token = localStorage.getItem("token")

    useEffect(()=>{
        async function getAllTaches(){
            try{
                const divLoading = document.getElementById("loading")
                divLoading.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                const response = await fetch("http://192.168.1.146:3030/groupehbk/allprospect", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    const responseData = await response.json()
                    const sortedProspects = responseData.allProspects.sort(function(a, b){
                        return new Date(b.date_ajout).getTime() - new Date(a.date_ajout).getTime()
                    })
                    divLoading.innerHTML = ""
                    setAllProspects(sortedProspects)
                    setFilteredProspect(sortedProspects)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getAllTaches()

        return ()=>{
            setDisplayArrierePlan(false)
            setPanelDisplay(false)
            setDisplayInfosPanel(false)
            setDisplayRvPanel(false)
            setDisplayFilePanelImport(false)
            setEditDisplayPanel(false)
        }
    }, [update, token, setDisplayArrierePlan, setPanelDisplay, setDisplayInfosPanel, setDisplayRvPanel, setDisplayFilePanelImport, setEditDisplayPanel])

    function filterProspects(domaine){
        if(domaine !== ""){
            const filtered = allProspects.filter(
                (prospect) => prospect.domaine === domaine
            )
            setFilteredProspect(filtered)
        }
        else{
            setFilteredProspect(allProspects)
        }
    }

    function filterProspectsByName(name){
        if(name !== ""){
            const filtered = allProspects.filter(
                (prospect) => prospect.nom_entreprise.toLowerCase().includes(name.toLowerCase())
            )
            setFilteredProspect(filtered)
        }
        else{
            setFilteredProspect(allProspects)
        }
    }

    async function Export(){
        try{
            const response = await fetch("http://192.168.1.146/groupehbk/download", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    data: filteredProspect
                })
            })
            if (!response.ok) {
                throw new Error('Erreur lors du téléchargement du fichier');
            }
            
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = 'donnees.xlsx';
            
            link.click();
            URL.revokeObjectURL(url);
        }
        catch(err){
            console.error('Erreur lors du téléchargement du fichier :', err);
        }
    }

    /*
    async function SendMailToAll(){
        try{
            const loader = document.getElementById("loader")
            loader.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
            const response = await fetch("http://localhost:3030/groupehbk/sendmailtoall", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    data: filteredProspect
                })
            })
            if(response.status === 200){
                loader.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
                console.log("Mails Envoyés")
                setUpdate(!update)
                setTimeout(() => {
                    loader.innerHTML = ""
                }, 3000);
            }
        }
        catch(err){
            console.log(err)
        }
    }
    */

    function FilterByStatus(status){
        switch(status){
            case "contacted":
                const contactedProspects = allProspects.filter(
                    (prospect) => prospect.isContacted
                )
                setFilteredProspect(contactedProspects)
                break
            case "not_contacted":
                const notContactedProspect = allProspects.filter(
                    (prospect) => !prospect.isContacted
                )
                setFilteredProspect(notContactedProspect)
                break
            default:
                setFilteredProspect(allProspects)
                break
        }
        
    }

    return(
        <div className="list_prospect">
            <div className="list_prospect__filtre">
                <div className="filtre_option">
                    <div className="type_filtre">
                        Filtrer par domaine d'activité :
                    </div>
                    <select name="domaine" id="domaine" onChange={(e)=>{filterProspects(e.target.value)}}>
                        <option value="">Aucun filtre</option>
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
                    <div className="status">
                        <div>Status : </div>
                        <select name="status" id="status" onChange={(e)=>{FilterByStatus(e.target.value)}}>
                            <option value="all">Tous</option>
                            <option value="contacted">Contacté</option>
                            <option value="not_contacted">Pas contacté</option>
                        </select>
                    </div>
                    <div className="total_prospect">
                        <span>Total prospect :</span> {filteredProspect.length}
                    </div>
                </div>
                
                <div className="search">
                    <input type="text" name="search" placeholder="Nom de l'entreprise..." onChange={(e)=>{filterProspectsByName(e.target.value)}}/>
                    <div className="btn_search">Rechercher</div>
                </div>
            </div>
            <div className="prospects">
                {
                    filteredProspect.length > 0 ? (
                        filteredProspect.map(
                            (prospect, index) => (
                                <Prospect key={index} data={prospect}/>
                            )
                        )
                    ) : (
                        <div className="vide">Rien à afficher...</div>
                    )
                }
                <div className="loading" id="loading"></div>
            </div>
            <div className="add_prospect" onClick={() => {setPanelDisplay(!panelDisplay); setDisplayArrierePlan(!displayArrierePlan)}}>
                <i className="fa-solid fa-plus"></i>
            </div>
            <div className="btn_export" onClick={()=>{Export()}}>
                <i className="fa-solid fa-file-export"></i>
            </div>
            <div className="btn_import" onClick={()=>{setDisplayFilePanelImport(!displayFilePanelImport); setDisplayArrierePlan(!displayArrierePlan)}}>
                <i class="fa-solid fa-file-import fa-flip-horizontal"></i>
            </div>
            
            {
                /*
                <div className="btn_send_mail" onClick={()=>{SendMailToAll()}}>
                    <i class="fa-solid fa-envelopes-bulk"></i>
                </div>
                */
            }
            
            <div className="send_mail_load" id="loader">
                
            </div>
            { panelDisplay && <Add_panel panelDisplay={panelDisplay} setPanelDisplay={setPanelDisplay}/> }
            { displayInfosPanel && <InfosPanel/> }
            { displayArrierePlan && <ArrierePlan/>}
            { displayRvPanel && <RvPanel/>}
            { displayEditPanel && <EditProspect/>}
            { displayFilePanelImport && <ImportFilePanel/> }
            <Navbar/>
            <footer>
                &copy; Groupe-HBK | Tous droits réservés
            </footer>
        </div>
    )
}

export default List_prospect