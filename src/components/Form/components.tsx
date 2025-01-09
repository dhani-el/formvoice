
import {JSX, useState } from "react";
import { formContext } from "../../contexts";

interface FormInterface{
    children?:JSX.Element,
    id:number|string,
    url:string
}

interface IFormData{
    id:number|string,
    url:string,
    [key:number]:{
        value:string,
        isRequired:boolean,
        audio?:HTMLMediaElement["src"] }

}

export enum ErequestStates{
    loading ="loading",
    error="error",
    success="success",
    noactivity="noactivity"
}

export function Form({children,id,url}:FormInterface){
    const [formData,setFormData] = useState<IFormData>()
    const [requestState,setRequestState] = useState<ErequestStates>(ErequestStates.noactivity);
    const [data,setData] = useState<JSON|null>(null);
    const [error,setError] = useState<JSON|null>(null);
    const audio = new Audio();

    function OnChange(inputId:number,inputValue:string,isRequired:boolean){
        setFormData((prev)=>{
            if (prev) {
                return {...prev,[inputId]:{...prev[inputId],value:inputValue}}
            }
        })
    }
    function setErrorRequestState(){
        setRequestState(()=>{
            return ErequestStates.error
        })
    }
    function setLoadingRequestState(){
        setRequestState(()=>{
            return ErequestStates.loading
        })
    }
    function setSuccessRequestState(){
        setRequestState(()=>{
            return ErequestStates.success
        })
    }
    function setErrorDetails(errorObj:JSON){
        setError(()=>errorObj)
    }
    function setDataDetails(dataObj:JSON){
        setData(()=>dataObj)
    }
    function EnsureRequiredStatesAreNotEmpty(){
        console.log("EnsureRequiredStatesAreNotEmpty was clicked");
        for (const textfield in formData) {
                if (formData[Number(textfield)].value.trim() === "") {
                    let audio = formData[Number(textfield)]?.audio;
                    visuallyIsolateEmptyInput(textfield)
                    if(audio !== undefined){
                        playAudio(audio)
                    }
                    return false
                }
        }
        
        return true
    }
    function playAudio(audiosrc:HTMLMediaElement["src"]){
        audio.src = audiosrc;
        if (audio.HAVE_FUTURE_DATA) {
            audio.play()
        }
    }
    function SendRequestPayload(){
        return new Promise(function (resolve,reject) {
            setTimeout(() => {
                resolve({name:"daniel", alias:"creator"})
            }, 3000)
        })
    }
    function visuallyIsolateEmptyInput(inputId:number|string){
        const formBlur = document.getElementById(`blur${id}`);
        const  emptyInput = document.getElementById(`${inputId}`);
        if (emptyInput instanceof HTMLElement) {
            emptyInput.style.zIndex = "1";
            emptyInput.style.zIndex = "3";
        }
        setTimeout(() => {
            removeVisualIsolation(inputId)
        }, 2000);
    }
    function removeVisualIsolation(inputId:number|string){
        const formBlur = document.getElementById(`blur${id}`);
        const  emptyInput = document.getElementById(`${inputId}`);
        if (formBlur instanceof HTMLElement) {
            formBlur.style.display = "none"
            formBlur.style.zIndex = "0";
        }
        if (emptyInput instanceof HTMLElement) {
            emptyInput.style.zIndex ="1";
        }
    }
    function OnSubmit(event:Event){
        event.preventDefault()
        setLoadingRequestState();
        let filledFields = EnsureRequiredStatesAreNotEmpty();
        if (filledFields) {
            SendRequestPayload()
            .then(response=>{
                    setSuccessRequestState();
                    setDataDetails(JSON.parse(String(response)));
                    return response;
            }).catch(error=>{
                    setErrorRequestState();
                    setErrorDetails(error)
                    console.log(error);
                    return error
            })
        }
    }
    function registerTextField(id:number|string,isRequired:boolean,sound: HTMLAudioElement["src"]){

        setFormData((init)=>{
            if (init !== undefined) {
                return ({...init,[id]:{value:"",isRequired,audio:sound}})
            }
        })
    }

    return <form className="relative">
                <div id={`blur${id}`} className="w-full h-full absolute top-0 left-0 bg-slate-700 opacity-50 z-0 hidden">

                </div>
                <formContext.Provider value={{id,data,error,requestState:requestState,handleChange:OnChange,OnSubmit,registerTextField}}>
                    {children}
                </formContext.Provider>
            </form>
}