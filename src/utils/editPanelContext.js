import { createContext, useState } from "react";

export const EditPanelContext = createContext()

const EditPanelContextProvider = ({children}) => {
    const [displayEditPanel, setEditDisplayPanel] = useState(false)
    return(
        <EditPanelContext.Provider value={{displayEditPanel, setEditDisplayPanel}}>
            {children}
        </EditPanelContext.Provider>
    )
}

export default EditPanelContextProvider