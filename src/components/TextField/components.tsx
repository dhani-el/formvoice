import { useEffect } from "react"; 
import { useAudioFormData } from "../../hooks/index";
 
interface ITextfieldProps{
    id:number|string,
    required:boolean,
    type:string,
    disabled:boolean,
    onChange:Function,
    sound:HTMLMediaElement["src"]
}

export function TextField({id,required,type,disabled,onChange,sound}:ITextfieldProps){

        const {registerTextField,handleChange} = {...useAudioFormData()}

    function OnChange(stringValue:string){
        if(onChange){
             onChange(stringValue);
        }else{
            if (handleChange !== undefined) {
            handleChange(id,stringValue)
            }
        }

    }
    function registerSelf(){
        if (registerTextField !== undefined) {
            registerTextField(id,required,sound)
        }
    }
    useEffect(function(){
        registerSelf()
    },[])

    return <div id={String(id)} className="z-[1] relative" >
                <input onChange = {(Event)=>{OnChange(Event.target.value)}}
                type={type}
                disabled = {disabled}
                className={`p-1 rounded-sm border-[0.02rem]
                border-solid border-black outline-none `} />
    </div>
}

