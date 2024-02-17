const { createContext, useState } = require("react");

export const ImportFilePanelContext = createContext()

const ImportFilePanelContextProvider = ({children}) => {
    const [displayFilePanelImport, setDisplayFilePanelImport] = useState(false)

    return(
        <ImportFilePanelContext.Provider value={{displayFilePanelImport, setDisplayFilePanelImport}}>
            {children}
        </ImportFilePanelContext.Provider>
    )
}

export default ImportFilePanelContextProvider