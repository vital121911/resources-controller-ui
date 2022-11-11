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
                    onChange={event => addAction}
                    className="p-button-success"/>
                {/*<Button
                    label="Отказать в подписи"
                    icon="pi pi-times-circle"
                    className="p-button-danger"
                    style={{marginLeft: "5px"}}/>*/}
            </React.Fragment>
        )
    }


    return <>
        <Toolbar right={rightToolBarTemplate}/>
    </>
}
