import {SelectItem} from "primereact/selectitem";

export type Realm = {
    id: string|null,
    name: string ,
    description: string
}

export const itemByRealm = (realm: Realm):SelectItem => {
    return {
        title:realm.description,
        value:realm.id,
        label:realm.name
    };
}
