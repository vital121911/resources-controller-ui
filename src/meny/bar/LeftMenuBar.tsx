import React from "react";
import "./leftMenuBar.css"
import {RealmCardSideBar} from "../card/realm/RealmCardSideBar";
import {ApplicationCardSideBar} from "../card/application/ApplicationCardSideBar";
import {Card} from "primereact/card";

type props = {};

export const LeftMenuBar: React.FC<props> = () => {

    return <>
        <Card>
            <RealmCardSideBar/>
            <ApplicationCardSideBar/>
        </Card>
    </>
}