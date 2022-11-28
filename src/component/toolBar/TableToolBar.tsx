import React from "react";
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";

export type props = {
    addAction: () => void
}

export const TableToolBar: React.FC<props> = ({addAction}) => {


    const rightToolBarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Add resource"
                    icon="pi pi-plus"
                    onClick={() => addAction()}
                    className="p-button-success"/>
            </React.Fragment>
        )
    }


    return <>
        <Toolbar right={rightToolBarTemplate}/>
    </>
}
