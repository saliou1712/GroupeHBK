import { createContext, useState } from "react";

export const UpdateOffrePanelContext = createContext()

const UpdateOffrePanelContextProvider = ({children}) => {
    const [displayUpdateOffrePanel, setDisplayUpdateOffrePanel] = useState(false)
    return (
        <UpdateOffrePanelContext.Provider value={{displayUpdateOffrePanel, setDisplayUpdateOffrePanel}}>
            {children}
        </UpdateOffrePanelContext.Provider>
    )
}

export default UpdateOffrePanelContextProvider