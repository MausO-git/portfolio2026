import { useNavigate } from "react-router-dom";
import "./Login.scss";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import authAPI from "../../services/authAPI";
import { toast } from "react-toastify";
import Field from "../../components/forms/Field/Field";
import usePageTitle from "../../tools/usePageTitle";


const Login = (props) => {
    const navigate = useNavigate();
    const {setIsAuthenticated} = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await authAPI.authenticate(credentials)
            setError()
            setIsAuthenticated(true)
            toast.success("Connexion réussie")
            navigate("/admin", {replace: true})
        } catch(error) {
            setError("Les informations ne correspondent pas")
            toast.error("La connexion a échoué")
        }
    }

    const handleChange = (event) => {
        const value = event.currentTarget.value
        const name = event.currentTarget.name

        setCredentials(credentials => ({...credentials, [name]: value}))
    }

    usePageTitle();

    return ( 
        <section className="loginPage" >
            <div className="login">
                <h1>Connexion</h1>
                <form onSubmit={handleSubmit} >
                    <Field 
                        type="email"
                        name="email"
                        id="username"
                        label="Adresse de connexion"
                        value={credentials.username}
                        error={error}
                        placeholder="Mon adresse de connexion"
                        onChange={handleChange}
                    />
                    <Field 
                        type="password"
                        name="password"
                        id="password"
                        label="Mot de passe"
                        value={credentials.password}
                        error={error}
                        placeholder="Mon mot de passe"
                        onChange={handleChange}
                    />
                    <div className="submit">
                        <button className="sub-button">Connexion</button>
                    </div>
                </form>
            </div>
        </section>
     );
}
 
export default Login;