function Rv({data}){
    function formatString(chaine){
        if(chaine.length > 8){
            return chaine.substring(0, 8) + "..."
        }
        return chaine
    }
    return(
        <div className="rv">
            <div className="rv__title">Rendez vous</div>
            <div className="rv__item"><span>Avec : </span><span className="rv__prospect">{formatString(data.representant)}</span></div>
            <div className="rv__item"><span>De : </span><span className="rv__entreprise">{formatString(data.prospect.nom_entreprise)}</span></div>
            <div className="rv__item"><span>Prévu : </span><span className="rv__horaire">{new Date(data.dateRv).toLocaleTimeString()}</span></div>
        </div>
    )
}

export default Rv