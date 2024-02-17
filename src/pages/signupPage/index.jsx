import { useState } from "react";
import { Link } from "react-router-dom";

function SignupPage(){
    const [prenom, setPrenom] = useState("")
    const [nom, setNom] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConf, setPasswordConf] = useState("")
    const [fonction, setFonction] = useState("")

    function checkPassword(){
        return password === passwordConf
    }

    function checkForm(){
        return password !== "" && prenom !== "" && nom !== "" && mail !== "" && fonction !== ""
    }

    async function Signup(){
        const signupResultDiv = document.getElementById("signup_result")
        if(checkPassword() && checkForm()){
            try{
                signupResultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                const response = await fetch("http://localhost:3030/groupehbk/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        prenom: prenom,
                        nom: nom,
                        mail: mail,
                        password: password,
                        fonction: fonction
                    })
                })
                if(response.status === 201){
                    signupResultDiv.innerHTML = "Inscription réussie. Veuillez vérifier votre boite e-mail pour activer votre compte."
                }
                else{
                    const responseData = await response.json()
                    signupResultDiv.innerHTML = responseData.message
                }
            }
            catch(err){
                console.log(err)
                signupResultDiv.innerHTML = "Le serveur est indisponible"
            }
        }
        else{
            console.log(prenom)
            console.log(nom)
            console.log(mail)
            console.log(password)
            console.log(fonction)
            signupResultDiv.innerHTML = "Informations manquantes..."
        }
    }

    return(
        <div className="signup_page">
            <div className="signup_page__presentation">

            </div>
            <div className="signup_page__form">
                <div className="signup_page__form__head">
                    Créer un compte <br /> <span style={{color: "rgb(52, 52, 198)"}}>Groupe HBK</span>
                </div>
                <div className="signup_page__form__content">
                    <input type="text" name="prenom" placeholder="Prenom" onChange={(e)=>{setPrenom(e.target.value)}}/>
                    <input type="text" name="nom" placeholder="Nom" onChange={(e)=>{setNom(e.target.value)}}/>
                    <input type="mail" name="mail" placeholder="Adresse e-mail" onChange={(e)=>{setMail(e.target.value)}}/>
                    <input type="password" name="password" placeholder="Mot de passe" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <input type="password" placeholder="Confirmer mot de passe" onChange={(e)=>{setPasswordConf(e.target.value)}}/>
                    <div className="fonction">
                        <div className="fonction__title">
                            Fonction
                        </div>
                        <select name="fonction" onChange={(e)=>{setFonction(e.target.value)}}>
                            <option value="">Sélectionner</option>
                            <option value="Technico-commercial">Technico-commercial</option>
                            <option value="Responsable IT">Responsable IT</option>
                            <option value={"Responsable Marketing"}>Responsable Marketing</option>
                        </select>
                    </div>
                    <button onClick={()=>{Signup()}}>Inscription</button>
                    <Link className="login_link" to="/groupehbk/login"><i class="fa-solid fa-right-to-bracket"></i>Se connecter</Link>
                </div>
                <div className="signup_result" id="signup_result">

                </div>
            </div>
        </div>
    )
}

export default SignupPage