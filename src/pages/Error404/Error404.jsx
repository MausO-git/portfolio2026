import { NavLink } from "react-router-dom";
import "./Error404.scss";
import { useLocation } from "react-router-dom";

const Error404 = () => {
    const loc = useLocation();
    const isLogin = loc.pathname.startsWith("/admin");

    return ( 
        <div className="not-found">
            <h1>404</h1>
            <p>La page demandée n'existe pas.</p>
            <NavLink to={(!isLogin) ? "/" : "/admin"}>Retour à l'accueil</NavLink>
        </div>
     );
}
 
export default Error404;