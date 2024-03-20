import { useContext, useEffect, useState } from "react"
import Navbar from "../../composants/navbar"
import { EditOffreContext } from "../../utils/editOffreContext"
import EditOffre from "../../composants/edit_offre"
import { ArrierePlanContext } from "../../utils/arrierePlanContext"
import ArrierePlan from "../../composants/arrierePlan"
import Offre from "../../composants/offre"
import { UpdateContext } from "../../utils/updateContext"
import { InfosOffresPanelContext } from "../../utils/infosOffrePanelContext"
import InfosOffres from "../../composants/infosOffre"
import { UpdateOffrePanelContext } from "../../utils/updateOffrePanelContext"
import UpdateOffre from "../../composants/updateOffre"

function Offres(){
    const {displayEditOffre, setDisplayEditOffre} = useContext(EditOffreContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const [allOffres, setAllOffres] = useState([])
    const [filteredOffres, setFilteredOffres] = useState([])
    const {displayInfosOffresPanel, setDisplayInfosOffresPanel} = useContext(InfosOffresPanelContext)
    const {displayUpdateOffrePanel, setDisplayUpdateOffrePanel} = useContext(UpdateOffrePanelContext)

    const {update} = useContext(UpdateContext)

    const token = localStorage.getItem("token")

    const fonction = localStorage.getItem("fonction")

    useEffect(()=>{
        async function GetAllOffres() {
            const divLoading = document.getElementById("loading")
            try{
                divLoading.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                const response = await fetch("http://192.168.1.146:3030/groupehbk/getalloffres", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                })
                if(response.status === 200){
                    const responseData = await response.json()
                    const sortedOffres = responseData.allOffres.sort(function(a, b){
                        return new Date(b.date_ajout).getTime() - new Date(a.date_ajout).getTime()
                    })
                    divLoading.innerHTML = ""
                    setAllOffres(sortedOffres)
                    setFilteredOffres(sortedOffres)

                }
            }
            catch(err){
                console.log(err)
                divLoading.innerHTML = "Une erreur s'est produite lors de la récupération des offres !"
            }
        }
        GetAllOffres()
        return ()=>{
            setDisplayEditOffre(false)
            setDisplayArrierePlan(false)
            setDisplayInfosOffresPanel(false)
            setDisplayUpdateOffrePanel(false)
        }
    }, [setDisplayEditOffre, setDisplayArrierePlan, token, update, setDisplayInfosOffresPanel, setDisplayUpdateOffrePanel])

    function FilterByStatus(status){
        switch(status){
            case "Cloturée":
                const cloturedOffres = allOffres.filter(
                    (offre) => offre.statut === "Cloturée"
                )
                setFilteredOffres(cloturedOffres)
                break
            case "Deal":
                const dealedOffres = allOffres.filter(
                    (offre) => offre.statut === "Deal"
                )
                setFilteredOffres(dealedOffres)
                break
            case "Active":
                const activeOffres = allOffres.filter(
                    (offre) => offre.statut === "Active"
                )
                setFilteredOffres(activeOffres)
                break
            default:
                setFilteredOffres(allOffres)
                break
        }
        
    }

    function filterProspectsByName(name){
        if(name !== ""){
            const filtered = allOffres.filter(
                (offre) => offre.entreprise.toLowerCase().includes(name.toLowerCase())
            )
            setFilteredOffres(filtered)
        }
        else{
            setFilteredOffres(allOffres)
        }
    }

    return(
        <div className="page_offres">
            <div className="loading" id="loading"></div>
            <div className="page_offres__btn_add" onClick={()=>{setDisplayEditOffre(!displayEditOffre); setDisplayArrierePlan(!displayArrierePlan)}}>
                <i className="fa-solid fa-plus"></i>
            </div>
            <div className="page_offres__filtre">
                <div className="filtre_option">
                    {
                        fonction === "DGA" || fonction === "Responsable IT" ? (
                            <>
                                <div className="type_filtre">
                                    Filtrer par agent :
                                </div>
                                <select name="statut" id="statut" onChange={(e)=>{FilterByStatus(e.target.value)}}>
                                    <option value="">Aucun filtre</option>
                                    <option value="Active">Active</option>
                                    <option value="Cloturée">Cloturée</option>
                                    <option value="Deal">Deal</option>
                                </select>
                            </>
                        ) : null
                    }
                    <div className="type_filtre">
                        Filtrer par statut :
                    </div>
                    <select name="statut" id="statut" onChange={(e)=>{FilterByStatus(e.target.value)}}>
                        <option value="">Aucun filtre</option>
                        <option value="Active">Active</option>
                        <option value="Cloturée">Cloturée</option>
                        <option value="Deal">Deal</option>
                    </select>
                    <div className="total_prospect">
                        <span>Total offre :</span> {filteredOffres.length}
                    </div>
                </div>
                
                <div className="search">
                    <input type="text" name="search" placeholder="Nom de l'entreprise..." onChange={(e)=>{filterProspectsByName(e.target.value)}}/>
                    <div className="btn_search">Rechercher</div>
                </div>
            </div>
            <div className="list_offres">
                {
                    filteredOffres.length > 0 ? (
                        filteredOffres.map(
                            (offre) => (
                                <Offre data={offre}/>
                            )
                        )
                    ) : (
                        <div>Rien à afficher...</div>
                    )
                }
            </div>
            <Navbar/>
            { displayEditOffre && <EditOffre/> }
            { displayArrierePlan && <ArrierePlan/> }
            { displayInfosOffresPanel && <InfosOffres/> }
            { displayUpdateOffrePanel && <UpdateOffre/> }
        </div>
    )
}

export default Offres