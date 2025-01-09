

import { formContext } from "../contexts";
import { useContext } from "react";
import { IFormContext } from "../contexts";

export function useAudioFormData(){
    return useContext<IFormContext|null>(formContext);
}