import { useEffect, useState } from "react";

function EmailConfirmationPage() {
    const [confirmationMessage, setConfirmationMessage] = useState('')

    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token');

    useEffect(() => {
        async function ConfirmEmail() {
            if (!token) {
                setConfirmationMessage('Token manquant dans l\'URL.')
                return
            }
    
            try {
                const response = await fetch(`http://192.168.1.146:3030/groupehbk/confirm-email`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        token: token
                    })
                });
    
                if (!response.ok) {
                    throw new Error('Réponse réseau incorrecte')
                }
    
                const data = await response.json() // Extraction des données JSON de la réponse
                setConfirmationMessage(data.message)
            } catch (error) {
                console.error('Erreur lors de la confirmation de l\'e-mail : ', error);
                setConfirmationMessage('Une erreur est survenue lors de la confirmation de l\'e-mail.')
            }
        }
        ConfirmEmail()
    }, [token])

    return (
        <div className="confirmationPage">
            <h2>Confirmation de l'e-mail</h2>
            <p>{confirmationMessage}</p>
        </div>
    );
}

export default EmailConfirmationPage;
