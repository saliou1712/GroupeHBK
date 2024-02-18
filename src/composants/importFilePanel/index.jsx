import { useContext } from "react";
import { ArrierePlanContext } from "../../utils/arrierePlanContext";
import { ImportFilePanelContext } from "../../utils/importFilePanelContext";
import { UpdateContext } from "../../utils/updateContext";

function ImportFilePanel(){
    const {displayFilePanelImport, setDisplayFilePanelImport} = useContext(ImportFilePanelContext)
    const {displayArrierePlan, setDisplayArrierePlan} = useContext(ArrierePlanContext)
    const {update, setUpdate} = useContext(UpdateContext)
    const token = localStorage.getItem("token")

    async function Import(e){
        e.preventDefault()
        const formData = await new FormData(e.target);
        const loader = document.getElementById("result")
        try{
            loader.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
            const response = await fetch("http://localhost:3030/groupehbk/addprospectswithfile", {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if(response.status === 200){
                loader.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
                setUpdate(!update)
            } else {
                const responseData = await response.json()
                loader.innerHTML = responseData.message
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className="import_file_panel">
            <div className="import_file_panel__head">
                Veuillez choisir la base de donnée à importer
            </div>
            <form className="import_file_panel__form" enctype="multipart/form-data" onSubmit={(e)=>{Import(e)}}>
                <input type="file" name="excelFile"/>
                <button type="submit" className="">Importer</button>
                <div className="result" id="result"></div>
            </form>
            <div className="import_file_panel__close" onClick={()=>{setDisplayFilePanelImport(!displayFilePanelImport); setDisplayArrierePlan(!displayArrierePlan)}}><i className="fa-regular fa-circle-xmark"></i></div>
        </div>
    )
}

export default ImportFilePanel