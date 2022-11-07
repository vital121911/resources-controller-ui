import React from "react";
import {Route, Routes} from "react-router-dom";
import {ApplicationsTabView} from "../tab/ApplicationsTabView";
import {uri} from "../type/uri";


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