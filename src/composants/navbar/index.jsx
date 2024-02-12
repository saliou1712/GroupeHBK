import "../../style/style.css";

function Navbar(){
    return(
        <div className="nav">
            <div className="nav__logo">Groupe-HBK</div>
            <div className="nav__links">
                <a href="/groupehbk" className="nav__links__item"><i className="fa-solid fa-house-user"></i> Accueil</a>
                <a href="/groupehbk/list_prospect" className="nav__links__item"><i className="fa-solid fa-address-book"></i> Prospects</a>
                <a href="/groupehbk/rendez_vous" className="nav__links__item"><i className="fa-solid fa-handshake"></i> Rendez-vous</a>
            </div>
        </div>
    )
}

export default Navbar;