import "../../style/style.css";
import UserMain from "../userMain";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar(){
    const [displayUserMain, setDisplayUserMain] = useState(false)

    return(
        <div className="nav">
            <div className="nav__logo">Groupe-HBK</div>
            <div className="nav__links">
                <Link to="/groupehbk/home" className="nav__links__item"><i className="fa-solid fa-house-user"></i> Accueil</Link>
                <Link to="/groupehbk/list_prospect" className="nav__links__item"><i className="fa-solid fa-address-book"></i> Mes Prospects</Link>
                <Link to="/groupehbk/rendez_vous" className="nav__links__item"><i className="fa-solid fa-handshake"></i> Rendez-vous</Link>
                <Link to={"/groupehbk/offres"} className="nav__links__item"><i className="fa-solid fa-clipboard-check"></i> Offres</Link>
                <Link to={"/groupehbk/chat"} className="nav__links__item"><i className="fa-brands fa-rocketchat"></i> Chat</Link>
                <div className="nav__links__userparams" onClick={()=>{setDisplayUserMain(!displayUserMain)}}><i className="fa-solid fa-user"></i></div>
            </div>
            { displayUserMain && <UserMain/>}
        </div>
    )
}

export default Navbar;