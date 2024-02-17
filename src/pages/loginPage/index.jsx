import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    async function Login(){
        const loginResultDiv = document.getElementById("login_result")
        try{
            loginResultDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
            const response = await fetch("http://localhost:3030/groupehbk/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    mail: mail,
                    password: password
                })
            })
            if(response.status === 200){
                loginResultDiv.innerHTML = '<i class="fa-solid fa-circle-check fa-beat-fade"></i>'
                const responseData = await response.json()
                localStorage.setItem("token", responseData.token)
                localStorage.setItem("username", responseData.username)
                setTimeout(()=>{
                   navigate("/groupehbk/home")
                }, 3000)
            }
            else{
                const responseData = await response.json()
                loginResultDiv.innerHTML = responseData.message
            }
        }
        catch(err){
            console.log(err)
            loginResultDiv.innerHTML = "Le serveur est indisponible"
        }
    }

    return(
        <div className="login_page">
            <div className="login_page__presentation">
                
            </div>
            <div className="login_page__form">
                <div className="login_page__form__head">
                    Se connecter au CRM <br /> <span style={{color: "rgb(52, 52, 198)"}}>Groupe HBK</span>
                </div>
                <div className="login_page__form__content">
                    <input type="mail" placeholder="Adresse e-mail" onChange={(e)=>{setMail(e.target.value)}}/>
                    <input type="password" placeholder="Mot de passe" onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button onClick={()=>{Login()}}>Connexion</button>
                    <Link to="/groupehbk/signup" className="signup_link"><i class="fa-solid fa-user-plus"></i>Créer un compte</Link>
                </div>
                <div className="login_result" id="login_result">

                </div>
            </div>
        </div>
    )
}

export default LoginPage