import { createContext, useState } from "react";

export const ArrierePlanContext = createContext()

const ArrierePlanContextProvider = ({children}) => {
    const [displayArrierePlan, setDisplayArrierePlan] = useState(false)
    return(
        <ArrierePlanContext.Provider value={{displayArrierePlan, setDisplayArrierePlan}}>
            {children}
        </ArrierePlanContext.Provider>
    )
}

export default ArrierePlanContextProvider