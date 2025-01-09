import { createContext } from "react";
import { ErequestStates } from "../components/Form/components";

export interface IFormContext{
    id:number|string,
    data:JSON|null,
    error:JSON|null,
    requestState:ErequestStates
    handleChange:Function,
    OnSubmit:Function,
    registerTextField:Function,
    
}

export const DataContext = createContext({});

export const formContext  = createContext<IFormContext|null>(null)