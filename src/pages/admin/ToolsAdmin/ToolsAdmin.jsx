import { useEffect, useState } from "react";
import toolsApi from "../../../services/toolsApi";
import { toast } from "react-toastify";
import "./ToolsAdmin.scss";
import TableLoader from "../../../components/Loaders/TableLoader";
import { Link } from "react-router-dom";

const ToolsAdmin = (props) => {
    const [tools, setTools] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTools = async () => {
        try {
            const data = await toolsApi.allTools()
            setTools(data.member)
            setLoading(false)
        } catch(error) {
            toast.error("Impossible de charger les compétences")
        }
    }

    const handleDelete = async (id) => {
        const originalTools = [...tools]
        setTools(tools.filter(tool => tool.id !== id))

        try {
            await toolsApi.deleteTools(id)
            toast.warning("La compétence "+id+" a bien été suprimée")
        } catch(error) {
            setTools(originalTools)
            toast.error("La suppression a échoué !")
        }
    }

    useEffect(() => {
        fetchTools()
    },[])

    return ( 
        <section className="tools-admin">
            <h1>Mes compétences</h1>
            { (!loading) ? (
                <table className="tools-tab">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nom</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tools.map(tool => (
                        <tr key={tool.id}>
                            <td>{tool.id}</td>
                            <td>{tool.name}</td>
                            <td>{tool.imageUrl}</td>
                            <td className="action">
                                <Link to={`/admin/skills/${tool.id}`} className="action-button modif">Modifier</Link>
                                <button className="action-button supp" onClick={() => handleDelete(tool.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <TableLoader />
            ) }
            <Link to="/admin/skills/new" className="add">Ajouter une compétences</Link>
        </section>
     );
}
 
export default ToolsAdmin;