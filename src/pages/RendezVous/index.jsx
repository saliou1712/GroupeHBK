import Rv from "../../composants/rv";
import { useEffect, useState } from "react";

function getDateDemain() {
    var demain = new Date();
    demain.setDate(demain.getDate() + 1)
    var annee = demain.getFullYear();
    var mois = (demain.getMonth() + 1).toString().padStart(2, '0')
    var jour = demain.getDate().toString().padStart(2, '0')
    return `${annee}-${mois}-${jour}`;
}

function RendezVous(){
    const [allRv, setAllRv] = useState([])
    const [todayRv, setTodayRv] = useState([])
    const [rvAvenir, setRvAvenir] = useState([])

    useEffect(()=>{
        async function getAllRv(){
            try{
                const divLoading = document.querySelector(".loading")
                divLoading.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                const response = await fetch("http://localhost:3030/groupehbk/getallrv", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if(response.status === 200){
                    const responseData = await response.json()
                    const data = responseData.allRv
                    setAllRv(data)
                    const filteredTodayRv = data.filter(
                        (rv) => new Date(rv.dateRv).toLocaleDateString() === new Date(Date.now()).toLocaleDateString()
                    )
                    divLoading.innerHTML = ""
                    setTodayRv(filteredTodayRv)
                    const filteredRv = data.filter(
                        (rv) => new Date(rv.dateRv).toLocaleDateString() === new Date(getDateDemain()).toLocaleDateString()
                    )
                    setRvAvenir(filteredRv)
                }
            }
            catch(err){
                console.log(err)
            }
        }
        getAllRv()
    }, [])

    function filterRvAvenir(date){
        const filteredRv = allRv.filter(
            (rv) => new Date(rv.dateRv).toLocaleDateString() === new Date(date).toLocaleDateString()
        )
        setRvAvenir(filteredRv)
    }

    return(
        <div className="rendez_vous">
            <div className="rendez_vous__today">
                <div className="rendez_vous__title">
                    <div><i className="fa-solid fa-calendar-day"></i> Aujourd'hui</div>
                </div>
                <div className="rendez_vous__list">
                    {
                        todayRv.length > 0 ? (
                            todayRv.map(
                                (rv) => (
                                    <Rv data={rv}/>
                                )
                            )
                        ) : (
                            <div className="vide">Aucun rendez vous prévu aujourd'hui...</div>
                        )
                    }
                    <div className="loading"></div>
                </div>
            </div>
            <div className="rendez_vous__avenir">
                <div className="rendez_vous__title">
                    <div><i className="fa-solid fa-calendar-days"></i> A venir</div>
                    <input type="date" defaultValue={getDateDemain()} onChange={(e)=>{filterRvAvenir(e.target.value)}}/>
                </div>
                <div className="rendez_vous__list">
                    {
                        rvAvenir.length > 0 ? (
                            rvAvenir.map(
                                (rv) => (
                                    <Rv data={rv}/>
                                )
                            )
                        ) : (
                            <div className="vide">Aucun rendez vous prévu à cette date...</div>
                        )
                    }
                    <div className="loading"></div>
                </div>
            </div>
        </div>
    )
}

export default RendezVous