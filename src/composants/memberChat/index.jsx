function MemberChat({user}){

    function formatString(chaine, end){
        if(chaine.length > end){
            const str = chaine.substring(0, end) + "..."
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        return chaine.charAt(0).toUpperCase() + chaine.slice(1).toLowerCase();
    }

    return(
        <div className="chat_member">
            <div className="username">{formatString(`${user.prenom} ${user.nom}`, 20)}</div>
            <div className="statut"><i className="fa-solid fa-circle"></i></div>
        </div>
    )
}

export default MemberChat