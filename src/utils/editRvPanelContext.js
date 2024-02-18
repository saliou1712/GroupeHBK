import { createContext, useState } from "react";

export const RvEditPanelContext = createContext()

const RvEditPanelContextProvider = ({children}) => {
    const [displayRvEditPanel, setDisplayRvEditPanel] = useState(false)
    return(
        <RvEditPanelContext.Provider value={{displayRvEditPanel, setDisplayRvEditPanel}}>
            {children}
        </RvEditPanelContext.Provider>
    )
}

export default RvEditPanelContextProvider