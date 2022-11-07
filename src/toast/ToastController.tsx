import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {messageForShow} from "../store/selector/selector";
import {Toast, ToastMessageType} from "primereact/toast";
import {severity, ToastMessage} from "../type/ToastMessage";
import {setMessageForShow} from "../store/slice/mainLayoutSlice";

type props = {}

export const ToastController: React.FC<props> = () => {

    const toast = useRef<Toast>(null);

    const messageForShowSelector: ToastMessage[] = useSelector(messageForShow);

    const dispatcher = useDispatch();

    const convertToMessageType = (message: ToastMessage): ToastMessageType => {
        return {
            // @ts-ignore
            severity: severity[message.severity].toLowerCase(),
            summary: severity[message.header],
            detail: message.message,
            life: 3000,
            sticky: false,
            closable: false
        }
    }

    useEffect(() => {
        if (messageForShowSelector.length > 0) {
            messageForShowSelector.forEach(value => {
                // @ts-ignore
                toast.current.show(convertToMessageType(value))
            })
            dispatcher(setMessageForShow([]))
        }
    }, [messageForShowSelector.length])

    return <>
        <Toast ref={toast}
               position={"top-right"}/>
    </>
}