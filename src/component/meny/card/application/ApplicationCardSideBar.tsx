import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allApplications, currentApplication, selectedRealm} from "../../../../store/selector/selector";
import {SelectItem} from "primereact/selectitem";
import {Realm} from "../../../../type/Realm";
import {ListBox, ListBoxChangeParams} from "primereact/listbox";
import {Application, itemByApplication} from "../../../../type/Application";
import {setCurrentApplication} from "../../../../store/slice/mainLayoutSlice";
import {MenuItem} from "primereact/menuitem";
import {Card} from "primereact/card";
import {PanelMenu} from "primereact/panelmenu";
import {fillAllApplicationsByRealmToStore} from "../../../../store/thunk/mainLayoutThunk";
import {useNavigate} from "react-router-dom";
import {uri} from "../../../../enums/uri";
import {ChangeApplicationDataDialog} from "../../dialog/application/ChangeAplicationDataDialog";

type props = {}

export const ApplicationCardSideBar: React.FC<props> = () => {

    const currentRealm: Realm | null = useSelector(selectedRealm);

    const allApplicationsSelector: Application[] = useSelector(allApplications);

    const currentApplicationSelector = useSelector(currentApplication);

    const dispatcher = useDispatch<any>();

    const navigator = useNavigate();

    const [visibleDialog, setVisibleDialog] = useState(false);

    const [applicationForChange, setApplicationForChange] = useState(null);

    const optionsApplicationsItemList = (): SelectItem[] => {
        return allApplicationsSelector.map(value => itemByApplication(value))
    }
    const setSelectedApplication = (event: ListBoxChangeParams) => {
        const application: Application = allApplicationsSelector
            .find(value => value.id === event.value) as Application;
        dispatcher(setCurrentApplication(application))
        navigator(uri[uri.app])
    }

    const openFactoryDialog = () => {
        setApplicationForChange(null);
        setVisibleDialog(true)
    }

    const panelItem = (): MenuItem[] => {
        return [
            {
                id: "APPLICATION_SETTING",
                label: "CONFIGURATION",
                items: [{
                    id: "new",
                    label: "Create",
                    icon: "pi pi-plus",
                    command: () => openFactoryDialog()
                }]
            }
        ]
    }

    useEffect(() => {
        if (currentRealm && currentRealm.id) {
            dispatcher(fillAllApplicationsByRealmToStore({realmId: currentRealm.id}))
        }
    }, [currentRealm])


    const cardBoxResult = () => {
        if (!currentRealm || !currentRealm.id) {
            return <></>
        }
        return <Card title={"Applications"}
                     subTitle={currentRealm ? currentRealm.name : ""}>
            <PanelMenu model={panelItem()}/>
            <ChangeApplicationDataDialog currentApplication={applicationForChange} visible={visibleDialog}
                                         setVisible={setVisibleDialog}/>
            <ListBox
                value={itemByApplication(currentApplicationSelector)}
                options={optionsApplicationsItemList()}
                onChange={setSelectedApplication}/>
        </Card>
    }

    return <>
        {[cardBoxResult()]}
    </>
}