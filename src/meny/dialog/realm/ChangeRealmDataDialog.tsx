import React, {useState} from "react";
import {Realm} from "../../../type/Realm";

import {useDispatch} from "react-redux";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {setMessageForShow} from "../../../store/slice/mainLayoutSlice";
import {severity, ToastMessage, toMessage} from "../../../type/ToastMessage";
import {saveNewRealmThunk} from "../../../store/thunk/mainLayoutThunk";
import {DialogFooterButton} from "../button/DialogFooterButton";


type props = {
    currentRealm: Realm | null,
    visible: boolean,
    setVisible: (visible: boolean) => void
}

export const ChangeRealmDataDialog: React.FC<props> = ({currentRealm, visible, setVisible}) => {

    const [name, setName] = useState(currentRealm ? currentRealm.name : "")

    const [description, setDescription] = useState(currentRealm ? currentRealm.description : "")

    const dispatcher = useDispatch<any>();

    const save = () => {
        const validationField: ToastMessage[] = [];

        if (!description) {
            validationField.push(toMessage(severity.ERROR, "field description must not be empty"))
        }
        if (!name) {
            validationField.push(toMessage(severity.ERROR, "field name must not be empty"))
        }
        if (validationField.length > 0) {
            dispatcher(setMessageForShow(validationField))
        } else {
            sendNewRealm()
        }
    }

    const hiddenDialog = () => {
        setVisible(true);
    }

    const sendNewRealm = () => {
        const ream = {
            name: name,
            description: description
        } as Realm;
        dispatcher(saveNewRealmThunk({
            realm: ream,
            hide: hiddenDialog
        }))

    };

    const header = (): string => {

        if (currentRealm) {
            return `change ${currentRealm.name} realm`
        }
        return "Create new realm"
    }

    const renderFooter = () => {
        return (
            <DialogFooterButton hide={setVisible} save={save}/>
        );
    }

    return <>
        <Dialog className={"p-dialog-enter-done"}
                header={header}
                footer={renderFooter}
                visible={visible}
                style={{width: '50%'}}
                onHide={() => setVisible(false)}>
            <div style={{marginTop: "25px"}}>
             <span className="p-float-label">
    <InputText
        value={name}
        id={"inputRealmName"}
        className={"p-inputtext"}
        onChange={event => setName(event.target.value.trim())}
        style={{width: "100%"}}/>
                <label htmlFor={"inputRealmName"}>{"realm name"}</label>
            </span>
            </div>
            <div style={{marginTop: "25px"}}>
             <span className="p-float-label">
    <InputText
        value={description}
        id={"inputRealmDescriptions"}
        className={"p-inputtext"}
        onChange={event => setDescription(event.target.value.trim())}
        style={{width: "100%"}}/>
                <label htmlFor={"inputRealmDescriptions"}>{"realm descriptions"}</label>
            </span>
            </div>
        </Dialog>
    </>
}