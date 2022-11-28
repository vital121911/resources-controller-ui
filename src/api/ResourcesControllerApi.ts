import {ResourcesControllerServices} from "./instance/ServicesInstance"
import {Realm} from "../type/Realm";
import {Application} from "../type/Application";
import {VersionDataContainer} from "../type/VersionDataContainer";

export const ResourcesControllerApi = {

    getAllRealms: async () => {
        return await ResourcesControllerServices().get("realm", {
            method: "GET",
        });
    },

    saveRealm: async (realm: Realm) => {
        return await ResourcesControllerServices().post("realm", realm, {method: "POST",}
        );
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
    },

    saveResource: async (container: VersionDataContainer) => {
        return await ResourcesControllerServices().post(`version`, container, {
                method: "POST",
            }
        );
    }

}