import React from "react";
import {ToastController} from "../toast/ToastController";
import {LeftMenuBar} from "../meny/bar/LeftMenuBar";
import {MainRoutController} from "../router/MainRoutController";

export const MainLayout: React.FC<any> = () => {

    return <>
        <ToastController/>
        <div className="grid col">

            <div className={"lg:col-3 md:col-4 flex-order-0"} id={"leftSideBarBlock"}>
                <LeftMenuBar/>
            </div>


            <div className={"lg:col-9 md:col-8 flex-order-1"} id={"leftSideBarBlock"}>
                <MainRoutController/>
            </div>
        </div>
    </>
}