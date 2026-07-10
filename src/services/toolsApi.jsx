import Axios from "axios";

import { TOOLS_API } from "../config";

function allTools(){
    return Axios.get(TOOLS_API)
        .then(response => response.data)
}

function find(id){
    return Axios.get(`${TOOLS_API}/${id}`)
        .then(response => response.data)
}

function deleteTools(id){
    return Axios.delete(`${TOOLS_API}/${id}`)
}

function newSkill(skill) {
    const formData = new FormData();

    formData.append("name", skill.name);
    formData.append("imageFile", skill.imageFile);

    return Axios.post(TOOLS_API, formData)
}

function toolUpdate(id, skill) {
    const formData = new FormData();

    formData.append("name", skill.name);

    if(skill.imageFile) {
        formData.append("imageFile", skill.imageFile);
    }

    formData.append("_method", "PUT");

    return Axios.post(`${TOOLS_API}/${id}`, formData);
}

export default {
    allTools: allTools,
    find: find,
    deleteTools: deleteTools,
    add: newSkill,
    update: toolUpdate
}