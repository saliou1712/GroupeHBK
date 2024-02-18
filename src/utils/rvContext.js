import { createContext, useState } from "react";

export const RvContext = createContext()

const RvContextProvider = ({children}) => {
    const [rvToSee, setRvToSee] = useState({})

    return(
        <RvContext.Provider value={{rvToSee, setRvToSee}}>
            {children}
        </RvContext.Provider>
    )
}

export default RvContextProvider