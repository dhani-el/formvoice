import Form from "../components/Form";
import TextField from "../components/TextField";
import Button from "../components/Button";

export const defData = {
    id:376
}

export default {
    component:Form,
    title:"audioForm",
    tags:["autodocs"],
    args:{
        ...defData
    },
    excludeStories: /.*Data$/,
}

export const Default = {
    args: {
        url:"www.podo.com",
        children:<>
            <TextField disabled={false} id={34} required={false} type="text" sound=""/>
            <TextField disabled={false} id={34} required={false} type="text" sound=""/>
            <TextField disabled={false} id={34} required={false} type="text" sound=""/>
            <Button/>
        </>
    },
  };