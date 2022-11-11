export type VersionData = {
    id: string | null,
    version: Version
    value: Value,
}

export type Version = {
    versionId: string | null
    description: string
}

export type Value = {

    valueKey: string | null,
    data: string
}