import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Application} from "../../../../type/Application";
import {selectedRealm} from "../../../../store/selector/selector";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {DialogFooterButton} from "../button/DialogFooterButton";
import {setMessageForShow} from "../../../../store/slice/mainLayoutSlice";
import {severity, toMessage} from "../../../../type/ToastMessage";
import {saveApplication} from "../../../../store/thunk/mainLayoutThunk";
import {Realm} from "../../../../type/Realm";

type props = {
    currentApplication: Application | null,
    visible: boolean,
    setVisible: (visible: boolean) => void
}

export const ChangeApplicationDataDialog: React.FC<props> = ({currentApplication, visible, setVisible}) => {


    const currentRealm = useSelector(selectedRealm) as Realm

    const [name, setName] = useState(currentApplication ? currentApplication.name : "")

    const [description, setDescription] = useState(currentApplication ? currentApplication.description : "")

    const dispatcher = useDispatch<any>();


    const save = () => {
        if (!name) {
            dispatcher(setMessageForShow([toMessage(severity.ERROR, "field name mast not be empty")]))
        }
        if (!description) {
            dispatcher(setMessageForShow([toMessage(severity.ERROR, "field description mast not be empty")]))
        }
        if (name && description) {
            dispatcher(saveApplication({
                application: {
                    realmId: currentRealm.id ? currentRealm.id : "",
                    name: name,
                    description: description,
                    id: currentApplication ? currentApplication.id : null,
                },
                hide: () => setVisible(false)
            }))
        }
    }


    const header = (): string => {

        if (currentApplication) {
            return `change ${currentApplication.name} application`
        }
        return "Create new Application"
    }

    const renderFooter = () => {
        return (
            <DialogFooterButton
                hide={setVisible}
                save={save}/>
        );
    }


    return <><Dialog className={"p-dialog-enter-done"}
                     header={header}
                     footer={renderFooter}
                     visible={visible}
                     style={{width: '50%'}}
                     onHide={() => setVisible(false)}>
        <div style={{marginTop: "25px"}}>
             <span className="p-float-label">
    <InputText
        value={name}
        id={"inputApplicationName"}
        className={"p-inputtext"}
        onChange={event => setName(event.target.value.trim())}
        style={{width: "100%"}}/>
                <label htmlFor={"inputApplicationName"}>{"application name"}</label>
            </span>
        </div>
        <div style={{marginTop: "25px"}}>
             <span className="p-float-label">
    <InputText
        value={description}
        id={"inputApplicationDescriptions"}
        className={"p-inputtext"}
        onChange={event => setDescription(event.target.value.trim())}
        style={{width: "100%"}}/>
                <label htmlFor={"inputApplicationDescriptions"}>{"realm descriptions"}</label>
            </span>
        </div>
    </Dialog>
    </>;
}