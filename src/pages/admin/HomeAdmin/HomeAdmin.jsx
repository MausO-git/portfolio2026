import { NavLink, useNavigate } from "react-router-dom";
import authAPI from "../../../services/authAPI";
import { useContext } from "react";
import AuthContext from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import "./HomeAdmin.scss"
import usePageTitle from "../../../tools/usePageTitle";
import useLightTrail from "../../../tools/useLightTrail";

const HomeAdmin = (props) => {
    const navigate = useNavigate()
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext)

    const handleLogout = () => {
        authAPI.logout()
        setIsAuthenticated(false)
        toast.info("Vous êtes déconnecté")
        navigate("/login", {replace: true})
    }

    usePageTitle();

    useLightTrail();

    return ( 
            <section className="admin-home">
                <h1>Page admin - Home</h1>
                <article className="jumbotron">
                    <NavLink className="link" to="/admin/works" >Voir mes projets</NavLink>
                    <NavLink className="link" to="/admin/skills" >Voir mes compétences</NavLink>
                    <button className="logout" onClick={handleLogout} >Déconnexion</button>
                </article>
            </section>
     );
}
 
export default HomeAdmin;