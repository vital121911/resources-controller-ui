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
        return await ResourcesControllerServices().get(`app/${realmId}`, {
                method: "GET",
            }
        );
    },

    saveApplication: async (app: Application) => {
        return await ResourcesControllerServices().post(`app`, app, {
                method: "POST",
            }
        );

    },

    getResourcesByApplicationId: async (applicationId: string) => {
        return await ResourcesControllerServices().get(`resource/app/${applicationId}`, {
                method: "GET",
            }
        );
    }


}