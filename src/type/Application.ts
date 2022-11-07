import {SelectItem} from "primereact/selectitem";

export type Application = {
    id: string|null,
    name: string,
    description: string
    realmId: string
}


export const itemByApplication = (application: Application): SelectItem => {
    return {
        title: application.description,
        value: application.id,
        label: application.name
    };
}
