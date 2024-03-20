import { createContext, useState } from "react";

export const OffreContext = createContext()

const OffreContextProvider = ({children}) => {
    const [offreToSee, setOffreToSee] = useState({})

    return(
        <OffreContext.Provider value={{offreToSee, setOffreToSee}}>
            {children}
        </OffreContext.Provider>
    )
}

export default OffreContextProvider