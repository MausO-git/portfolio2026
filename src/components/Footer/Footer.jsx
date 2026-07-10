import { useState } from "react";
import "./Footer.scss";
import { MAIL_API } from "../../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Footer = (props) => {

    const loc = useLocation();
    const isLogin = loc.pathname === "/login" || loc.pathname.startsWith("/admin");

    const [form, setForm] = useState({
        name : "",
        email: "",
        message: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(MAIL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
    
            if (res.ok) {
                // Réinitialise le formulaire
                setForm({ name: "", email: "", message: "" });

                toast.success("Message envoyé avec succès !")
            } else {
                toast.error("Une erreur est survenue lors de l'envoi.")
            }
        } catch (error) {
            toast.error("serveur indisponible...")
        }
    }

    return ( 
        <footer className={isLogin ? "log" : ""}>
            {(!isLogin) ? (
                <div className="up-content">
                    <div id="contact" className="contact">
                        <h2>Contact</h2>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text"
                                placeholder="Voter nom"
                                value={form.name}
                                onChange={(e) => setForm({...form, name: e.target.value})}
                            />
                            <input 
                                type="email"
                                placeholder="Voter adresse e-mail"
                                value={form.email}
                                onChange={(e) => setForm({...form, email: e.target.value})}
                            />
                            <textarea 
                                placeholder="Voter message"
                                value={form.message}
                                onChange={(e) => setForm({...form, message: e.target.value})}
                            />
                            <input type="submit" value="Envoyer" />
                        </form>
                    </div>
                    <div className="sn">
                        <h2>Résaux sociaux</h2>
                        <div className="sn-list">
                            <a href="https://github.com/MausO-git" target="_blank" rel="noreferrer" className="sn-item" ><FontAwesomeIcon icon={faGithub} className="fa" size="2x" /></a>
                        </div>
                    </div>
                </div>
            ) : ("")}            
            <div className="bottom-content">
                Copyright 2026 © Mauso - Portfolio Webdev
            </div>
        </footer>
     );
}
 
export default Footer;