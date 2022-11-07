import {rootReducer} from "../store";


export type AppRootStateType = ReturnType<typeof rootReducer>


export const selectedRealm = (state: AppRootStateType) => state.mainLayoutSlice.currentRealm;
export const allRealms = (state: AppRootStateType) => state.mainLayoutSlice.allRealm;
export const currentApplication = (state: AppRootStateType) => state.mainLayoutSlice.currentApplication;
export const messageForShow = (state: AppRootStateType) => state.mainLayoutSlice.messageForShow;
export const allApplications = (state: AppRootStateType) => state.mainLayoutSlice.allApplications;


