import { createContext, useState } from "react";

export const ProspectContext = createContext()

const ProspectContextProvider = ({children}) => {
    const [prospectToSee, setProspectToSee] = useState({})

    return(
        <ProspectContext.Provider value={{prospectToSee, setProspectToSee}}>
            {children}
        </ProspectContext.Provider>
    )
}

export default ProspectContextProvider