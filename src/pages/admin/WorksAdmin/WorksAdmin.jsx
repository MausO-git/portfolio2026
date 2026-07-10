import { useEffect, useState } from "react";
import "./WorksAdmin.scss"
import TableLoader from "../../../components/Loaders/TableLoader";
import { toast } from "react-toastify";
import websitesAPI from "../../../services/websitesAPI";
import { formatDate } from "../../../tools/text";
import { Link } from "react-router-dom";

const WorksAdmin = (props) => {

    const [works, setWorks] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchWorks = async () => {
        try {
            const data = await websitesAPI.findAll()
            setWorks(data.member)
            setLoading(false)
        } catch(error) {
            toast.error("Impossible de charger les projets")
        }
    }

    const handleDelete = async (id) => {
        const originalWorks = [...works]
        setWorks(works.filter(work => work.id !== id))

        try {
            await websitesAPI.delete(id)
            toast.warning("Le projet "+id+" a bien été supprimé")
        } catch(error) {
            setWorks(originalWorks)
            toast.error("La suppression a échoué !")
        }
    }

    useEffect(() => {
        fetchWorks()
    },[])

    return ( 
        <section className="works-admin">
            <h1>Mes Projets</h1>
            { (!loading) ? (
                <table className="works-tab">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Titre</th>
                            <th>Desc</th>
                            <th>Date</th>
                            <th>Cover</th>
                            <th>url</th>
                            <th>Git</th>
                            <th>Figma</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {works.map(work => (
                        <tr key={work.id}>
                            <td>{work.id}</td>
                            <td>{work.title}</td>
                            <td className="text">{work.description}</td>
                            <td>
                                {formatDate(work.createdAt)}
                            </td>
                            <td>{work.cover}</td>
                            <td>{work.url}</td>
                            <td>{work.githubUrl}</td>
                            <td>
                                {(work.figmaUrl) ? (work.figmaUrl) : "/"}   
                            </td>
                            <td className="action">
                                <Link to={`/admin/works/${work.id}`} className="action-button modif">Modifier</Link>
                                <button className="action-button supp" onClick={() => handleDelete(work.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <TableLoader />
            ) }
            <Link to="/admin/works/new" className="add">Ajouter un projet</Link>
        </section>
     );
}
 
export default WorksAdmin;