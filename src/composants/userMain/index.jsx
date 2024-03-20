import { useNavigate } from "react-router-dom";

function UserMain(){
    const username = localStorage.getItem("username")
    const navigate = useNavigate()

    function formatString(chaine, end){
        if(chaine.length > end){
            const str = chaine.substring(0, end) + "..."
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        return chaine.charAt(0).toUpperCase() + chaine.slice(1).toLowerCase();
    }

    function Logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("fonction")
        navigate("/groupehbk/login")
    }

    return(
        <div className="user_main">
            <div className="user_main__username">
                <i class="fa-solid fa-user-tie"></i> {formatString(username, 15)}
            </div>
            <div className="logout" onClick={()=>{Logout()}}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i> Déconnexion
            </div>
        </div>
    )
}

export default UserMain