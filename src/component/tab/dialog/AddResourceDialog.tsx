import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {DialogFooterButton} from "../../meny/dialog/button/DialogFooterButton";
import {useSelector} from "react-redux";
import {currentApplication} from "../../../store/selector/selector";
import {Application} from "../../../type/Application";

type props = {
    visible: boolean,
    setVisible: (visible: boolean) => void
};

export const AddResourceDialog: React.FC<props> = ({visible, setVisible}) => {

    const selectedApplicationSelector: Application = useSelector(currentApplication);

    const [resourceKey, setResource] = useState("");

    const [resourceValue, setResourceValue] = useState("");

    const [recourseDescription, setRecourseDescription] = useState("");


    return <>
        <Dialog className={"p-dialog-enter-done"}
                header={selectedApplicationSelector.name}
                footer={<DialogFooterButton hide={() => setVisible(false)} save={() => {
                }}/>}
                visible={false}
                style={{width: '50%'}}
                onHide={() => setVisible(false)}>
            <div style={{marginTop: "25px"}}>
             <span className="p-float-label">
    <InputText
        value={resourceKey}
        id={"inputResourceKeyCreateResourceDialog"}
        className={"p-inputtext"}
        onChange={event => setResource(event.target.value.trim())}
        style={{width: "100%"}}/>
                <label htmlFor={"inputResourceKeyCreateResourceDialog"}>{"resource key"}</label>
            </span>
            </div>
            <div style={{marginTop: "25px"}}>
             <span className="p-float-label">
    <InputText
        value={resourceValue}
        id={"inputResourceValueCreateResourceDialog"}
        className={"p-inputtext"}
        onChange={event => setResourceValue(event.target.value.trim())}
        style={{width: "100%"}}/>
                <label htmlFor={"inputResourceValueCreateResourceDialog"}>{"resource value"}</label>
            </span>
            </div>

            <div style={{marginTop: "25px"}}>
             <span className="p-float-label">
    <InputText
        value={recourseDescription}
        id={"inputResourceDescriptionCreateResourceDialog"}
        className={"p-inputtext"}
        onChange={event => setRecourseDescription(event.target.value.trim())}
        style={{width: "100%"}}/>
                <label htmlFor={"inputResourceDescriptionCreateResourceDialog"}>{"resource description"}</label>
            </span>
            </div>
        </Dialog>
    </>
}