import { createContext, useState } from "react";

export const AddPanelContext = createContext()

const AddPanelContextProvider = ({children}) => {
    const [panelDisplay, setPanelDisplay] = useState(false);

    return(
        <AddPanelContext.Provider value={{panelDisplay, setPanelDisplay}}>
            {children}
        </AddPanelContext.Provider>
    )
}

export default AddPanelContextProvider