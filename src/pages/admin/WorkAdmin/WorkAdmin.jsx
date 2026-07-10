import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Field from "../../../components/forms/Field/Field";
import FileInput from "../../../components/forms/FileInput/FileInput";
import "./WorkAdmin.scss"
import DateInput from "../../../components/forms/DateInput/DateInput";
import ToolsInput from "../../../components/forms/ToolsInput/ToolsInput";
import websitesAPI from "../../../services/websitesAPI";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { COVER_URL } from "../../../config";

const WorkAdmin = (props) => {
    let {id="new"} = useParams()
    const navigate = useNavigate()
    const [editing, setEditing] = useState(false)
    const [dateInp, setDateInp] = useState("")
    const [preview, setPreview] = useState("")

    const [work, setWork] = useState({
        title: "",
        description: "",
        createdAt: "",
        url: "",
        githubUrl: "",
        figmaUrl: "",
        coverFile: null,
        tools : []
    })

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        createdAt: "",
        url: "",
        githubUrl: "",
        figmaUrl: "",
        coverFile: "",
        tools : ""
    })

    const fetchWebsite = async (id) => {
        try {
            const {title, description, createdAt, url, githubUrl, figmaUrl, tools, thumbnail} = await websitesAPI.find(id)
            const formattedDate = createdAt.split("T")[0] + " 00:00:00";
            const formattedTools = tools.map(tool => tool.id)
            setWork({title, description, createdAt: formattedDate, url, githubUrl, figmaUrl, tools: formattedTools})
            setPreview(thumbnail)
        } catch(error) {
            toast.error("Le projet n'a pas pû être chargé")
            navigate("/admin/works")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            if(editing)
            {
                await websitesAPI.update(id, work)
                toast.success("Le projet a bien été modifié")
            } else {
                await websitesAPI.newProject(work)
                toast.success("Le nouveau projet a bien été enregistré")
                navigate("/admin/works",{replace: true})
            }
        } catch({error}) {
            const response = error?.response;
            const violations = response?.data?.violations;
            if(violations){
                const apiErrors = {
                    title: "",
                    description: "",
                    createdAt: "",
                    url: "",
                    githubUrl: "",
                    figmaUrl: "",
                    coverFile: "",
                    tools : ""
                }
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)
            }
            toast.error("Une erreur est survenue")
        }
    }

    const handleChange = (event) => {
        const {name, value, type, files} = event.target;
        if(type === 'file') {
            setWork(work => ({...work, [name]: files[0]}))
            setPreview("")
        } else if (name === 'createdAt') {
            setDateInp(value)
            let date = value + " 00:00:00";
            setWork(work => ({...work, [name]: date}))
        } else if (name === 'tools') {
            const id = parseInt(value, 10);

            setWork(work => {
                const tools = work.tools.includes(id)
                    ? work.tools.filter(t => t !== id) // remove
                    : [...work.tools, id]; // add

                return { ...work, tools };
            });
        } else {
            setWork(work => ({...work, [name]: value}))
        }
    }

    useEffect(() => {
        if(id !== "new")
        {
            setEditing(true)
            fetchWebsite(id)
        }
    },[id])

    return ( 
        <section className="work-admin">
            <h1>
                {editing ? "Modification du projet" : "Nouveau projet"}
            </h1>
            <form onSubmit={handleSubmit}>
                <Field 
                    type="text"
                    name="title"
                    id="title"
                    label="Titre"
                    value={work.title}
                    error={errors.title}
                    placeholder="Titre du projet"
                    onChange={handleChange}
                />
                <Field 
                    type="textarea"
                    name="description"
                    id="description"
                    label="Description"
                    value={work.description}
                    error={errors.description}
                    placeholder="Description du projet"
                    onChange={handleChange}
                />
                <Field 
                    type="text"
                    name="url"
                    id="url"
                    label="Lien"
                    value={work.url}
                    error={errors.url}
                    placeholder="Lien du site internet"
                    onChange={handleChange}
                />
                <Field 
                    type="text"
                    name="githubUrl"
                    id="githubUrl"
                    label="Github"
                    value={work.githubUrl}
                    error={errors.githubUrl}
                    placeholder="Lien du Github"
                    onChange={handleChange}
                />
                <Field 
                    type="text"
                    name="figmaUrl"
                    id="figmaUrl"
                    label="Figma"
                    value={work.figmaUrl}
                    error={errors.figmaUrl}
                    placeholder="Lien du Github"
                    onChange={handleChange}
                />
                <DateInput 
                    label="Date de mise en ligne"
                    name="createdAt"
                    value={dateInp}
                    onChange={handleChange}
                />
                <FileInput 
                    name="coverFile"
                    onChange={handleChange}
                    label="Image de couverture"
                    value={work.coverFile}
                    error={errors.coverFile}
                    alt={work.title}
                />
                {preview && <img src={`${COVER_URL}${preview}`} alt={`cover du projet ${work.title}`} className="preview" />}
                
                <ToolsInput 
                    name="tools"
                    label="Cochez les compétences concernées"
                    value={work.tools}
                    onChange={handleChange}
                />
                <div className="action-button">
                    <button type="submit" className={"btn " + ((!editing) ? "add" : "edit")}>{(!editing) ? "Enregistrer" : "Modifier"}</button>
                    <Link to="/admin/works" className="btn cancel">Annuler</Link>
                </div>
            </form>
        </section>
     );
}
 
export default WorkAdmin;