import React from "react";
import {Button} from "primereact/button";

type props = {
    hide: (visible: boolean) => void,
    save: () => void
};

export const DialogFooterButton: React.FC<props> = ({hide, save}) => {

    return <>
        <div>
            <Button label={"Close"} icon="pi pi-power-off"
                    onClick={() => hide(false)}
                    className="p-button-danger"/>
            <Button label={"Save"} icon="pi pi-save"

                    onClick={() => save()}
                    className="p-button-success"/>
        </div>
    </>
}