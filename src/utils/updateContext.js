import { createContext, useState } from "react";

export const UpdateContext = createContext()

const UpdateContextProvider = ({children}) => {
    const [update, setUpdate] = useState(false)
    return(
        <UpdateContext.Provider value={{update, setUpdate}}>
            {children}
        </UpdateContext.Provider>
    )
}

export default UpdateContextProvider