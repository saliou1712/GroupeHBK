import { createContext, useState } from "react";

export const RvPanelContext = createContext()

const RvPanelContextProvider = ({children}) => {
    const [displayRvPanel, setDisplayRvPanel] = useState(false)
    return(
        <RvPanelContext.Provider value={{displayRvPanel, setDisplayRvPanel}}>
            {children}
        </RvPanelContext.Provider>
    )
}

export default RvPanelContextProvider