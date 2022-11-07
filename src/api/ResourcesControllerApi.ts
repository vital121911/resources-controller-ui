import {ResourcesControllerServices} from "./instance/ServicesInstance"
import {Realm} from "../type/Realm";
import {Application} from "../type/Application";

export const ResourcesControllerApi = {

    getAllRealms: async () => {
        const response = await ResourcesControllerServices().get("realm", {
            method: "GET",
        })
        return response;
    },

    saveRealm: async (realm: Realm) => {
        const response = await ResourcesControllerServices().post("realm", realm, {method: "POST",}
        )
        return response;
    },

    getApplicationsById: async (realmId: string) => {
        const response = await ResourcesControllerServices().get(`app/${realmId}`, {
                method: "GET",
            }
        )
        return response;
    },

    saveApplication: async (app: Application) => {
        const response = await ResourcesControllerServices().post(`app`, app, {
                method: "POST",
            }
        )
        return response;

    }


}