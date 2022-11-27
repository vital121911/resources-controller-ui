import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {allRealms, selectedRealm} from "../../../../store/selector/selector";
import {itemByRealm, Realm} from "../../../../type/Realm";
import {setCurrentRealm} from "../../../../store/slice/mainLayoutSlice";
import {SelectItem} from "primereact/selectitem";
import {ListBox, ListBoxChangeParams} from "primereact/listbox";
import {MenuItem} from "primereact/menuitem";
import {ChangeRealmDataDialog} from "../../dialog/realm/ChangeRealmDataDialog";
import {Card} from "primereact/card";
import {PanelMenu} from "primereact/panelmenu";
import {fillAllRealmToStore} from "../../../../store/thunk/mainLayoutThunk";
import {useNavigate} from "react-router-dom";
import {uri} from "../../../../enums/uri";

type props = {}

export const RealmCardSideBar: React.FC<props> = () => {

    const id = "REALM_SIDE_BAR";

    const dispatcher = useDispatch<any>();

    const currentRealm = useSelector(selectedRealm);

    const allRealmsSelector = useSelector(allRealms);

    const [visibleDialog, setVisibleDialog] = useState(false);

    const [realmForChange, setRealmForChange] = useState(null);

    const navigator = useNavigate();

    const optionsRealmItemList = (): SelectItem[] => {
        return allRealmsSelector.map(value => itemByRealm(value))
    }
    const setSelectedRealm = (event: ListBoxChangeParams) => {
        const realm: Realm = allRealmsSelector.find(value => value.id === event.value) as Realm;
        dispatcher(setCurrentRealm(realm))
        navigator(uri[uri["/"]])

    }

    const openChangeDialog = () => {
        setRealmForChange(null);
        setVisibleDialog(true)
    }

    useEffect(() => {
        dispatcher(fillAllRealmToStore())
    }, [id])

    const panelItem = (): MenuItem[] => {
        return [
            {
                id: "REALM_SETTING",
                label: "CONFIGURATION",
                items: [{
                    id: "new", label: "Create",
                    command: () => openChangeDialog(),
                    icon: "pi pi-plus",
                }]
            }
        ]
    }

    return <>
        <Card title={"Realms"}
              id={id}>
            <PanelMenu model={panelItem()}/>
            <ChangeRealmDataDialog currentRealm={realmForChange} visible={visibleDialog} setVisible={setVisibleDialog}/>
            <ListBox value={currentRealm ? itemByRealm(currentRealm) : null}
                     options={optionsRealmItemList()}
                     onChange={setSelectedRealm}/>
        </Card>
    </>
}

