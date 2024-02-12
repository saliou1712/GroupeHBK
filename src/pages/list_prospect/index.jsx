import Add_panel from "../../composants/add_panel";
import ArrierePlan from "../../composants/arrierePlan";
import InfosPanel from "../../composants/infosPanel";
import Prospect from "../../composants/prospect";
import RvPanel from "../../composants/rvPanel";
import { useContext, useEffect, useState } from "react";
import { AddPanelContext } from "../../utils/addPanelContext";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { InfosPanelContext } from "../../utils/infosPanelContext";
import { RvPanelContext } from "../../utils/rvPanelContext";
import { UpdateContext } from "../../utils/updateContext";
import EditProspect from "../../composants/edit_prospect";
import { EditPanelContext } from "../../utils/editPanelContext";

/* eslint-disable react/jsx-pascal-case */

function List_prospect(){
    const [allProspects, setAllProspects] = useState([])
    const {panelDisplay, setPanelDisplay} = useContext(AddPanelContext)
    const {displayInfosPanel} = useContext(InfosPanelContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {displayRvPanel} = useContext(RvPanelContext)
    const {update} = useContext(UpdateContext)
    const [filteredProspect, setFilteredProspect] = useState([])
    const {displayEditPanel} = useContext(EditPanelContext)

    useEffect(()=>{
        async function getAllTaches(){
            try{
                const divLoading = document.getElementById("loading")
                divLoading.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                const response = await fetch("http://localhost:3030/groupehbk/allprospect", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
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
    }, [update])

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
            const response = await fetch("http://localhost:3030/groupehbk/download", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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

    return(
        <div className="list_prospect">
            <div className="list_prospect__filtre">
                <div className="filtre_option">
                    <div className="type_filtre">
                        Filtrer par domaine d'activité
                    </div>
                    <select name="domaine" id="domaine" onChange={(e)=>{filterProspects(e.target.value)}}>
                        <option value="">Aucun filtre</option>
                        <option value="Agro-alimentaire">Agro-alimentaire</option>
                        <option value="Construction">Construction</option>
                        <option value="Informatique">Informatique</option>
                        <option value="Automatisation">Automatisation</option>
                        <option value="BTP">BTP</option>
                        <option value="Electricité">Electricité</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Industriel">Industriel</option>
                    </select>
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
            { panelDisplay && <Add_panel panelDisplay={panelDisplay} setPanelDisplay={setPanelDisplay}/> }
            { displayInfosPanel && <InfosPanel/> }
            { displayArrierePlan && <ArrierePlan/>}
            { displayRvPanel && <RvPanel/>}
            { displayEditPanel && <EditProspect/>}
            <footer>
                &copy; Groupe-HBK | Tous droits réservés
            </footer>
        </div>
    )
}

export default List_prospect