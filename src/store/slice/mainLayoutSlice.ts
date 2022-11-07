import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Realm} from "../../type/Realm";
import {Application} from "../../type/Application";
import {ToastMessage} from "../../type/ToastMessage";


const mainLayoutSlice = createSlice(
    {
        name: "mainLayoutSlice",
        initialState: {
            visibleLeftSideBar: true,
            messageForShow: [] as ToastMessage[],
            allRealm: Array<Realm>(),
            currentRealm: null as Realm|null,
            allApplications:[] as Array<Application>,
            currentApplication: {} as Application,


        },
        reducers: {
            setVisibleLeftSideBar: (state, action: PayloadAction<boolean>) => {
                state.visibleLeftSideBar = action.payload;
            },
            setAllRealm: (state, action: PayloadAction<Realm[]>) => {
                state.allRealm = action.payload;
            },

            setCurrentRealm: (state, action: PayloadAction<Realm>) => {
                state.currentRealm = action.payload;
            },

            setAllApplications: (state, action: PayloadAction<Array<Application>>) => {
                state.allApplications = action.payload;
            },

            setCurrentApplication: (state, action: PayloadAction<Application>) => {
                state.currentApplication = action.payload;
            },

            setMessageForShow: (state, action: PayloadAction<ToastMessage[]>) => {
                state.messageForShow = action.payload;
            }
        }
    }
)

export const {
    setCurrentRealm,
    setAllRealm,
    setCurrentApplication,
    setMessageForShow,
    setAllApplications

} = mainLayoutSlice.actions

export default mainLayoutSlice.reducer;