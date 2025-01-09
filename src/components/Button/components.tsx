
import { useAudioFormData } from "../../hooks"
import { ErequestStates } from "../Form/components";

export default function Button({value="Submit"}){
    let {requestState,OnSubmit} = {...useAudioFormData()};

    function handleButtonClick(Event:React.MouseEvent<HTMLButtonElement, MouseEvent>){
        if(OnSubmit !== undefined){
            OnSubmit(Event)
        }
    }

    return <button className="z-[1] bg-red-400 relative" disabled = {requestState == ErequestStates.loading } onClick={(Event)=>{handleButtonClick(Event)}}>
                {value}
    </button>
}