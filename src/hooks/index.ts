

import { formContext } from "../contexts";
import { useContext } from "react";

export function useAudioFormData(){
    return useContext(formContext);
}