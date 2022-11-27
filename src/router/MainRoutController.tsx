import React from "react";
import {Route, Routes} from "react-router-dom";
import {ApplicationsTabView} from "../component/tab/ApplicationsTabView";
import {uri} from "../enums/uri";


export const MainRoutController: React.FC<any> = () => {

    const EmptyData=()=>{
        return<></>
    }


    return <>
        <Routes>
            <Route path={uri[uri["/"]]} element={<EmptyData/>}/>
            <Route path={uri[uri.app]} element={<ApplicationsTabView/>}/>
        </Routes>

    </>
}