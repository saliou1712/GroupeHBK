import { createContext, useState } from "react";

export const InfosOffresPanelContext = createContext()

const InfosOffresPanelContextProvider = ({children}) => {
    const [displayInfosOffresPanel, setDisplayInfosOffresPanel] = useState(false)

    return(
        <InfosOffresPanelContext.Provider value={{displayInfosOffresPanel, setDisplayInfosOffresPanel}}>
            {children}
        </InfosOffresPanelContext.Provider>
    )
}

export default InfosOffresPanelContextProvider