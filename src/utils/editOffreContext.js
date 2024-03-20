import { createContext, useState } from "react";

export const EditOffreContext = createContext()

const EditOffreContextProvider = ({children}) => {
    const [displayEditOffre, setDisplayEditOffre] = useState(false)

    return(
        <EditOffreContext.Provider value={{displayEditOffre, setDisplayEditOffre}}>
            {children}
        </EditOffreContext.Provider>
    )
}

export default EditOffreContextProvider