import { createContext, useState } from "react";

export const Usecontext = createContext();

export const UsecontextProvider = ({children})=>{
    const [status, setstatus] = useState("Instructor")
    return(
        <Usecontext.Provider value={{status}}>
            {children}
        </Usecontext.Provider>
    )
}