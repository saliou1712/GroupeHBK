function UserMain(){
    const username = localStorage.getItem("username")

    function formatString(chaine, end){
        if(chaine.length > end){
            const str = chaine.substring(0, end) + "..."
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        return chaine.charAt(0).toUpperCase() + chaine.slice(1).toLowerCase();
    }

    return(
        <div className="user_main">
            <div className="user_main__username">
                <i class="fa-solid fa-user-tie"></i> {formatString(username, 15)}
            </div>
            <div className="logout">
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Déconnexion
            </div>
        </div>
    )
}

export default UserMain