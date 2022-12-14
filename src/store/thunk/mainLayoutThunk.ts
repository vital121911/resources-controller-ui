import {createAsyncThunk} from "@reduxjs/toolkit";
import {ResourcesControllerApi} from "../../api/ResourcesControllerApi";
import {
    setAllApplications,
    setAllRealm,
    setCurrentApplication,
    setCurrentRealm,
    setMessageForShow
} from "../slice/mainLayoutSlice";
import {Realm} from "../../type/Realm";
import {severity, toMessage} from "../../type/ToastMessage";
import {Application} from "../../type/Application";


export const fillAllRealmToStore = createAsyncThunk("resources/fillAllRealmToStore", async (arg, thunkAPI) => {
    try {

        const response = await ResourcesControllerApi.getAllRealms();
        if (response.status === 200) {
            thunkAPI.dispatch(setAllRealm(response.data))
        }
    } catch (error) {
        console.log(error);
    }
})

export const saveNewRealmThunk = createAsyncThunk("resources/saveNewRealm", async (props: { realm: Realm, hide: () => void }, thunkAPI) => {
    try {
        const response = await ResourcesControllerApi.saveRealm(props.realm);
        if (response.status === 200) {
            let data = response.data as Realm;
            thunkAPI.dispatch(setMessageForShow([toMessage(severity.SUCCESS, `saved realm ${data.name}`)]));
            thunkAPI.dispatch(setCurrentRealm(data));
            thunkAPI.dispatch(fillAllRealmToStore());
            props.hide()
        }
    } catch (error) {
        console.log(error);
        // @ts-ignore
        thunkAPI.dispatch(setMessageForShow([toMessage(severity.ERROR, error)]));
    }
})

export const fillAllApplicationsByRealmToStore = createAsyncThunk("resources/fillAllApplicationsToStore", async (props: { realmId: string }, thunkAPI) => {
    try {

        const response = await ResourcesControllerApi.getApplicationsById(props.realmId);
        if (response.status === 200) {
            let allApplicationsByRealm = response.data as Application[];
            thunkAPI.dispatch(setAllApplications(allApplicationsByRealm))
        }
    } catch (error) {
        console.log(error);
        // @ts-ignore
        thunkAPI.dispatch(setMessageForShow([toMessage(severity.ERROR, error)]))
    }
})

export const saveApplication = createAsyncThunk("resources/saveApplicationThunk", async (props: { application: Application, hide:()=>void}, thunkAPI) => {
    try {

        const response = await ResourcesControllerApi.saveApplication(props.application);
        if (response.status === 200) {
            let currentApplication = response.data as Application;
            thunkAPI.dispatch(setCurrentApplication(currentApplication))
            thunkAPI.dispatch(fillAllApplicationsByRealmToStore({realmId: currentApplication.realmId}))
            props.hide();
            thunkAPI.dispatch(setMessageForShow([toMessage(severity.SUCCESS, `saved application ${currentApplication.name}`)]))
        }
    } catch (error) {
        console.log(error);
        // @ts-ignore
        thunkAPI.dispatch(setMessageForShow([toMessage(severity.ERROR, error)]))
    }
})










