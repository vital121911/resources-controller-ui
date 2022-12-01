export type ToastMessage = {
    severity: severity,
    header: severity,
    message: string
}

export enum severity {
    ERROR, INFO, WARN, SUCCESS

}

export const toMessage = (severity: severity, message: string): ToastMessage => {

    return {
        severity: severity,
        header: severity,
        message: message
    }
}