import axios from "axios";


const host = `${window.location.hostname}:8080`;

export const ResourcesControllerServices = () => axios.create({
    baseURL: `http://${host}/`,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    }
})


