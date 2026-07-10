import Axios  from "axios";

import { WEBSITES_API } from "../config";

function findAll(){
    return Axios.get(WEBSITES_API)
        .then(response => response.data)
}

function find(id){
    return Axios.get(`${WEBSITES_API}/${id}`)
        .then(response => response.data)
}

function findLasts(){
    return Axios.get(`${WEBSITES_API}?count=3`)
}

function deleteWebsite(id) {
    return Axios.delete(`${WEBSITES_API}/${id}`)
}

function newProject(project) {
    const formData = new FormData();

    formData.append("title", project.title);
    formData.append("description", project.description);
    formData.append("createdAt", project.createdAt);
    formData.append("url", project.url);
    formData.append("githubUrl", project.githubUrl);
    formData.append("figmaUrl", project.figmaUrl);
    formData.append("coverFile", project.coverFile); // File
    formData.append("tools", JSON.stringify(project.tools)); // array

    return Axios.post(WEBSITES_API, formData);
}

function websiteUpdate(id, project) {
    const formData = new FormData();

    formData.append("title", project.title);
    formData.append("description", project.description);
    formData.append("createdAt", project.createdAt);
    formData.append("url", project.url);
    formData.append("githubUrl", project.githubUrl);
    formData.append("figmaUrl", project.figmaUrl);
    formData.append("tools", JSON.stringify(project.tools)); // array

    if(project.coverFile) {
        formData.append("coverFile", project.coverFile)
    }

    formData.append("_method", "PUT")

    return Axios.post(`${WEBSITES_API}/${id}`, formData);
}

export default {
    findAll: findAll,
    last: findLasts,
    delete: deleteWebsite,
    newProject: newProject,
    find: find,
    update: websiteUpdate
}