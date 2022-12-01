import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import {DialogFooterButton} from "../../meny/dialog/button/DialogFooterButton";
import {useDispatch, useSelector} from "react-redux";
import {currentApplication} from "../../../store/selector/selector";
import {Application} from "../../../type/Application";
import {Resource} from "../../../type/Resource";
import {saveResource} from "../../../store/thunk/mainLayoutThunk";
import {setMessageForShow} from "../../../store/slice/mainLayoutSlice";
import {severity, toMessage} from "../../../type/ToastMessage";

type props = {
    visible: boolean,
    setVisible: (visible: boolean) => void
};

export const AddResourceDialog: React.FC<props> = ({visible, setVisible}) => {

    const selectedApplicationSelector: Application = useSelector(currentApplication);

    const [resourceKey, setResource] = useState("");

    const [resourceValue, setResourceValue] = useState("");

    const [recourseDescription, setRecourseDescription] = useState("");

    const dispatcher = useDispatch<any>();

    const hideDialog = () => {
        setResource("");
        setResourceValue("");
        setRecourseDescription("");
        setVisible(false);
    }

    const saveData = () => {
        if (!resourceKey) {
            dispatcher(setMessageForShow([toMessage(severity.ERROR, "resourceKey")]));

        }

        const resourceFroSave: Resource = {
            resourceKey: resourceKey,
            resourceValue: resourceValue,
            // @ts-ignore
            applicationIds: Array(selectedApplicationSelector.id),
            id: null
        }
        // @ts-ignore
        dispatcher(saveResource({resource: resourceFroSave,appID:selectedApplicationSelector.id}))
        hideDialog()
    }


    return <>
        <Dialog className={"p-dialog-enter-done"}
                header={selectedApplicationSelector.name}
                footer={<DialogFooterButton hide={() => hideDialog()} save={() => saveData()}/>}
                visible={visible}
                style={{width: '50%'}}
                onHide={() => hideDialog()}>
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