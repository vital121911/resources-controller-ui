import {VersionData} from "./VersionData";

export type Resource = {
    applicationId: string,
    id: string | null,
    resourceKey: string,
    currentValue: VersionData
}