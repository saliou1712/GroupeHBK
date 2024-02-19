import Navbar from "../../composants/navbar";

function PageMail(){
    const token = localStorage.getItem("token")
    
    async function SendMails(e){
        e.preventDefault()
        const formData = await new FormData(e.target);
        console.log(formData)
        try{
            const loader = document.getElementById("loader")
            loader.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
            const response = await fetch('http://192.168.1.146:3030/groupehbk/sendmailsviafile', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if(response.status === 500){
                loader.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`
                setTimeout(() => {
                    loader.innerHTML = ""
                }, 5000);
            }
            if (response.ok) {
                loader.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
                console.log("Mails Envoyés")
                setTimeout(() => {
                    loader.innerHTML = ""
                }, 5000);
                console.log('Fichier téléchargé avec succès !')
            } else {
                console.error('Erreur lors du téléchargement du fichier.')
            }
        }
        catch(err){
            console.error('Erreur lors du téléchargement du fichier :', err)
        }
    }

    return(
        <div className="page_mail">
            <div className="page_mail__head">
                Veuillez choisir la base de donnée à utiliser pour envoyer les mails
            </div>
            <form className="page_mail__form" enctype="multipart/form-data" id="mailForm" onSubmit={(e)=>{SendMails(e)}}>
                <input type="file" name="excelFile"/>
                <button className="btn" type="submit">Envoyez e-mail</button>
            </form>
            <div className="send_mail_load" id="loader">
                
            </div>
            <Navbar/>
        </div>
    )
}

export default PageMail