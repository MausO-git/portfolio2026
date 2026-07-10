import { useEffect, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import Field from "../../../components/forms/Field/Field";
import toolsApi from "../../../services/toolsApi";
import { toast } from "react-toastify";
import FileInput from "../../../components/forms/FileInput/FileInput";
import { COVER_URL } from "../../../config";
import "../WorkAdmin/WorkAdmin.scss";
import { Link } from "react-router-dom";

const ToolAdmin = (props) => {
    let {id="new"} = useParams()
    const navigate = useNavigate()
    const [editing, setEditing] = useState(false)
    const [preview, setPreview] = useState("")

    const [tool, setTool] = useState({
        name: "",
        imageFile: null
    })

    const [errors, setErrors] = useState({
        name: "",
        imageFile: ""
    })

    const fetchTool = async (id) => {
        try {
            const {name, thumbnail} = await toolsApi.find(id)
            setTool({name})
            setPreview(thumbnail)
        } catch(error) {
            toast.error("La compétence n'a pas pû être chargée")
            navigate("/admin/skills")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            if(editing) {
                await toolsApi.update(id, tool)
                toast.success("La compétence a bien été modifiée")
            } else {
                await toolsApi.add(tool)
                toast.success("La compétence a bien été enregistrée")
                navigate("/admin/skills",{replace: true})
            }
        } catch({error}) {
            const response = error?.response;
            const violations = response?.data?.violations;
            if(violations){
                const apiErrors = {
                    name: "",
                    imageFile: ""
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
            setTool(tool => ({...tool, [name]: files[0]}))
            setPreview("");
        } else {
            setTool(tool => ({...tool, [name]: value}))
        }
        console.log(tool)
    }

    useEffect(() => {
        if(id !== "new")
        {
            setEditing(true)
            fetchTool(id)
        }
    },[id])

    return ( 
        <section className="tool-admin">
            <h1>
                {editing ? "Modification de la compétence" : "Ajout d'une compétence"}
            </h1>
            <form onSubmit={handleSubmit}>
                <Field
                    type="text"
                    name="name"
                    id="name"
                    label="Nom"
                    value={tool.name}
                    error={errors.name}
                    placeholder="Nom de la compétence"
                    onChange={handleChange}
                />
                <FileInput 
                    name="imageFile"
                    onChange={handleChange}
                    label="Logo de la compétence"
                    value={tool.imageFile}
                    error={errors.imageFile}
                    alt={tool.name}
                />
                {preview && <img src={`${COVER_URL}${preview}`} alt={`cover de la compétence ${tool.name}`} className="preview" />}
                <div className="action-button">
                    <button type="submit" className={"btn " + ((!editing) ? "add" : "edit")}>{(!editing) ? "Enregistrer" : "Modifier"}</button>
                    <Link to="/admin/skills" className="btn cancel">Annuler</Link>
                </div>
            </form>
        </section>
     );
}
 
export default ToolAdmin;