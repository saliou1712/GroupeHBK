import { createContext, useState } from "react";

export const InfosPanelContext = createContext()

const InfosPanelContextProvider = ({children}) => {
    const [displayInfosPanel, setDisplayInfosPanel] = useState(false)

    return(
        <InfosPanelContext.Provider value={{displayInfosPanel, setDisplayInfosPanel}}>
            {children}
        </InfosPanelContext.Provider>
    )
}

export default InfosPanelContextProvider